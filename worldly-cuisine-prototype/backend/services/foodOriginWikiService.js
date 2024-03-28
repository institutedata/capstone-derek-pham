/* 
Used to obtain raw html of whole article
*/
const getWikipediaArticle = async (foodInput) => {
    let foodInputToSearch = foodInput
    let url = `https://en.wikipedia.org/w/api.php?action=parse&page=${foodInputToSearch}&format=json`;
    console.log(`URL: ${url}`)

    let response = await fetch(url);
    let data = await response.json()
    return data
}

/* 
Used to obtain imgURL and description
Endpoint documentation:
https://api.wikimedia.org/wiki/Core_REST_API/Reference/Search/Search_content
*/
const getWikiSearchObj = async (foodInput) => {
    let foodInputToSearch = foodInput
    let imgURL = `https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=${foodInputToSearch}&limit=1`;
    let response = await fetch(imgURL);
    let data = await response.json()
    return data
}

module.exports = {
    getWikipediaArticle,
    getWikiSearchObj
}