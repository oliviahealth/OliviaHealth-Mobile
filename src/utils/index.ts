export const getHighContrastColor = (hex: string): string => {
    const cleanHex = hex.replace("#", "");

    let r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    let g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    let b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    if (isNaN(r) || isNaN(g) || isNaN(b)) return "#2C2C2E";

    // 1. Convert RGB to HSL space to isolate vibrancy from brightness
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    // 2. Target specific color zones to keep them rich, deep, and brilliant
    const hueDegrees = h * 360;

    if (hueDegrees > 45 && hueDegrees < 75) {
        // Yellow/Orange zone (Second Trimester) -> Needs to be deep amber gold to be readable
        l = 0.32;
        s = Math.max(s, 0.95);
    } else if (hueDegrees >= 75 && hueDegrees <= 150) {
        // Green zone (Conception) -> Rich emerald mint
        l = 0.34;
        s = Math.max(s, 0.80);
    } else if (hueDegrees > 270 && hueDegrees < 340) {
        // Pink/Magenta zone (Postpartum) -> Vivid, high-contrast plum/berry
        l = 0.38;
        s = Math.max(s, 0.90);
    } else {
        // Reds/Corals (Third Trimester) & Blues -> Crisp crimson or deep ocean blue
        l = 0.38;
        s = Math.max(s, 0.85);
    }

    // 3. Convert HSL back to clean RGB
    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    let finalR, finalG, finalB;
    if (s === 0) {
        finalR = finalG = finalB = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        finalR = hue2rgb(p, q, h + 1 / 3);
        finalG = hue2rgb(p, q, h);
        finalB = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (c: number) => Math.round(c * 255).toString(16).padStart(2, "0");
    return `#${toHex(finalR)}${toHex(finalG)}${toHex(finalB)}`.toUpperCase();
};