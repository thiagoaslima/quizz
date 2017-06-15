export function goToHash(hash) {
    window.location.hash = hash;
}
export function getHash() {
    return window.location.hash.replace('#', '').trim();
}
//# sourceMappingURL=routes.js.map