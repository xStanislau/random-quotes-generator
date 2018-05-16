window.onload = () => {
  let mainSection = document.querySelector('.main-section');
  let twtrBtn = document.getElementById('twitter-button');
  let btn = document.querySelector('.btn');

  mainSection.addEventListener('click', (e) => {
    if (e.target == twtrBtn) {
      tweetIt();
    } else if (e.target == btn) {
      displayQuote();
    }
  });

  function displayQuote() {
    let quoteText = document.querySelector('.quote__text');
    quoteObj = getRandomQuote();
    author = document.querySelector('.quote__author');

    quoteObj.then(quote => {
      quote = JSON.parse(quote);
      quoteText.textContent = quote.quote;
      author.textContent = quote.author;
    });
  }

  function tweetIt() {
    let quoteText = document.querySelector('.quote__text').textContent;
    let author = document.querySelector('.quote__author').textContent;
    let tweetUrl = 'https://twitter.com/share?text=' +
      encodeURIComponent(quoteText) + " - " + author +
      '&url=' +
      'url';

    window.open(tweetUrl, "", 'height=350,width=500');
  }

  function getRandomQuote() {
    return createGetRequest('https://talaikis.com/api/quotes/random/');
  }

  function createGetRequest(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', url)

      xhr.onload = () => {
        if (xhr.status == 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText + " " + xhr.status)
        }
      }

      xhr.onerror = () => {
        reject(new Error("Network error"));
      };

      xhr.send();
    });
  }

  displayQuote();
}