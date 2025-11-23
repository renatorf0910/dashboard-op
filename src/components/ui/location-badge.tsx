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
        <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 border px-3 py-1 text-sm font-medium text-gray-700">
            <span className="text-sm">{flag}</span>
            <span>{name}</span>
        </div>
    );
}

export function getLocationLabel(code: string) {
    const name = countries[code] || code;

    const flag = code
        ?.toUpperCase()
        .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));

    return `${flag} ${name}`;
}
