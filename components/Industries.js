const industryIcons = [
    <svg key="public" className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 21h18M5 18h14M6 18V9h12v9M4 9h16L12 3 4 9Zm4 3v3m4-3v3m4-3v3" /></svg>,
    <svg key="commercial" className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 21V5a2 2 0 012-2h7a2 2 0 012 2v16M4 21h16m-4 0V9a2 2 0 012-2h1a1 1 0 011 1v13M8 7h2m-2 4h2m-2 4h2" /></svg>,
    <svg key="development" className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 19V7l8-4 8 4v12l-8 4-8-4Zm0-12 8 4 8-4M12 11v12" /></svg>,
    <svg key="education" className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 5.5A2.5 2.5 0 016.5 3H12v16H6.5A2.5 2.5 0 004 21.5v-16ZM20 5.5A2.5 2.5 0 0017.5 3H12v16h5.5a2.5 2.5 0 012.5 2.5v-16Z" /></svg>,
    <svg key="healthcare" className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 5v14m-7-7h14M4 21h16a1 1 0 001-1V4a1 1 0 00-1-1H4a1 1 0 00-1 1v16a1 1 0 001 1Z" /></svg>,
    <svg key="retail" className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 10v10a1 1 0 001 1h14a1 1 0 001-1V10M3 10l2-6h14l2 6M3 10h18M7 21v-6h10v6M7 10a2 2 0 004 0 2 2 0 004 0 2 2 0 004 0" /></svg>,
];

export default function Industries({ dict }) {
    return (
        <section id="industries" aria-labelledby="industries-title" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <p className="text-sm font-bold tracking-widest text-secondary uppercase mb-2">{dict.badge}</p>
                    <h2 id="industries-title" className="text-3xl md:text-5xl font-bold text-primary tracking-normal">{dict.title}</h2>
                    <div className="w-20 h-1.5 bg-secondary mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                    {dict.list.map((industry, index) => (
                        <div
                            key={index}
                            className="relative p-4 sm:p-6 text-center border border-gray-100 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 group cursor-default shadow-sm hover:shadow-xl overflow-hidden"
                        >
                            <span aria-hidden="true" className="absolute top-0 left-0 h-1 w-0 bg-secondary group-hover:w-full transition-all duration-300"></span>
                            <div className="rounded-2xl bg-primary text-secondary border border-secondary/20 items-center justify-center mx-auto mb-4 group-hover:bg-secondary group-hover:text-primary group-hover:border-secondary transition-colors duration-300" style={{ width: "3.5rem", height: "3.5rem", display: "flex" }}>
                                {industryIcons[index]}
                            </div>
                            <p className="font-bold text-base sm:text-lg md:text-xl tracking-tight leading-tight">
                                {industry}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
