var tela, trilho,bloco1,bloco2;
var modif = [];

carregaLevelAtual(3);


function carregaLevelAtual(atual){

    geraTela();
    geraBlocos(atual);
    criaMod(lvls.levels[atual].modifiers.length);
    
    
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
        //deixa bloco interativo
        bloco1.interactive = true;
        bloco1.buttonMode = true;
        bloco1.on('click',iniciaCaminho);
        tela.stage.addChild(bloco1);
    }
    else {
        bloco1.beginFill(parseInt(lvls.levels[atual].initial[1],16));
        bloco1.drawRect(0,window.innerHeight/2 - (window.innerHeight/4)/2, window.innerHeight/6, window.innerHeight/4);
        bloco1.endFill();
        bloco1.interactive = true;
        bloco1.buttonMode = true;
        bloco1.on('click',iniciaCaminho);
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


function iniciaCaminho(){
    //faz o bloco1 andar ate o fim do campo de jogo
    TweenMax.to(bloco1, 10, {x: window.innerWidth});
    carregaLevelAtual(0);
 }

 function criaMod(quant){
    
    //cria os modificadores conforme a quantidade existente no json
    //conforme o numero de modficadores existente, os mesmos sao posicionados de maneira correta no campo
    // ja que o campo tem tamanho dinamico
    if(quant == 2){
        var mod1 = new PIXI.Graphics();
        var mod2 = new PIXI.Graphics();
        mod1.beginFill(0xff0);
        mod1.drawRect(window.innerWidth/2 + window.innerHeight/6, window.innerHeight/2 - (window.innerHeight/6)/2, window.innerHeight/6, window.innerHeight/6);
        mod1.endFill();
        mod2.beginFill(0xff0);
        mod2.drawRect(window.innerWidth/2 - window.innerHeight/6, window.innerHeight/2 - (window.innerHeight/6)/2, window.innerHeight/6, window.innerHeight/6);
        mod2.endFill();
        tela.stage.addChild(mod1);
        tela.stage.addChild(mod2);
       }
    else{
        var mod1 = new PIXI.Graphics();
        mod1.beginFill(0xff0);
        mod1.drawRect(window.innerWidth/2 - window.innerHeight/6, window.innerHeight/2 - (window.innerHeight/6)/2, window.innerHeight/6, window.innerHeight/6);
        mod1.endFill();
        tela.stage.addChild(mod1);
    }
    for(i = 0; i< quant; i++){

        modif[i] =  lvls.levels[atual].modifiers[i]; 
        
    }
   
    
 }


 function metodoMod(type){
    
    
    if (type == "colorize"){

    }
    else if(type == "resize"){

    }
    else{

    }
 }
