const { JSDOM } = require('jsdom');

function normalizeURL(url){
    const myURL = new URL(url);
    let pathname = `${myURL.host}${myURL.pathname}`
    if ( pathname.length > 0 && pathname.slice(-1) === '/'){
        pathname = pathname.slice(0,-1);
    }
    return pathname
}

function getURLsFromHTML(htmlBody, baseURL){
    const listURLs = [];
    const dom = new JSDOM(htmlBody);
    const anchorElements = Array.from(dom.window.document.querySelectorAll('a'));
    
    anchorElements.forEach(anchor => { 
        const href = anchor.getAttribute('href');
        if (href){
            try {
                const absoluteURL = new URL(href,baseURL).href;
                listURLs.push(absoluteURL);
            } catch(error){
                console.error('Invliade URL: ${href}');
            }
            
        }
    });
    return listURLs;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}