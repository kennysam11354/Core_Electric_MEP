"use client";

import { useRef, useState } from "react";

export default function ContactForm({ dict }) {
    const [formData, setFormData] = useState({
        company: "",
        name: "",
        email: "",
        phone: "",
        projectType: "installation",
        description: "",
        website: "",
    });
    const [status, setStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const inFlight = useRef(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (!inFlight.current) setStatus("idle");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inFlight.current) return;
        inFlight.current = true;
        setStatus("sending");
        setErrorMessage("");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (!response.ok || !result.ok) {
                setErrorMessage(response.status === 429
                    ? dict.form.rateLimit
                    : [413, 422].includes(response.status) ? dict.form.validationError : dict.form.errorMessage);
                setStatus("error");
                return;
            }
            setStatus("success");
            setFormData({
                company: "", name: "", email: "", phone: "",
                projectType: "installation", description: "", website: "",
            });
        } catch {
            setErrorMessage(dict.form.errorMessage);
            setStatus("error");
        } finally {
            inFlight.current = false;
        }
    };

    return (
        <section id="contact" aria-labelledby="contact-title" className="py-24 bg-background-custom">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <p className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">{dict.badge}</p>
                        <h2 id="contact-title" className="text-3xl md:text-5xl font-bold text-primary mb-8 tracking-normal">{dict.title}</h2>

                        <div className="space-y-8 mb-12">
                            <div className="flex items-start">
                                <div className="bg-primary p-3 rounded-lg mr-4 text-secondary">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary">{dict.hq}</h3>
                                    <p className="text-gray-600">{dict.address}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-primary p-3 rounded-lg mr-4 text-secondary">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary">{dict.email}</h3>
                                    <span className="mt-2 text-gray-600 text-sm hover:text-secondary transition-colors block">{dict.mainEmail}</span>
                                    <a href={`tel:${dict.phone}`} className="text-gray-600 text-sm hover:text-secondary transition-colors block">{dict.phone}</a>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                            <p className="font-bold text-primary italic">&ldquo;{dict.serving}&rdquo;</p>
                        </div>
                    </div>

                    <div className="bg-primary p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <form onSubmit={handleSubmit} aria-busy={status === "sending"} className="space-y-6">
                                <div className="hidden" aria-hidden="true">
                                    <label htmlFor="website">Website</label>
                                    <input id="website" name="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="company" className="block text-gray-400 text-sm font-bold mb-2">{dict.form.company}</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            maxLength={160}
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="name" className="block text-gray-400 text-sm font-bold mb-2">
                                            {dict.form.name} <span className="text-secondary">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            maxLength={120}
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="email" className="block text-gray-400 text-sm font-bold mb-2">
                                            {dict.form.email} <span className="text-secondary">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            maxLength={254}
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-gray-400 text-sm font-bold mb-2">
                                            {dict.form.phone} <span className="text-secondary">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            maxLength={40}
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="projectType" className="block text-gray-400 text-sm font-bold mb-2">{dict.form.projectType}</label>
                                    <select
                                        id="projectType"
                                        name="projectType"
                                        value={formData.projectType}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary transition-colors appearance-none"
                                    >
                                        <option value="installation" className="bg-primary">{dict.form.options.installation}</option>
                                        <option value="maintenance" className="bg-primary">{dict.form.options.maintenance}</option>
                                        <option value="consultation" className="bg-primary">{dict.form.options.consultation}</option>
                                        <option value="emergency" className="bg-primary">{dict.form.options.emergency}</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-gray-400 text-sm font-bold mb-2">{dict.form.description}</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                            maxLength={6000}
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary transition-colors resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="w-full py-4 bg-secondary hover:bg-amber-600 text-primary font-bold text-lg rounded-xl transition-all shadow-xl active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed"
                                >
                                    <span>{status === "sending" ? dict.form.sending : dict.form.submit}</span>
                                </button>
                                {status === "success" && (
                                    <div role="status" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400">
                                        <p className="font-bold">{dict.form.success}</p>
                                        <p className="mt-1">{dict.form.successDesc}</p>
                                    </div>
                                )}
                                {status === "error" && (
                                    <p role="alert" className="rounded-xl border border-red-500/50 bg-red-500/20 p-4 text-sm text-red-200">{errorMessage}</p>
                                )}
                            </form>
                        </div>

                        {/* Form background decoration */}
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
