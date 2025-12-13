
export const formatNombreCourt  = (n) => {
    return n >= 1e9 ? (n / 1e9).toFixed(1).replace('.0', '') + 'B'
        : n >= 1e6 ? (n / 1e6).toFixed(1).replace('.0', '') + 'M'
            : n >= 1e3 ? (n / 1e3).toFixed(1).replace('.0', '') + 'k'
                : n.toString();
};

export const formatNombreEspace = (nombre) => {
    if (nombre == null) return "0";

    return nombre
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
