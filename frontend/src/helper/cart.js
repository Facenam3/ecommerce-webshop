export function getTotalQuantity(items) {
    return items.reduce((total, item) => total + (item.quantity || 0), 0);
}

export function getTotalPrice(items) {
    return items.reduce((total, item) => {
        const quantity = item.quantity || 0;
        const amount = Number(item.price?.amount || 0);
        return total + quantity * amount;
    }, 0);
}