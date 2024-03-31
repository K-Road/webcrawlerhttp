function printReport(pages){
    console.log('Report starting')
    sortedPages = sortPages(pages,'desc');

    for (const [page,count] of sortedPages){
        console.log(`Found ${count} internal links to ${page}`)
    }
}

function sortPages(pages,order){
    const pagesArray = Object.entries(pages);
    if (order == 'desc'){
        pagesArray.sort((a,b) => b[1] - a[1]);
    } else {
        pagesArray.sort((a,b) => a[1] - b[1]); //defaults to asc
    }
    return pagesArray
}

module.exports = {
    printReport,
    sortPages
 }
