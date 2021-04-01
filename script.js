// const apiKey = process.env.REACT_APP_NEW_API;
const apiKey = "9b1ee3fce2644279bd01678146ab1e4e";
let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

const getNews = async () => {
  try {
    document.getElementById(
      "top-headlines"
    ).innerHTML = `<div class="spinner-border text-success" role="status">
    <span class="sr-only"></span>
  </div>
  <div class="spinner-border text-warning" role="status">
    <span class="sr-only"></span>
  </div>
  <div class="spinner-border text-danger" role="status">
    <span class="sr-only"></span>
  </div>
  <h1>Chờ Tí...</h1>`;
    let data = await fetch(url);
    let res = await data.json();
    let articles = res.articles;
    console.log(articles);

    document.getElementById("top-headlines").innerHTML = articles
      .map((item) => renderSingleArticle(item))
      .join("");
  } catch (error) {
    console.log(error);
  }
};
getNews();
const renderSingleArticle = (article) => {
  return `
  <div id="oneCard" class="card" style="width: 18rem;">
   <img class="card-img-top" src="${article.urlToImage}" alt="Card image cap">
   <div class="card-body">
    <i class="fa fa-edit fa-xs"></i><h4 class="mb-0">${article.author}</h4>
    <h6 class="mb-0"><a href="${article.url}" target="_blank">${
    article.source.name
  } </a>
  <span class="published-at">${moment(
    article.publishedAt
  ).fromNow()}</span></h6>
    <br>
    <h5 class="card-title">${article.title}</h5>
    <br>
    <p class="text-wrap">${String(article.description)}</p>
    <a href="${
      article.url
    }" class="btn btn-primary" target="_blank">Read More</a>
   </div>
  </div>
 `;
};
const handleSearchClick = () => {
  let query = document.getElementById("search-input").value;
  if (query == "all") {
    url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
  } else {
    url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
  }
  getNews();
};
