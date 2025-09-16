export default function PartnerEcosystem() {
    const partners = [
        "Telnet Global (Tunisia)",
        "Onomondo (Denmark)",
        "Intaj Star & Space Technology Services (Oman)",
        "Shenzhen Fuwit Technology (China)",
        "ASYAD (Oman)",
        "Business Supply Trading Company (KSA)",
    ];

    return (
        <section className="bg-muted py-16 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Our Partner Ecosystem</h2>
                    <p className="mt-2 text-lg text-muted-foreground">
                        Collaboration is at the heart of our success. We are proud to work with leading global and local partners.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
                    {partners.map((partner) => (
                        <div key={partner} className="text-center">
                            <p className="text-lg font-medium text-muted-foreground">{partner}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
