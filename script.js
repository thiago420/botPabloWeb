let id;
let elementoRecebido;

async function prepararRoleta() {
    $(".roletaV").empty();
    $('.roletaV').css({ transition: "" });
    $('.roletaV').css('margin-left', "0");

    link = "crates.json";
    const api = await fetch("https://bymykel.github.io/CSGO-API/api/en/" + link);
    const apiJson = await api.json();

    for (i = 0; i < apiJson.length; i++) {
        if (apiJson[i].id === elementoRecebido.idCaixa) {
            for (j = 0; j < 100; j++) {
                if (j == 85) {
                    elemento = '<div id="CardNumber' + j + '" class="itemRoleta" style="background-image:url(' + (elementoRecebido.isRare ? "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/weapon_cases/default_rare_item_png.png" : elementoRecebido.image) + '); border-bottom: 4px solid ' + (elementoRecebido.isRare ? "#ffd700" : elementoRecebido.rarity.color) + ';"></div>';
                    $(elemento).appendTo(".roletaV");
                } else {
                    random = Math.floor(Math.random() * apiJson[i].contains.length);
                    elemento = '<div id="CardNumber' + j + '" class="itemRoleta" style="background-image:url(' + apiJson[i].contains[random].image + '); border-bottom: 4px solid ' + apiJson[i].contains[random].rarity.color + ';"></div>';
                    $(elemento).appendTo(".roletaV");
                }
            }
        }
    }
}

window.addEventListener("load", async () => {
    const params = new URLSearchParams(window.location.search);
    id = params.get("id");

    const api = await fetch("https://firestore.googleapis.com/v1/projects/botpablo-921f8/databases/(default)/documents/botPablo/" + id);
    const apiJson = await api.json();

    if (apiJson.error) {
        window.location.href = "error.html";
    }

    elementoRecebido = {
        id: apiJson.fields.id.stringValue,
        idCaixa: apiJson.fields.idCaixa.stringValue,
        isRare: apiJson.fields.isRare.booleanValue,
        name: apiJson.fields.name.stringValue,
        rarity: {
            id: apiJson.fields.rarity.mapValue.fields.id.stringValue,
            name: apiJson.fields.rarity.mapValue.fields.name.stringValue,
            color: apiJson.fields.rarity.mapValue.fields.color.stringValue
        },
        paint_index: apiJson.fields.paint_index.stringValue,
        image: apiJson.fields.image.stringValue
    };

    prepararRoleta();
})

async function abrirCaixa() {
    $('#btnAbrirCaixa').prop('disabled', true);
    $("#btnAbrirCaixa").toggleClass("disabled");

    setTimeout(async function () {
        let numero = Math.floor(Math.random() * 76);

        $('.roletaV').css({
            transition: "all 8s cubic-bezier(.08,.6,0,1)"
        });
        $('.roletaV').css('margin-left', -6985 - numero + "px");
    }, 1000);

    setTimeout(function () {
        abrirModalItem();
        deletar();
    }, 9500);
}

function abrirModalItem() {
    $("#bodyModal2").empty();

    let div = document.createElement("div");
    div.className = "item";
    div.style.backgroundColor = elementoRecebido.rarity.color;

    imagem = document.createElement("img");
    imagem.className = "imagem";
    const a = document.createAttribute("src");
    a.value = elementoRecebido.image;
    imagem.setAttributeNode(a);

    texto = document.createElement("p");
    texto.innerHTML = elementoRecebido.name;

    div.appendChild(imagem);
    div.appendChild(texto);

    $(div).appendTo("#bodyModal2");

    $("#modalItem").modal("show");
}

async function deletar() {
    await fetch("https://firestore.googleapis.com/v1/projects/botpablo-921f8/databases/(default)/documents/botPablo/" + id, {
        method: 'DELETE'
    });
}




