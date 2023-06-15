//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 70;

//variaveis da raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente ;
let chanceDeErrar = 0;

let colidiu = false;

//Placar do Jogo
let meusPontos = 0;
let pontosOponente = 0;

// sons do jogo
let sRaquete;
let sPonto;
let sTrilha;

function preload(){
  sTrilha = loadSound ("sTrilha.mp3");
  sPonto  = loadSound ("sPonto.mp3");
  sRaquetada = loadSound ("sRaquetada.mp3");
}

function setup (){
  createCanvas(600,400);
  sTrilha.loop ();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    //verificaColisaoRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    incluiPlacar();
    marcaPonto();
    bolinhaNaoFicaPresa
}

function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro )
}

function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
    }
    if (yBolinha + raio > height || yBolinha - raio < 0) {
        velocidadeYBolinha *= -1;
    }
}

function mostraRaquete(x,y){
   rect(x,y,raqueteComprimento,raqueteAltura)
}



function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}


function verificaColisaoRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento
        && yBolinha - raio < yRaquete + raqueteAltura
        && yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
        sRaquetada.play();
    }
}


function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){
        velocidadeXBolinha *= -1;
        sRaquetada.play();
    }
}



function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar(){
  stroke(color(200))
  textAlign(CENTER);
  textSize (25);
  fill (color(255,140,0))
  rect (225,5,45,25);
  fill(255);
  text(meusPontos, 248,26);
  fill (color(255,140,0))
  rect (328,5,45,25);
  fill(255);
  text(pontosOponente, 351, 26); 
}

function marcaPonto(){
  if(xBolinha>590){
    meusPontos+=1;
    sPonto.play();
  }
  if(xBolinha <10){
    pontosOponente+=1;
    sPonto.play();
  }
}


function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    XBolinha = 23
    }
}
