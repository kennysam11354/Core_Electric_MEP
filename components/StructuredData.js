import { createStructuredData } from "@/lib/seo";

export default function StructuredData({ lang }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(createStructuredData(lang)).replace(/</g, "\\u003c"),
            }}
        />
    );
}
