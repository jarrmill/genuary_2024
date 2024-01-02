export const easeOutCubic = function(x) {
    return 1 - Math.pow(1 - x, 3);
}

export const easeInCubic = function(x) {
    return x * x * x;
}