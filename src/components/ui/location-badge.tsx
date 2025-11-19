"use client";

const countries: Record<string, string> = {
    BR: "Brazil",
    AT: "Austria",
    CA: "Canada",
    EG: "Egypt",
    DK: "Denmark",
    FR: "France",
    DE: "Germany",
    ES: "Spain",
    IN: "India",
    IT: "Italy",
    JP: "Japan",
    MX: "Mexico",
    NL: "Netherlands",
    NO: "Norway",
    PL: "Poland",
    PT: "Portugal",
    RO: "Romania",
    SE: "Sweden",
    TR: "Turkey",
};

export function LocationBadge({ code }: { code: string }) {
    const name = countries[code] || code;

    const flag = code
        ?.toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));

    return (
        <div className="flex items-center gap-2">
            <span>{name}</span>
            <span className="text-lg">{flag}</span>
        </div>
    );
}
