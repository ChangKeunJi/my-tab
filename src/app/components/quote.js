export const getQuote = () => {
  const quote = document.getElementById("quote");
  fetch(" https://long-bongo.glitch.me/api.quotes/random")
    .then(res => res.json())
    .then(
      data =>
        (quote.innerHTML = `
      <p>"${data.quote}" - ${data.author} - </p>
    `)
    );
};
