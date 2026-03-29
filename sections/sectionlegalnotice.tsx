'use client';

export default function Sectionlegalnotice() {
    return (
        <section className="bg-white mt-10 py-16 sm:py-32">
            <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">Impressum</h1>
                <p className="text-gray-600 text-sm sm:text-base mb-8">Januar 2026</p>

                <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Angaben gemäß § 5 TMG</h2>
                    <p className="text-gray-700 text-sm sm:text-base">Name: Vadim Samoljak</p>
                    <p className="text-gray-700 text-sm sm:text-base">Gewerbename: DJ Vicle</p>
                    <p className="text-gray-700 text-sm sm:text-base">Hafenstraße 3, 48529 Nordhorn</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Kontakt</h2>
                    <p className="text-gray-700 text-sm sm:text-base">E-Mail: info@djvicle.de</p>
                </div>
                <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Umsatzsteuerliche Angaben</h2>
                    <p className="text-gray-700 text-sm sm:text-base">
                        Steuer-ID-Nr gemäß §27a Umsatzsteuergesetz: DE355466951
                    </p>
                </div>


            </div>
        </section>
    );
}
