var levelAtual, tela, trilho,bloco1,bloco2;

geraTela();
geraBlocos(0);


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
    //gera e posiciona blocos do jogo de acordo com a janela do navegador
    bloco1 = new PIXI.Graphics();
    bloco2 = new PIXI.Graphics();

    if (lvls.levels[atual].initial[0] == 1){
        bloco1.beginFill(parseInt(lvls.levels[atual].initial[1],16));
        bloco1.drawRect(0,window.innerHeight/2 - (window.innerHeight/6)/2, window.innerHeight/6, window.innerHeight/6);
        bloco1.endFill();
        fazInterativo(bloco1,andarAteFim(bloco1));
        tela.stage.addChild(bloco1);
    }
    else {
        bloco1.beginFill(parseInt(lvls.levels[atual].initial[1],16));
        bloco1.drawRect(0,window.innerHeight/2 - (window.innerHeight/4)/2, window.innerHeight/6, window.innerHeight/4);
        bloco1.endFill();
        fazInterativo(bloco1,andarAteFim(bloco1));
        tela.stage.addChild(bloco1);
    }
    if (lvls.levels[atual].final[0] == 1){
        bloco2.beginFill(parseInt(lvls.levels[atual].final[1],16));
        bloco2.drawRect(window.innerWidth - window.innerHeight/6 ,window.innerHeight/2 - (window.innerHeight/6)/2, window.innerHeight/6, window.innerHeight/6);
        bloco2.endFill();
        tela.stage.addChild(bloco2);
    }
    else {
        bloco2.beginFill(parseInt(lvls.levels[atual].final[1],16));
        bloco2.drawRect(window.innerWidth - window.innerHeight/6  ,window.innerHeight/2 - (window.innerHeight/4)/2, window.innerHeight/6, window.innerHeight/4);
        bloco2.endFill();
        tela.stage.addChild(bloco2);
    }
}

function fazInterativo(obj,funcao){
    //faz o elemento passado tronar-se interativo e define a função q sera executada apos interacao
    obj.interactive = true;
    obj.buttonMode = true;
    obj.on('click',funcao);
}

function andarAteFim(obj,event){
    //faz o elemento passado andar ate o fim do campo de jogo
    obj.x *= 1.25;

 }
