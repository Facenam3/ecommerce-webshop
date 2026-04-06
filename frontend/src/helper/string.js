export function toKebabCase(str) {
    return str
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
}

export function toCategoryPath(name) {
    return `/${name.trim().toLowerCase().replace(/\s+/g, "-")}`;
}