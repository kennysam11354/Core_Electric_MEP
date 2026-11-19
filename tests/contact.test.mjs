import test from "node:test";
import assert from "node:assert/strict";
import { validateContact, sendContactEmail, CONTACT_RECIPIENT } from "../lib/contact.mjs";

const inquiry = {
    company: " Example Company ",
    name: " Test Customer ",
    email: "customer@example.com",
    phone: "347-555-0100",
    projectType: "installation",
    description: "전기 설치 문의\nProject details",
};

test("normalizes inquiry data and ignores recipient overrides", () => {
    const result = validateContact({ ...inquiry, to: "attacker@example.com" });
    assert.equal(result.name, "Test Customer");
    assert.equal(result.company, "Example Company");
    assert.equal(result.description, inquiry.description);
    assert.equal(result.to, undefined);
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

test("uses the fixed Gmail recipient, verified sender and customer Reply-To", async () => {
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
    assert.deepEqual(payload.to, [CONTACT_RECIPIENT]);
    assert.equal(CONTACT_RECIPIENT, "multizerllc@gmail.com");
    assert.equal(payload.from, "Core Electric MEP <info@coreelectricmep.com>");
    assert.equal(payload.reply_to, inquiry.email);
    assert.match(payload.text, /Commercial Electrical/);
    assert.match(payload.text, /전기 설치 문의/);
    assert.equal(payload.html, undefined);
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
