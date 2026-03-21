export function getTotalQuantity(items) {
    return items.reduce((total, item) => total + item.quantity, 0);
}

export function getTotalPrice(items) {
    return items.reduce(
        (total, item) => total + item.quantity * item.price.amount,
        0
    );
}