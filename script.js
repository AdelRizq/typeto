let doc = document;

class Quote {
  constructor() {
    this.API_URL = "https://api.quotable.io/random";
    this.quote = "";
    this.textareaElement = doc.getElementById("quote");
    this.inputQuote = doc.getElementById("inputQuote");
    this.len = 0;
  }

  getRandomQuote() {
    return fetch(this.API_URL)
      .then((response) => response.json())
      .then((data) => data.content);
  }

  async getNextQuote() {
    this.inputQuote.value = "";

    this.quote = await this.getRandomQuote();

    this.len = this.quote.length;
    this.textareaElement.innerHTML = "";
    this.quote.split("").forEach((character) => {
      const characterSpan = doc.createElement("span");
      characterSpan.innerText = character;
      this.textareaElement.appendChild(characterSpan);
    });
  }
}

class Typeto {
  constructor() {
    this.timer = doc.getElementById("timer");
    this.quote = doc.getElementById("quote");
    this.inputQuote = doc.getElementById("inputQuote");
    this.score = doc.getElementById("score");
    this.quoteObj = new Quote();

    if (localStorage.getItem("score") === null) {
      localStorage.setItem("score", 0);
    }
  }

  setup() {
    setInterval(() => {
      timer.innerText++;
    }, 1000);

    this.quoteObj.getNextQuote();
    setInterval(this.checkTextMatching, 100, this.quoteObj);
    this.score.innerText = localStorage.getItem("score");
  }

  start() {
    this.setup();
  }

  checkTextMatching(quoteObject) {
    const originalText = this.quote.innerText,
      inputText = this.inputQuote.value;

    let color = "black",
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

    if (originalText.length === 0) {
      return;
    }

    if (originalText === inputText) {
      quoteObject.getNextQuote();

      let WPM = Math.floor(
        quoteObject.len / 5 / (parseInt(this.timer.innerText) / 60)
      );
      console.log(WPM);

      if (
        localStorage.getItem("score") === null ||
        parseInt(localStorage.getItem("score")) < WPM
      ) {
        localStorage.setItem("score", WPM);
        this.score.innerText = localStorage.getItem("score");
      }
      this.timer.innerText = "0";
      return;
    }
  }
}

function startLoading() {
  let typeto = new Typeto();
  typeto.start();
}

if (doc.readyState === "loading") {
  doc.addEventListener("DOMContentLoaded", startLoading());
} else {
  startLoading();
}
