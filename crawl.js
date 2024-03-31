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
        if(href.startsWith('/')){
            if (href){
                try {
                    const absoluteURL = new URL(href,baseURL).href;
                    listURLs.push(absoluteURL);
                } catch(err){
                    console.error(`${err.message}: ${anchor.href}`);
                }
            }
        } else {
            if(href){
                try{
                    const absoluteURL = new URL(href).href;
                    listURLs.push(absoluteURL);
                }catch(err) {
                    console.error(`${err.message}: ${anchor.href}`)
                }
            }
        }
    });
    return listURLs;
}
async function crawlPage(baseURL,currentURL,pages){

    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL)

    if (currentURLObj.hostname !== baseURLObj.hostname){
        return pages
    }

    const normCurrentURL = normalizeURL(currentURL)

    if (normCurrentURL in pages){
        pages[normCurrentURL]++;
        return pages
    } else {
        pages[normCurrentURL] = 1;
    }

    console.log(`Crawling ${currentURL}`)
    let htmlbody = ''
    try {
        const response = await fetch(currentURL)
        if (response.status >= 400){
            console.log(`Invalid response Status Code ${response.status} - ${response.statusText}`);
            return pages; //break out
        }
        const contentType = response.headers.get('content-Type')
        if ( !contentType || !contentType.includes('text/html')){
            console.log(`Invalid content type: ${contentType}`)
            return pages;
        }

        htmlbody = await response.text();
           
    } catch(err){
        console.error('Fetch error', err);
    }
    const urls = getURLsFromHTML(htmlbody,baseURL);
    for(const url of urls){
        // console.log(urls[url])
        pages = await crawlPage(baseURL,url,pages)
    }
    return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}