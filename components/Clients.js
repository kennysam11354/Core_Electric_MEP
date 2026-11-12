import Image from "next/image";
import { clients } from "@/lib/clients";

export default function Clients({ dict }) {
    return (
        <section id="clients" aria-labelledby="clients-title" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                    <p className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">{dict.badge}</p>
                    <h2 id="clients-title" className="text-3xl md:text-5xl font-bold text-primary leading-tight">{dict.title}</h2>
                    <p className="mt-5 text-gray-600 text-lg leading-relaxed">{dict.description}</p>
                    <div aria-hidden="true" className="w-20 h-1.5 bg-secondary mx-auto mt-6"></div>
                </div>

                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {clients.map((client) => (
                        <li key={client.image} className="group relative flex items-center justify-center h-32 sm:h-36 lg:h-40 p-4 sm:p-6 bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:border-secondary/50 hover:shadow-lg">
                            <span aria-hidden="true" className="absolute bottom-0 left-0 h-1 w-0 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                            <div className="relative w-full h-full overflow-hidden">
                                <Image
                                    src={client.image}
                                    alt={client.name}
                                    fill
                                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 280px"
                                    className={client.fit === "cover" ? "object-cover" : "object-contain"}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
