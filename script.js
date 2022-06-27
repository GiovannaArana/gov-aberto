chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
  const url_atual = tabs[0].url;
  // use `url` here inside the callback because it's asynchronous!
  const gov = url_atual.includes(".gov.br");

  if (gov) {
    document.querySelector(".html").innerHTML = url_atual;
    document.querySelector(".naoGov").style.display = "none";
    document.querySelector(".favicon").src = url_atual + "/favicon.ico";
    document.querySelector(".camponome").style.display = "none";
    document.querySelector(".campourl").style.display = "none";

    const response = await fetch("http://localhost:3000/url?" + new URLSearchParams({domain: cleanUrlInput(url_atual)}))
    const data = await response.json()

    if (data.url) {
      document.querySelector(".cadastro").style.display = "none";
      //esses dois são eu tentando fazer o botão funcionar. tenso. (problema)
      const botao = document.querySelector(".botao");
      botao.addEventListener("click", function () {
        chrome.tabs.create({ url: 'https://' + data.url });
      });
    } else {
      document.querySelector(".pagina").style.display = "none";
      document.querySelector(".camponome").style.display = "flex";
      document.querySelector(".campourl").style.display = "flex";
    }

    const botaoCad = document.querySelector(".botaoCad");
    botaoCad.addEventListener("click", function () {
      const nomeCidade = document.querySelector("#nomecidade").value;
      const url = document.querySelector("#url").value;
    });
  } else {
    document.querySelector(".siteGov").style.display = "none";
  }
});

const cleanUrlInput = (url) => {
    return url.replace(/^https?:\/\//, '').replace(/\//, '');
}