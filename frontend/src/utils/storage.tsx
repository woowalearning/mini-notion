export const getTokenId = () => {
    const origin = window.sessionStorage.getItem('tokenId') || '""';
    let tokenId: string = '';
    if (typeof origin === 'string') {
        tokenId = JSON.parse(origin);
    }

    return tokenId;
}

export const setTokenId = (tokenId: string) => {
    window.sessionStorage.setItem('tokenId', JSON.stringify(tokenId));
}