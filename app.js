const quoteContainer = document.getElementById('quote-container');
const quoteAuthor = document.getElementById('author');
const quoteText = document.getElementById('quote');
const quoteTwitter = document.getElementById('twitter');
const quoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

async function getQuoteFromAPI() {

    showLoadingSpinner();
    const proxyurl = 'https://floating-ridge-43558.herokuapp.com/';

    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch( proxyurl + apiUrl);
        const responseData = await response.json();

        if(responseData.quoteAuthor === ''){
            quoteAuthor.innerText = 'Unknown';
        }else{
            quoteAuthor.innerText = responseData.quoteAuthor;
        }

        if(responseData.quoteText.length>120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = responseData.quoteText;

        removeLoadingSpinner();
    } catch(error) {
        console.log(error);
        quoteText.innerText = 'You only live once, but if you do it right, once is enough.';
        quoteAuthor.innerText = 'Mae West';
        
        removeLoadingSpinner();
    }
}

function tweetQuote() {
    const quote = quoteAuthor.innerText;
    const author = quoteText.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetUrl,'_blank');
}
quoteButton.addEventListener('click',getQuoteFromAPI);
quoteTwitter.addEventListener('click',tweetQuote);

getQuoteFromAPI();
