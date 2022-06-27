chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  const url_atual = tabs[0].url;
  // use `url` here inside the callback because it's asynchronous!
  const gov = url_atual.includes(".gov.br");

  if (gov) {
    document.querySelector(".html").innerHTML = url_atual;
    document.querySelector(".naoGov").style.display = "none";
    document.querySelector(".favicon").src = url_atual + "/favicon.ico";
    document.querySelector(".camponome").style.display = "none";
    document.querySelector(".campourl").style.display = "none";

    //esses dois são eu tentando fazer o botão funcionar. tenso. (problema)
    const botao = document.querySelector(".botao");
    botao.addEventListener("click", function () {
      chrome.tabs.update(tabs[0].id, { url: url_atual });
    });

    const botaoCad = document.querySelector(".botaoCad");
    botaoCad.addEventListener("click", function () {
      const nomeCidade = document.querySelector("#nomecidade").value;
      const url = document.querySelector("#url").value;
    });

    //isso é pra dar fetch na API. como eu odeio coisa assíncrona aaaaaaaaaaaaaaaaaaaa (problema)
    let valor;
    const get = fetch("localhost:3000", {
      body: url_atual,
      headers: { "Content-Type": "application/x-www-form-urlencodded" },
      method: "GET",
    }).then((resposta) => {
      if (resposta.ok) {
        valor = 200;
      } else valor = 500;
    });

    if (!(get instanceof Promise)) {
      document.querySelector(".cadastro").style.display = "none";
    } else {
      document.querySelector(".pagina").style.display = "none";
      document.querySelector(".camponome").style.display = "flex";
      document.querySelector(".campourl").style.display = "flex";
    }
  } else {
    document.querySelector(".siteGov").style.display = "none";
  }
});
