export function saturateAndDarken(hex: string): string {
    const clean = hex.replace("#", "");
    const num = parseInt(clean, 16);

    let r = (num >> 16) & 255;
    let g = (num >> 8) & 255;
    let b = num & 255;

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }

    s = Math.min(1, s * 2.0);
    l = Math.max(0.3, l * 0.7);

    function hue2rgb(p: number, q: number, t: number) {
        let temp = t;
        if (temp < 0) temp += 1;
        if (temp > 1) temp -= 1;
        if (temp < 1 / 6) return p + (q - p) * 6 * temp;
        if (temp < 1 / 2) return q;
        if (temp < 2 / 3) return p + (q - p) * (2 / 3 - temp) * 6;
        return p;
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const ro = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
    const go = Math.round(hue2rgb(p, q, h) * 255);
    const bo = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);

    return (
        "#" +
        [ro, go, bo]
            .map((value) => value.toString(16).padStart(2, "0"))
            .join("")
    );
}