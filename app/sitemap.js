import { site } from "@/lib/seo";

export default function sitemap() {
    return [
        { url: site.url + "/" },
        { url: site.url + "/ko" },
    ];
}
