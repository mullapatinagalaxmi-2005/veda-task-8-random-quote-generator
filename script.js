// Veda Technology - Task 8
// Random Quote Generator

const quotes = [
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Great things are done by a series of small things brought together.", author: "Vincent van Gogh" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
    { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "A journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
    { text: "It is never too late to be what you might have been.", author: "George Eliot" },
    { text: "Your limitation—it's only your imagination.", author: "Unknown" },
    { text: "Small progress is still progress.", author: "Unknown" },
    { text: "Stay curious, keep learning, and never stop growing.", author: "Unknown" }
];

const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const copyBtn = document.getElementById("copyBtn");
const shareBtn = document.getElementById("shareBtn");
const messageElement = document.getElementById("message");

let previousQuoteIndex = -1;

// Display a random quote without repeating the previous one
function generateQuote() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === previousQuoteIndex);

    previousQuoteIndex = randomIndex;

    const selectedQuote = quotes[randomIndex];
    quoteElement.textContent = selectedQuote.text;
    authorElement.textContent = `— ${selectedQuote.author}`;
    messageElement.textContent = "";
}

// Return the currently displayed quote and author
function getCurrentQuote() {
    return `${quoteElement.textContent}\n${authorElement.textContent}`;
}

// Copy the quote to the clipboard
async function copyQuote() {
    const quote = getCurrentQuote();
    try {
        await navigator.clipboard.writeText(quote);
        messageElement.textContent = "Quote copied successfully!";
    } catch (error) {
        // Fallback for browsers without clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = quote;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();

        const copied = document.execCommand("copy");
        textArea.remove();

        messageElement.textContent = copied
            ? "Quote copied successfully!"
            : "Copy unavailable. Please select and copy manually.";
    }
}

// Share the quote using device's sharing options
async function shareQuote() {
    const quote = getCurrentQuote();
    if (navigator.share) {
        try {
            await navigator.share({
                title: "Daily Inspiration",
                text: quote
            });
            messageElement.textContent = "Share options opened.";
        } catch (error) {
            if (error.name !== "AbortError") {
                messageElement.textContent = "Unable to share this quote.";
            }
        }
    } else {
        await copyQuote();
        messageElement.textContent = "Sharing unavailable. Quote copied instead!";
    }
}

// Button event listeners
newQuoteBtn.addEventListener("click", generateQuote);
copyBtn.addEventListener("click", copyQuote);
shareBtn.addEventListener("click", shareQuote);

// Display a quote on page load
generateQuote();
