//dinheiro
let money = 0;
const dinheiro = document.getElementById("money");
//Inimigo
inimigos = 0;
inigimigoAtual = null;
inimgigosAtual = 0;
//fps é para mover o inimigo mais devagar, se não ele vai muito rapido
fps = 0;
let classes_em_uso = [];


function cliker() {
    money += 1;
    mostrarDinheiro();
}
function mostrarDinheiro() { dinheiro.innerHTML = "Dinheiro: " + money; }


//isto é array
const comprarclass = {
    "Clase1": { valor: 10, comprado: false, cor: "#0c00f5" },
    "Clase2": { valor: 30, comprado: false, cor: "#00f58f" },
    "Clase3": { valor: 50, comprado: false, cor: "#f5f500" },
    "Clase4": { valor: 100, comprado: false, cor: "#f50000" },
    "Clase5": { valor: 200, comprado: false, cor: "#f500f5" },
    "Clase6": { valor: 500, comprado: false, cor: "#00f5f5" },
    "Clase7": { valor: 1000, comprado: false, cor: "#f5a500" },
    "Clase8": { valor: 2000, comprado: false, cor: "#a500f5" },
    "Clase9": { valor: 5000, comprado: false, cor: "#00a5f5" },
    "Clase10": { valor: 10000, comprado: false, cor: "#f5f5f5" },
};

function comprar(variavel) {
    if (money >= comprarclass[variavel].valor && !comprarclass[variavel].comprado) {
        money -= comprarclass[variavel].valor;
        mostrarDinheiro();
        add_class(variavel);
    }
}

function mostrarClasses_loja() {
    const shopClassContainer = document.getElementById("ShopClass");
    Object.keys(comprarclass).forEach(classes => {
        const cartao = document.createElement("div");
        cartao.classList.add("cartao");
        const img = document.createElement("img");
        img.classList.add("Icon");
        img.src = "imagemref.jpg";
        img.alt = "Icone";
        const button = document.createElement("button");
        button.innerHTML = "Comprar";
        button.onclick = () => comprar(classes);
        const nome = document.createElement("div");
        nome.classList.add("nome");
        nome.innerHTML = "Nome da "+ classes; 
        cartao.appendChild(img);
        cartao.appendChild(button);
        cartao.appendChild(nome);
        shopClassContainer.appendChild(cartao);
    });
}

function spawnInimigo() {
    if (inimigos <= 0) {
        inimgigosAtual = document.createElement("div");
        inimgigosAtual.classList.add("inimigo");
        document.body.appendChild(inimgigosAtual);
        inimigos++;
    }
}

function vidaInigmigo() {

}

function moverInimigo() {
    if (inimgigosAtual && fps % 2 === 0) {
        let posicaoAtual = parseInt(inimgigosAtual.style.left) || 101;
        posicaoAtual -= 1;
        inimgigosAtual.style.left = posicaoAtual + "%";
    }
}

function gameLoop() {
    spawnInimigo();
    moverInimigo();
    fps++;
    if (fps >= 60) {
        fps = 0;
    }
}

function add_class(classON) {

    if (!comprarclass[classON].comprado) {

        const jogador = document.createElement("div");
        jogador.classList.add("jogador");
        jogador.style.setProperty("--cor", comprarclass[classON].cor);
        document.body.appendChild(jogador);
        classes_em_uso.push();
        comprarclass[classON].comprado = true;

    }
}
// Inicia o loop do jogo
add_class("Clase1");

setInterval(gameLoop, 14);
mostrarClasses_loja()