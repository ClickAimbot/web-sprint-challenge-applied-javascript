import axios from 'axios'

const Card = (article) => {
  const card = document.createElement("div");
  const headline = document.createElement("div");
  const author = document.createElement("div");
  const authorPhoto = document.createElement("div");
  const authorImg = document.createElement("img");
  const authorName = document.createElement("span");

  card.classList.add("card");
  headline.classList.add("headline");
  author.classList.add("author");
  authorPhoto.classList.add("img-container");

  authorImg.src = article.authorPhoto;
  headline.textContent = article.headline;
  authorName.textContent = `By ${article.authorName}`

  card.appendChild(headline);
  card.appendChild(author);
  author.appendChild(authorPhoto);
  authorPhoto.appendChild(authorImg);
  author.appendChild(authorName);

  card.addEventListener("click", () => {
    console.log(article.headline);
  })

  return card;


  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  // Obtain articles from the API endpoint
  axios.get('http://localhost:5001/api/articles')
    .then(resp => {
      const articles = resp.data.articles;

      for (const category in articles) {
        if (Array.isArray(articles[category])) {
          const subArticles = articles[category];

          subArticles.forEach(subArticle => {
            const cardElem = Card(subArticle)
            document.querySelector(selector).appendChild(cardElem)
          })
        }
      }
    })
    .catch(err => {
      console.error(err);
    })
}

export { Card, cardAppender }
