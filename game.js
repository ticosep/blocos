var levelAtual;
var tela;
var trilho;
geraTela();
geraBlocos(1);


function carregaLevelAtual(atual){

}

function geraTela(){
    //gera tela que fica do tamanho da janela do navegador
    tela = new PIXI.Application();
    tela.renderer.autoResize = true;
    tela.renderer.view.style.position = "absolute";
    tela.renderer.view.style.display = "block";
    tela.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(tela.view);
    //introduz reta pela qual o bloco caminha, no centro da tela
    trilho = new PIXI.Graphics();
    trilho.lineStyle(4,0xFFFFFF,1);
    trilho.moveTo(0,window.innerHeight/2);
    trilho.lineTo(window.innerWidth,window.innerHeight/2);
    tela.stage.addChild(trilho);
}

function geraBlocos(atual){
    //gera e posiciona blocos do jogo
    var bloco1 = new PIXI.Graphics();
    var bloco2 = new PIXI.Graphics();

    if (lvls.levels[atual].initial[0] == 1){
        bloco1.beginFill(parseInt(lvls.levels[atual].initial[1],16));
        bloco1.drawRect(0,window.innerHeight/2 - (window.innerHeight/6)/2, window.innerHeight/6, window.innerHeight/6);
        bloco1.endFill();
        tela.stage.addChild(bloco1);
    }
    else {
        bloco1.beginFill(parseInt(lvls.levels[atual].initial[1],16));
        bloco1.drawRect(0,window.innerHeight/2 - window.innerHeight/6, window.innerHeight/6, window.innerHeight/4);
        bloco1.endFill();
        tela.stage.addChild(bloco1);
    }
}
