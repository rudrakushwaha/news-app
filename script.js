const API_KEY = "pub_26538a498a300b3311311a7245a5a7ceca012";
// const url = "https://newsapi.org/v2/everything?q=";
const url = "https://newsdata.io/api/1/news?q=";



// https://newsdata.io/api/1/news?apikey=pub_26538a498a300b3311311a7245a5a7ceca012&q=pizza

window.addEventListener("load", () => fetchNews("business"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {

    


    // const res = await fetch(`${url}${query}&freshness=Day&textFormat=Raw&safeSearch=Off`,options);
    // console.log(res)
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    // console.log(data.result.image_url)
    // console.log(data.articles)
    await bindData(data.results);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    // console.log(articles)
    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.image_url) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
    // for (let index = 0; index < articles.length; index++) {
    //     // const element = articles[index];
    //     if (!articles[index].urlToImage) return;
    //     const cardClone = newsCardTemplate.content.cloneNode(true);
    //     fillDataInCard(cardClone, articles[index]);
    //     cardsContainer.appendChild(cardClone);
    // }
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsLink = cardClone.querySelector("#news-link")
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.image_url;
    newsTitle.innerHTML = article.title;
    newsLink.href=article.link
    // newsLink.innerHTML   =article.link

    newsDesc.innerHTML = article.description;

    const date = new Date(article.pubDate).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.category} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
document.getElementById("news-link").addEventListener("click",function(event){
    event.preventDefault()
  });