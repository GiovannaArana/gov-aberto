chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url_atual = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
    var gov = url_atual.includes('.gov.br')
    
    if(gov){
        document.querySelector(".html").innerHTML=url_atual;
        document.querySelector('.naoGov').style.visibility='hidden';
        document.querySelector('.naoGov').style.height='0px';

        var get = fetch("localhost:3000", 
            {body:url_atual,
            headers:{'Content-Type':'application/x-www-form-urlencodded'}, 
            method: 'GET'}
        );
        
        if(get){ 
            document.querySelector('.cadastro').style.visibility='hidden';
        }else{
            document.querySelector('.pagina').style.visibility='hidden';
        }

    }else{
        document.querySelector('.siteGov').style.visibility='hidden';
        document.querySelector('.siteGov').style.height='0px';
    }


});
