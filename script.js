let doc = document;

class Quote {
  constructor() {
    this.API_URL = "http://api.quotable.io/random";
    this.quote = "";
    this.textareaElement = doc.getElementById("quote");
    this.inputQuote = doc.getElementById("inputQuote");
  }

  getRandomQuote() {
    return fetch(this.API_URL)
      .then((response) => response.json())
      .then((data) => data.content);
  }

  async getNextQuote() {
    this.quote = await this.getRandomQuote();
    this.textareaElement.innerHTML = "";
    this.quote.split("").forEach((character) => {
      const characterSpan = doc.createElement("span");
      characterSpan.innerText = character;
      this.textareaElement.appendChild(characterSpan);
    });

    this.inputQuote.value = "";
  }
}

class Typeto {
  constructor() {
    this.timer = doc.getElementById("timer");
    this.quote = doc.getElementById("quote");
    this.inputQuote = doc.getElementById("inputQuote");
    this.quoteObj = new Quote();
  }

  setup() {
    setInterval(() => {
      timer.innerText++;
    }, 1000);

    setInterval(this.checkTextMatching, 200, this.quoteObj);
    this.quoteObj.getNextQuote();
  }

  start() {
    this.setup();
  }

  checkTextMatching(quoteObject) {
    let originalText = this.quote.innerText,
      inputText = this.inputQuote.value,
      color = "black",
      decoration = "none";

    for (let i = 0; i < originalText.length; i++) {
      if (i >= inputText.length) {
        color = "black";
        decoration = "none";
      } else if (inputText[i] === originalText[i]) {
        color = "#00C851";
        decoration = "none";
      } else {
        color = "red";
        decoration = "underline";
      }

      doc.querySelector(`#quote span:nth-child(${i + 1})`).style.color = color;
      doc.querySelector(
        `#quote span:nth-child(${i + 1})`
      ).style.textDecoration = decoration;
    }

    if (originalText === inputText) {
      quoteObject.getNextQuote();
      return;
    }
  }
}

function startLoading() {
  let app = new Typeto();
  app.start();
}

if (doc.readyState === "loading") {
  doc.addEventListener("DOMContentLoaded", startLoading());
} else {
  startLoading();
}
