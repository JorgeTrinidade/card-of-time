//dinheiro
let money = 0;
const dinheiro = document.getElementById("money");
//Inimigo
inimigos = 0;
inimigoAtual = null;
inimigoAtual = 0;

tempoAnteriorClicker = Date.now();
tempoAnteriorNotClicker = Date.now();
multiplicadorDano = 10;
multiplicadorDanoUI = document.getElementById("MultiplicadorDano");
multiplicadorDanoUI._opacity = 0;
multiplicadorDanoUI.style.pointerEvents = "none";

//fps é para mover o inimigo mais devagar, se não ele vai muito rapido
fps = 0;
let Personagem_Jogador = [];
let Ataque_Jogador = [];
let Area_Ataque = {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
};
eventoclick = null
document.addEventListener("mousemove", (evento) => {
    eventoclick = evento
})

const CombateUI = document.getElementById("Combate")
function cliker() {
    tempoCalculado = Date.now() - tempoAnteriorClicker
    console.log(tempoCalculado);
    tempoAnteriorClicker = Date.now();
    if (tempoCalculado < 201 && tempoCalculado > 99) {
        if (multiplicadorDano < 40) { multiplicadorDano += 1 }
        multiplicadorDanoUI.innerHTML = multiplicadorDano / 10;
        multiplicadorDanoUI.style.opacity = 1;
        multiplicadorDanoUI._opacity = 1;
        multiplicadorDanoUI.style.left = eventoclick.clientX + "px";
        multiplicadorDanoUI.style.top = eventoclick.clientY + "px";
    }
}
function mostrarDinheiro(dinheiroGanho) {
    money += dinheiroGanho;
    dinheiro.innerHTML = "Dinheiro: " + money; 
}

const Chao = document.getElementById("Chao");
Chao._Animacao = true;

//isto é array
const comprarclass = {
    "Lanceiro": {
        valor: 10, comprado: false, cor: "#0c00f5",
        dano: 8, velAtaque: 1, distProjetil: 2, vida: 10,
        perfil: "Dano alto por golpe"
    },
    "Arqueiro": {
        valor: 100, comprado: false, cor: "#00f58f",
        dano: 3, velAtaque: 2, distProjetil: 6, vida: 15,
        perfil: "Rápido, seguro à distância"
    },
    "Mago": {
        valor: 500, comprado: false, cor: "#f5f500",
        dano: 15, velAtaque: 0.5, distProjetil: 4, vida: 6,
        perfil: "Lento, alcance médio, porém forte"
    },
    "Arrombador": {
        valor: 4000, comprado: false, cor: "#f50000",
        dano: 1, velAtaque: 8, distProjetil: 3, vida: 4,
        perfil: "Metralhadora viva"
    },
    "Bombardeiro": {
        valor: 20000, comprado: false, cor: "#f500f5",
        dano: 30, velAtaque: 0.33, distProjetil: 5, vida: 5,
        perfil: "Artilharia, DPS alto, muito lento"
    },
    "Guerreiro": {
        valor: 5000000, comprado: false, cor: "#00f5f5",
        dano: 12, velAtaque: 1.2, distProjetil: 1, vida: 20,
        perfil: "Bruiser melee, DPS alto e sustentado"
    },
};

function comprar(variavel) {
    if (money >= comprarclass[variavel].valor && !comprarclass[variavel].comprado) {
        mostrarDinheiro(-comprarclass[variavel].valor);
        add_class(variavel);
    }
}

function mostrarClasses_loja() {
    const shopClassContainer = document.getElementById("menuLateral");
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
        nome.innerHTML = "Nome da " + classes;
        nome.classList.add("nome");
        cartao.appendChild(nome);
        cartao.appendChild(img);
        cartao.appendChild(button);
        shopClassContainer.appendChild(cartao);
    });
}

function criarBarraVida(vidaMaxima) {
    const objeto = document.createElement("div");
    const vidaBarra = document.createElement("div");
    vidaBarra.classList.add("BarraVida");
    const vidaBarraVida = document.createElement("div");
    vidaBarraVida.classList.add("BarraVidaVida");
    objeto._VidaBarra = vidaBarraVida;
    objeto._vidaMaxima = vidaMaxima;
    objeto._vidaAtual = vidaMaxima;
    vidaBarra.appendChild(vidaBarraVida);
    objeto.appendChild(vidaBarra);
    return objeto;
}

