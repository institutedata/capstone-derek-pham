/* 
Used to obtain raw html of whole article
*/
const getWikipediaArticle = async (foodInput) => {
  let foodInputToSearch = foodInput;
  let url = `https://en.wikipedia.org/w/api.php?action=parse&page=${foodInputToSearch}&format=json`;
  console.log(`URL: ${url}`);

  let response = await fetch(url);
  let data = await response.json();
  return data;
};

const redirectCheck = async (foodInput) => {
  let url = `https://en.wikipedia.org/w/api.php?action=query&titles=${foodInput}&redirects=1&format=json`;
    console.log('URL for redirecting:', url)
  let response = await fetch(url);
  let data = await response.json();
  let pages = data["query"]["pages"];
  let title;

  let pageIds = Object.keys(pages);
  if (pageIds.length > 0) {
    let firstPageId = pageIds[0];
    title = pages[firstPageId]["title"];
  }
  console.log('Title from redirecting:', title)
  return title;
};

/* 
Used to obtain imgURL and description
Endpoint documentation:
https://api.wikimedia.org/wiki/Core_REST_API/Reference/Search/Search_content
*/
const getWikiSearchObj = async (foodInput) => {
  let foodInputToSearch = foodInput;
  let imgURL = `https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=${foodInputToSearch}&limit=1`;
  let response = await fetch(imgURL);
  let data = await response.json();
  return data;
};

module.exports = {
  getWikipediaArticle,
  getWikiSearchObj,
  redirectCheck,
};
