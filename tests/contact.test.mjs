import test from "node:test";
import assert from "node:assert/strict";
import { validateContact, sendContactEmail } from "../lib/contact.mjs";

const inquiry = {
    company: " Example Company ",
    name: " Test Customer ",
    email: "customer@example.com",
    phone: "347-555-0100",
    projectType: "installation",
    description: "전기 설치 문의\nProject details",
};

test("normalizes inquiry data and ignores recipient overrides", () => {
    const result = validateContact({ ...inquiry, to: "attacker@example.com", cc: "attacker@example.com" });
    assert.equal(result.name, "Test Customer");
    assert.equal(result.company, "Example Company");
    assert.equal(result.description, inquiry.description);
    assert.equal(result.to, undefined);
    assert.equal(result.cc, undefined);
});

test("rejects missing fields, header injection, invalid types and oversized input", () => {
    for (const input of [
        null, [], {}, { ...inquiry, name: "" },
        { ...inquiry, name: "Name\r\nBcc: attacker@example.com" },
        { ...inquiry, email: "invalid" }, { ...inquiry, phone: "abc" },
        { ...inquiry, projectType: "__proto__" },
        { ...inquiry, description: "x".repeat(6001) },
        { ...inquiry, company: 123 },
    ]) assert.equal(validateContact(input), null);
});

test("sends only to the company address with the customer as Reply-To", async () => {
    let payload;
    const id = await sendContactEmail(validateContact(inquiry), {
        apiKey: "unit-test-not-a-real-key",
        fetchImpl: async (url, options) => {
            assert.equal(url, "https://api.resend.com/emails");
            payload = JSON.parse(options.body);
            assert.equal(options.headers.Authorization, "Bearer unit-test-not-a-real-key");
            return Response.json({ id: "test-message-id" });
        },
    });
    assert.equal(id, "test-message-id");
    assert.deepEqual(payload.to, ["info@coreelectricmep.com"]);
    assert.equal(payload.cc, undefined);
    assert.equal(payload.from, "Core Electric MEP <info@coreelectricmep.com>");
    assert.equal(payload.reply_to, inquiry.email);
    assert.match(payload.text, /Commercial Electrical/);
    assert.match(payload.text, /전기 설치 문의/);
    assert.match(payload.html, /lang="en"/);
    assert.match(payload.html, /CORE ELECTRIC MEP INDUSTRIES<\/h1>\s*<p[^>]*>New Website Contact \/ Project Inquiry<\/p>/);
    assert.match(payload.html, /Project details<\/div>\s*<p[^>]*>This email was sent from the contact form on coreelectricmep\.com\.<\/p>/);
    assert.match(payload.text, /This email was sent from the contact form on coreelectricmep\.com\.$/);
    assert.match(payload.html, /href="mailto:customer@example.com"/);
    assert.match(payload.html, /href="tel:3475550100"/);
    assert.match(payload.html, /전기 설치 문의<br>Project details/);
    assert.doesNotMatch(payload.html, /href="https?:/);
});

test("renders a Korean email and escapes customer input in HTML", async () => {
    const data = validateContact({
        ...inquiry,
        language: "ko",
        company: "A & B",
        name: '고객 <img src="about:blank">',
        email: "customer?subject=example@example.com",
        phone: "+1 (347) 555-0100 ext. 23",
        description: "문의\r\n<script>예시</script>",
    });
    await sendContactEmail(data, {
        apiKey: "unit-test-not-a-real-key",
        fetchImpl: async (_url, { body }) => {
            const { html, text, subject } = JSON.parse(body);
            assert.match(html, /lang="ko"/);
            assert.match(html, /CORE ELECTRIC MEP INDUSTRIES<\/h1>\s*<p[^>]*>New Website Contact \/ Project Inquiry<\/p>/);
            assert.match(html, /&lt;\/script&gt;<\/div>\s*<p[^>]*>This email was sent from the contact form on coreelectricmep\.com\.<\/p>/);
            assert.match(html, /A &amp; B/);
            assert.match(html, /고객 &lt;img src=&quot;about:blank&quot;&gt;/);
            assert.match(html, /href="mailto:customer%3Fsubject%3Dexample@example.com"/);
            assert.match(html, /href="tel:\+13475550100;ext=23"/);
            assert.match(html, /문의<br>&lt;script&gt;예시&lt;\/script&gt;/);
            assert.doesNotMatch(html, /<(?:img|script)\b/i);
            assert.match(text, /상업용 전기 공사/);
            assert.match(subject, /님의 프로젝트 문의$/);
            return Response.json({ id: "test-message-id" });
        },
    });
});

test("provider rejections or invalid responses never count as success", async () => {
    for (const response of [
        Response.json({ message: "rejected" }, { status: 403 }),
        Response.json({}),
        new Response("not json", { status: 502 }),
    ]) {
        await assert.rejects(sendContactEmail(validateContact(inquiry), {
            apiKey: "unit-test-not-a-real-key",
            fetchImpl: async () => response,
        }), /did not accept/);
    }
});

test("network failures propagate for retry", async () => {
    await assert.rejects(sendContactEmail(validateContact(inquiry), {
        apiKey: "unit-test-not-a-real-key",
        fetchImpl: async () => { throw new Error("network unavailable"); },
    }), /network unavailable/);
});
