chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
  const domain = cleanUrlInput(tabs[0].url).replace(/\/.*/, "");
  // use `url` here inside the callback because it's asynchronous!
  const gov = domain.includes(".gov.br");

  if (gov) {
    document.querySelector(".html").innerHTML = domain;
    document.querySelector(".naoGov ").style.display = "none";
    document.querySelector(".favicon").src = "http://" + domain + "/favicon.ico";
    document.querySelector(".cadastro").style.display = "none";

    const response = await fetch("http://localhost:3000/url?" + new URLSearchParams({domain: cleanUrlInput(domain)}))
    if (response.ok) {
      const data = await response.json();
      if (data.url) {
        document.querySelector(".cadastro").style.display = "none";
        const botao = document.querySelector(".botao");
        botao.addEventListener("click", function () {
            chrome.tabs.create({ url: "https://" + data.url });
        });
      }
    } else {
      document.querySelector(".pagina").style.display = "none";
      document.querySelector(".cadastro").style.display = "flex";

      const botaoCad = document.querySelector(".botaoCad");
      botaoCad.addEventListener("click", async function () {
        const city = document.querySelector("#nomecidade").value;
        const url = document.querySelector("#url").value;

        const response = await fetch("http://localhost:3000/url", {
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded"},
          body: `city=${city}&url=${cleanUrlInput(url)}&domain=${domain}`
        })

        if (response.ok) {
          alert("Cadastro realizado com sucesso! Obrigado por contribuir com o nosso catálogo")
        } else {
          alert("Algo inesperado ocorreu ):")
        }
      });
    }
  } else {
    document.querySelector(".siteGov").style.display = "none";
  }
});

const cleanUrlInput = (url) => {
    return url.replace(/^https?:\/\//, "");
}