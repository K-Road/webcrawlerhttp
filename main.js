const { argv } = require('node:process');
const { crawlPage } = require('./crawl');
const { printReport } = require('./report');

async function main(){
    if (!(argv.length > 3 || argv.length < 3)) {
        const baseURL = process.argv[2]
        console.log(`Crawler is starting at: ${baseURL}`)

        const currentURL = baseURL;
        
        const pages = await crawlPage(baseURL, currentURL, {})
        
        // for (const key in pages){
        //     console.log(` - ${key}: ${pages[key]}`)
        // }
        //console.log(pages)
        printReport(pages);
        

    } else {
        console.log(`Invalid CLI Args: Requires 1: Provided: ${argv.length -2}`);
    }

    
}

main()