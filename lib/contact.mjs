export const CONTACT_RECIPIENT = "multizerllc@gmail.com";
export const CONTACT_SENDER = "Core Electric MEP <info@coreelectricmep.com>";

const projectTypes = {
    installation: "Commercial Electrical",
    maintenance: "Electrical Upgrade or Maintenance",
    consultation: "Public Sector or Agency Project",
    emergency: "Life Safety or Power Systems",
};

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
    return result;
}

export async function sendContactEmail(data, { apiKey, from = CONTACT_SENDER, fetchImpl = fetch }) {
    const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
            from,
            to: [CONTACT_RECIPIENT],
            reply_to: data.email,
            subject: "Core Electric MEP — Project inquiry from " + data.name,
            text: [
                "New website project inquiry",
                "",
                "Company: " + (data.company || "Not provided"),
                "Name: " + data.name,
                "Email: " + data.email,
                "Phone: " + data.phone,
                "Project type: " + projectTypes[data.projectType],
                "",
                "Project description:",
                data.description || "Not provided",
            ].join("\n"),
        }),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || typeof result?.id !== "string" || !result.id) {
        throw new Error("Email provider did not accept the inquiry");
    }
    return result.id;
}
