import qs from 'qs'

export function isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function isMobileDevice$1() {
    return window.innerWidth < 768;
}

export function getHost(): 'tech' | 'user' | undefined {
    const query = qs.parse(window.location.search, { ignoreQueryPrefix: true }) || {}
    console.log('query: ', query);
    return query.type
}

export function isIos(): boolean {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}
