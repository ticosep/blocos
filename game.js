var levelAtual;
geraTela();

function carregaLevelAtual(atual){

}

function geraTela(){
    //gera tela que fica do tamanho da janela do navegador
    var tela = new PIXI.Application();
    tela.renderer.autoResize = true;
    tela.renderer.view.style.position = "absolute";
    tela.renderer.view.style.display = "block";
    tela.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(tela.view);
    //introduz reta pela qual o bloco caminha, no centro da tela
    var trilho = new PIXI.Graphics();
    trilho.lineStyle(4,0xFFFFFF,1);
    trilho.moveTo(0,window.innerHeight/2);
    trilho.lineTo(window.innerWidth,window.innerHeight/2);
    tela.stage.addChild(trilho);
}

function geraBlocos(atual){
    //gera e posiciona blocos do jogo
    var bloco1 = new PIXI.Graphics();
    var bloco2 = new PIXI.Graphics();

}
