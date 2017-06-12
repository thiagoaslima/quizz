export function goToHash(hash: string) {
    window.location.hash = hash;
}

export function getHash(): string {
    return window.location.hash.replace('#', '').trim();
}