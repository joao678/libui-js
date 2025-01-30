export function str(template, ...values) {
    return Buffer.from(`${template.map((component, index) => values[index] ? component + values[index] : component).join('')}\0`);
}