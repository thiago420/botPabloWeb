function addOrUpdateURLParam(key, value) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
    history.pushState(null, "", newRelativePathQuery);
}

function deleteURLParam(key) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(key);
    const newRelativePathQuery = window.location.pathname + "?" + searchParams.toString();
    history.pushState(null, "", newRelativePathQuery);
}

window.addEventListener("load", async () => {
    const params = new URLSearchParams(window.location.search);
    id = params.get("id");

    link = "crates.json";
    const api = await fetch("https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/" + link);
    const apiJson = await api.json();

    for (i = 0; i < apiJson.length; i++) {
        elemento = document.createElement("option");
        elemento.innerHTML = apiJson[i].name;
        elemento.value = apiJson[i].id;

        document.getElementById("escolherCaixa").appendChild(elemento);
    }

    for (i = 0; i < apiJson.length; i++) {
        if (apiJson[i].id === id) {
            document.getElementById("escolherCaixa").value = id;
        }
    }

    pegarItensCaixa();
});

async function pegarItensCaixa() {
    link = "crates.json";
    const api = await fetch("https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/" + link);
    const apiJson = await api.json();

    elemento = document.createElement("div");
    elemento.id = "content";

    document.getElementById("container").replaceChild(elemento, document.getElementById("content"));

    let caixaSelecionada = document.getElementById("escolherCaixa").value;

    if (caixaSelecionada === "null") {
        deleteURLParam("id");
        $('#imageCaixa').attr('src', 'assets/ponto-inte.png')
        return $('#nameCaixa').html('Selecione uma caixa para visualizar!');
    }

    addOrUpdateURLParam("id", caixaSelecionada);

    for (i = 0; i < apiJson.length; i++) {
        if (apiJson[i].id === caixaSelecionada) {

            $('#imageCaixa').attr('src', apiJson[i].image);
            $('#nameCaixa').html(apiJson[i].name);

            if (apiJson[i].contains.length <= 0) {

                let h1 = document.createElement("h1");
                h1.innerHTML = 'Está caixa não possui itens!'

                return document.getElementById("content").appendChild(h1);
            }

            for (j = 0; j < apiJson[i].contains.length; j++) {

                let div = document.createElement("div");
                div.className = "item";
                div.style.backgroundColor = apiJson[i].contains[j].rarity.color;

                imagem = document.createElement("img");
                imagem.className = "imagem";
                const a = document.createAttribute("src");
                a.value = apiJson[i].contains[j].image;
                imagem.setAttributeNode(a);

                texto = document.createElement("p");
                texto.innerHTML = apiJson[i].contains[j].name;

                div.appendChild(imagem);
                div.appendChild(texto);

                document.getElementById("content").appendChild(div);
            }
            if (apiJson[i].contains_rare.length > 0) {
                let div = document.createElement("div");
                div.className = "item";
                div.style.backgroundColor = "#ffd700";

                imagem = document.createElement("img");
                imagem.className = "imagem";
                const a = document.createAttribute("src");
                a.value = "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/weapon_cases/default_rare_item_png.png";
                imagem.setAttributeNode(a);

                texto = document.createElement("p");
                texto.innerHTML = "Item Raro";

                div.appendChild(imagem);
                div.appendChild(texto);

                document.getElementById("content").appendChild(div);
            }
        }
    }

    if (document.getElementById('content').offsetHeight < '621') {
        document.getElementById('content').style.overflowY = 'hidden';
    } else {
        document.getElementById('content').style.overflowY = 'scroll';
    }
}


