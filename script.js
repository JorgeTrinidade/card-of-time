const menuLateralClasses = document.getElementById("menuLateralClasses");
const menuLateralClicker = document.getElementById("menuLateralClicker");
const menuBotaoDireito = document.getElementById("Direito");
const menuBotaoEsquerdo = document.getElementById("Esquerdo");

const classesReferencias = {
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
let Objetos = {
    Aliados: {},
    Inimigos: {},
    Ataques: { "inimigos": {}, "Aliados": {} }
}

function escolherMenuLateral(eML) {
    const mLT = document.getElementById("menuLateralTitulo");
    if (eML == "Esquerdo") {
        menuLateralClasses.style.display = "block";
        menuBotaoEsquerdo.classList.add("ativo");
        menuBotaoDireito.classList.remove("ativo");
    } else if (eML == "Direito") {
        menuBotaoEsquerdo.classList.remove("ativo");
        menuBotaoDireito.classList.add("ativo");
        menuLateralClasses.style.display = "none";
    }
}

function CriarLateral() {
    for (classes in classesReferencias) {
        menuBotaoEsquerdo.classList.add("ativo");
        const menuSecundarioClasses = document.createElement('div');
        menuSecundarioClasses.className = 'menuSecundarioClasses';

        const imagemMenu = document.createElement('img');
        imagemMenu.className = 'imagemMenu';
        imagemMenu.src = 'imagemref.jpg';

        const nome = document.createElement('p');
        nome.textContent = "Nome: " + classes;

        const descricao = document.createElement('p');
        descricao.textContent = "descricao: " + classesReferencias[classes].perfil;

        const dps = document.createElement('p');
        dps.textContent = "dps: " + (classesReferencias[classes].dano * classesReferencias[classes].velAtaque);

        const botaoMenuLateral = document.createElement('div');
        botaoMenuLateral.className = 'botaoMenuLateral';
        botaoMenuLateral.textContent = 'Comprar';

        menuSecundarioClasses.appendChild(imagemMenu);
        menuSecundarioClasses.appendChild(nome);
        menuSecundarioClasses.appendChild(descricao);
        menuSecundarioClasses.appendChild(dps);
        menuSecundarioClasses.appendChild(botaoMenuLateral);
        menuLateralClasses.appendChild(menuSecundarioClasses);
    }
}

function criarPersonagem(lado){
    const objeto = document.createElement("div");
    objeto.classList(lado);
    objeto._postX = lado == "aliado" ? 20 : 101;
    objeto._distAtaque = classesReferencias[lado].distAtaque;
    objeto._distPostX = classesReferencias[lado].distPostX;
    if(lado == "aliado"){objeto._move = function() {(objeto._postX - 25) / 12.5 + 1}};
};

CriarLateral()
function gameLoop() { }
setInterval(gameLoop, 14);