function spawnInimigo() {
    if (inimigos <= 0) {
        inimigoAtual = criarBarraVida(100);
        inimigoAtual.classList.add("inimigo");
        inimigoAtual._posX = 101;
        inimigoAtual._Dinheiro =10;
        inimigoAtual._posXdist = Math.floor((inimigoAtual._posX - 25) / 12.5) + 1;
        CombateUI.appendChild(inimigoAtual);
        inimigos++;
        if (!Chao._Animacao) {
            Chao.style.animationName = "andarChao";
            Chao._Animacao = true;
        }
    }
}

function moverInimigo() {
    if (fps % 2 === 0 && inimigoAtual) {
        if (inimigoAtual._posX > 25) {
            inimigoAtual._posX -= 1;
            inimigoAtual.style.left = inimigoAtual._posX + "%";
            inimigoAtual._posXdist = Math.floor((inimigoAtual._posX - 25) / 12.5) + 1;
        } else if (Chao._Animacao) {
            Chao.style.animationName = "none";
            Chao._Animacao = false;
        }
    }
}

function moverAtaque() {
    if (Ataque_Jogador && fps % 2 === 0) {
        for (let i = Ataque_Jogador.length - 1; i >= 0; i--) {
            const Ataque = Ataque_Jogador[i];
            Ataque._posX += Ataque._movePosX;
            Ataque.style.left = Ataque._posX + "%";

            if (inimigoAtual && inimigoAtual._posX <= Ataque._posX) {
                Ataque.remove();
                Ataque_Jogador.splice(i, 1);
                ataqueInimigo(Ataque.dano);
                continue;
            }
            const distAtual = Math.floor((Ataque._posX - 25) / 12.5) + 1;
            if (distAtual > Ataque._posXdist) {
                Ataque.remove();
                Ataque_Jogador.splice(i, 1);
            }
        }
    }
}

function ataqueInimigo(dano) {
    inimigoAtual._vidaAtual -= dano;
    inimigoAtual._VidaBarra.style.backgroundPositionX = (100 - ((inimigoAtual._vidaAtual / inimigoAtual._vidaMaxima) * 100)) + "%";
    if (inimigoAtual._vidaAtual <= 0) {
        mostrarDinheiro(inimigoAtual._Dinheiro)
        inimigos -= inimigos <= 0 ? 0 : 1;
        inimigoAtual.remove();
        inimigoAtual = null;
    }
}

function gameLoop() {
    spawnInimigo();
    moverInimigo();
    moverAtaque();
    fps++;
    if (fps >= 60) {
        fps = 0;
    }
}

function add_class(classON) {

    if (!comprarclass[classON].comprado) {
        const jogador = criarBarraVida(comprarclass[classON].vida);
        jogador.classList.add("jogador");
        jogador._nome = classON;
        jogador.style.setProperty("--cor", comprarclass[classON].cor);
        jogador._tempoUltimoAtaque = 0;
        CombateUI.appendChild(jogador);
        Personagem_Jogador.push(jogador);
        comprarclass[classON].comprado = true;
    }
}
add_class("Lanceiro");
setInterval(gameLoop, 14);
setInterval(() => {
    if (multiplicadorDano > 10) multiplicadorDano -= 1;
    multiplicadorDanoUI.innerHTML = multiplicadorDano / 10
}
    , 500);
setInterval(() => {
    if (Personagem_Jogador) {
        for (jogador of Personagem_Jogador) {
            tempoCalculado = (Date.now() - jogador._tempoUltimoAtaque) / 1000;
            console.log(tempoCalculado)
            if ((tempoCalculado >= (comprarclass[jogador._nome].velAtaque) / (multiplicadorDano / 10)) && (inimigoAtual && (inimigoAtual._posXdist <= comprarclass[jogador._nome].distProjetil))) {
                jogador._tempoUltimoAtaque = Date.now();
                const Ataque = document.createElement("div");
                Ataque.classList.add("Ataque");
                Ataque.dano = comprarclass[jogador._nome].dano;
                Ataque._posX = 10;
                Ataque._movePosX = 1;
                Ataque._posXdist = comprarclass[jogador._nome].distProjetil;
                Ataque.style.left = Ataque._posX + "%";
                Ataque_Jogador.push(Ataque);
                CombateUI.appendChild(Ataque);
            }
        }
    }

    if (multiplicadorDanoUI._opacity > 0) {
        multiplicadorDanoUI._opacity -= 0.05;
    }
    multiplicadorDanoUI.style.opacity = multiplicadorDanoUI._opacity;
}, 100)
mostrarClasses_loja()