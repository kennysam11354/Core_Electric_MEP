export const CONTACT_RECIPIENT = "info@coreelectricmep.com";
export const CONTACT_SENDER = "Core Electric MEP <info@coreelectricmep.com>";

const emailHeading = "New Website Contact / Project Inquiry";
const emailFooter = "This email was sent from the contact form on coreelectricmep.com.";

const projectTypes = {
    installation: { en: "Commercial Electrical", ko: "상업용 전기 공사" },
    maintenance: { en: "Electrical Upgrade or Maintenance", ko: "전기 업그레이드 또는 유지보수" },
    consultation: { en: "Public Sector or Agency Project", ko: "공공 부문 또는 기관 프로젝트" },
    emergency: { en: "Life Safety or Power Systems", ko: "안전 설비 또는 전력 시스템" },
};

const emailCopy = {
    en: {
        contact: "Contact Information",
        name: "Contact Name",
        company: "Company",
        email: "Email",
        phone: "Phone",
        projectType: "Project Type",
        description: "Project Description",
        noCompany: "N/A",
        noDescription: "No description provided.",
        subject: (name) => `Core Electric MEP — Project inquiry from ${name}`,
    },
    ko: {
        contact: "문의자 연락처",
        name: "문의자 이름",
        company: "회사명",
        email: "이메일",
        phone: "전화번호",
        projectType: "프로젝트 유형",
        description: "프로젝트 설명",
        noCompany: "미입력",
        noDescription: "프로젝트 설명이 입력되지 않았습니다.",
        subject: (name) => `Core Electric MEP — ${name}님의 프로젝트 문의`,
    },
};

const htmlEntities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (character) => htmlEntities[character]);
}

function formatContactHtml(data, language, copy, projectTypeLabel) {
    const emailAddress = encodeURIComponent(data.email.toWellFormed()).replace("%40", "@");
    const phoneParts = data.phone.match(/^(\+?[\d().\s-]+?)(?:\s*(?:ext\.?|x|;ext=)\s*(\d+))?$/i);
    const phoneNumber = phoneParts?.[1].replace(/[^\d+]/g, "") || "";
    const phoneText = escapeHtml(data.phone);
    const linkStyle = "color:#2563eb;text-decoration:underline;";
    const emailLink = `<a href="mailto:${escapeHtml(emailAddress)}" style="${linkStyle}">${escapeHtml(data.email)}</a>`;
    let phoneLink = phoneText;
    if (phoneNumber.replace(/\D/g, "").length >= 7) {
        const extension = phoneParts[2] ? `;ext=${phoneParts[2]}` : "";
        phoneLink = `<a href="tel:${phoneNumber}${extension}" style="${linkStyle}">${phoneText}</a>`;
    }

    const details = [
        [copy.name, escapeHtml(data.name)],
        [copy.company, escapeHtml(data.company || copy.noCompany)],
        [copy.email, emailLink],
        [copy.phone, phoneLink],
        [copy.projectType, `<strong style="color:#92400e;">${escapeHtml(projectTypeLabel)}</strong>`],
    ];
    const rows = details.map(([label, value]) => `
        <tr>
            <th scope="row" width="32%" style="padding:8px 12px 8px 0;text-align:left;vertical-align:top;color:#475569;font-weight:600;">${label}</th>
            <td style="padding:8px 0;vertical-align:top;color:#0f172a;overflow-wrap:anywhere;word-break:break-word;">${value}</td>
        </tr>`).join("");
    const description = escapeHtml(data.description || copy.noDescription).replace(/\r\n|\r|\n/g, "<br>");
    const sectionHeadingStyle = "margin:0 0 16px;padding-bottom:8px;border-bottom:2px solid #f59e0b;color:#1e293b;font-size:18px;";

    return `
<table lang="${language}" role="presentation" width="100%" cellspacing="0" cellpadding="0" align="center" style="max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;background-color:#ffffff;font-family:Arial,sans-serif;">
    <tr>
        <td style="padding:24px;">
            <div style="padding:20px;border-radius:8px;margin-bottom:24px;background-color:#0f172a;text-align:center;">
                <h1 style="margin:0;color:#f59e0b;font-size:24px;font-weight:bold;letter-spacing:1px;">CORE ELECTRIC MEP INDUSTRIES</h1>
                <p lang="en" style="margin:6px 0 0;color:#cbd5e1;font-size:14px;line-height:1.5;">${emailHeading}</p>
            </div>
            <h2 style="${sectionHeadingStyle}">${copy.contact}</h2>
            <table width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;border-collapse:collapse;table-layout:fixed;font-size:15px;">${rows}
            </table>
            <h2 style="${sectionHeadingStyle}">${copy.description}</h2>
            <div style="padding:16px;border:1px solid #e2e8f0;border-radius:8px;background-color:#f8fafc;color:#334155;font-size:15px;line-height:1.6;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;">${description}</div>
            <p lang="en" style="margin:24px 0 0;padding-top:16px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;line-height:1.5;text-align:center;">${emailFooter}</p>
        </td>
    </tr>
</table>`;
}

export function validateContact(input) {
    if (!input || typeof input !== "object" || Array.isArray(input)) return null;
    const limits = { company: 160, name: 120, email: 254, phone: 40, description: 6000 };
    const result = {};
    for (const [field, limit] of Object.entries(limits)) {
        if (typeof input[field] !== "string") return null;
        result[field] = input[field].trim();
        if (result[field].length > limit || (field !== "description" && /[\r\n]/.test(result[field]))) return null;
    }
    if (!result.name || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(result.email)) return null;
    if (result.phone.replace(/\D/g, "").length < 7) return null;
    if (!Object.hasOwn(projectTypes, input.projectType)) return null;
    result.projectType = input.projectType;
    result.language = input.language === "ko" ? "ko" : "en";
    return result;
}

export async function sendContactEmail(data, { apiKey, from = CONTACT_SENDER, fetchImpl = fetch }) {
    const language = data.language === "ko" ? "ko" : "en";
    const copy = emailCopy[language];
    const projectTypeLabel = projectTypes[data.projectType][language];
    const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
            from,
            to: [CONTACT_RECIPIENT],
            reply_to: data.email,
            subject: copy.subject(data.name),
            html: formatContactHtml(data, language, copy, projectTypeLabel),
            text: [
                emailHeading,
                "",
                `${copy.name}: ${data.name}`,
                `${copy.company}: ${data.company || copy.noCompany}`,
                `${copy.email}: ${data.email}`,
                `${copy.phone}: ${data.phone}`,
                `${copy.projectType}: ${projectTypeLabel}`,
                "",
                `${copy.description}:`,
                data.description || copy.noDescription,
                "",
                emailFooter,
            ].join("\n"),
        }),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || typeof result?.id !== "string" || !result.id) {
        throw new Error("Email provider did not accept the inquiry");
    }
    return result.id;
}
