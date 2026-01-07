
// Exemples :
// formatNombreCourt(950)        => "950"
// formatNombreCourt(1200)       => "1.2k"
// formatNombreCourt(10000)      => "10k"
// formatNombreCourt(2500000)    => "2.5M"
// formatNombreCourt(3000000000) => "3B"
// formatNombreCourt(null)       => ""
// formatNombreCourt(undefined)  => ""
export const formatNombreCourt  = (n) => {
    if (n == null) return "";

    return n >= 1e9 ? (n / 1e9).toFixed(1).replace('.0', '') + 'B'
        : n >= 1e6 ? (n / 1e6).toFixed(1).replace('.0', '') + 'M'
            : n >= 1e3 ? (n / 1e3).toFixed(1).replace('.0', '') + 'k'
                : n.toString();
};

// Exemples :
// formatNombreEspace(1000)        => "1 000"
// formatNombreEspace(1234567)    => "1 234 567"
// formatNombreEspace(50)          => "50"
// formatNombreEspace(0)           => "0"
// formatNombreEspace(null)        => ""
// formatNombreEspace(undefined)   => ""
export const formatNombreEspace = (n) => {
    if (n == null) return "";

    return n
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
