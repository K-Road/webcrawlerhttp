function normalizeURL(url){
    const myURL = new URL(url);
    let pathname = `${myURL.host}${myURL.pathname}`
    if ( pathname.length > 0 && pathname.slice(-1) === '/'){
        pathname = pathname.slice(0,-1);
    }
    return pathname
}

module.exports = {
    normalizeURL
}