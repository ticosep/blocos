var levelAtual = 0;
var tela, trilho, bloco1, bloco2, mod1, mod2,resizer, caminho, muda = 0;
var modif = [];


PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
setup();

function setup() {
    
    carregaLevelAtual(levelAtual);
    state = play;
    tela.ticker.add(delta => gameLoop(delta));
    
  }
  
function gameLoop(delta){
  //Update the current game state:

state(delta);
}

function play(delta) {
    
    checaSobreposicaoMod();
    checaSobreposicaoBloco2();      
        
}


    


function carregaLevelAtual(levelAtual){

   
    geraTela();
    geraBlocos(levelAtual);
    criaMod(lvls.levels[levelAtual].modifiers.length);
    
    
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

function geraBlocos(levelAtual){
    //gera e posiciona blocos do jogo de acordo com a janela do navegador
    var blocoGraph2 = new PIXI.Graphics();
    var blocoGraph = new PIXI.Graphics();

    if (lvls.levels[levelAtual].initial[0] == 1){
        

        blocoGraph.beginFill(0xffffff);
        blocoGraph.drawRect(0,0, window.innerHeight/6, window.innerHeight/6);
        blocoGraph.endFill();
        //transforma o retangulo criado em um sprite
        bloco1 = new PIXI.Sprite(blocoGraph.generateCanvasTexture());
        bloco1.tint = parseInt(lvls.levels[levelAtual].initial[1],16);
        bloco1.x = window.innerHeight/12;
        bloco1.y =  window.innerHeight/2;
        bloco1.anchor.set(0.5);
        
  
        //deixa bloco interativo
        bloco1.interactive = true;
        bloco1.buttonMode = true;
        bloco1.on('click',iniciaCaminho);
        tela.stage.addChild(bloco1);
        
    }
    else {
        
        
        blocoGraph.beginFill(0xffffff);
        blocoGraph.drawRect(0,0, window.innerHeight/6, window.innerHeight/4);
        blocoGraph.endFill();
        //transforma o retangulo criado em um sprite
        bloco1 = new PIXI.Sprite(blocoGraph.generateCanvasTexture());
        bloco1.tint = parseInt(lvls.levels[levelAtual].initial[1],16);
        bloco1.x = window.innerHeight/12;
        bloco1.y =  window.innerHeight/2;
        bloco1.anchor.set(0.5);
        //deixa bloco interativo
        bloco1.interactive = true;
        bloco1.buttonMode = true;
        bloco1.on('click',iniciaCaminho);
        tela.stage.addChild(bloco1);
    }
    if (lvls.levels[levelAtual].final[0] == 1){
        
        
        blocoGraph2.beginFill(parseInt(lvls.levels[levelAtual].final[1],16));
        blocoGraph2.drawRect(0 ,0, window.innerHeight/6, window.innerHeight/6);
        blocoGraph2.endFill();

        bloco2 = new PIXI.Sprite(blocoGraph2.generateCanvasTexture());
        bloco2.x = window.innerWidth - window.innerHeight/6;
        bloco2.y = window.innerHeight/2 - window.innerHeight/12;
        tela.stage.addChild(bloco2);
    }
    else {
        
        blocoGraph2.beginFill(parseInt(lvls.levels[levelAtual].final[1],16));
        blocoGraph2.drawRect(0, 0, window.innerHeight/6, window.innerHeight/4);
        blocoGraph2.endFill();

        bloco2 = new PIXI.Sprite(blocoGraph2.generateCanvasTexture());
        bloco2.x = window.innerWidth - window.innerHeight/6;
        bloco2.y = window.innerHeight/2 - window.innerHeight/8;
        tela.stage.addChild(bloco2);
    }
 
}


function iniciaCaminho(){
    //faz o bloco1 andar ate o fim do campo de jogo
    caminho = TweenMax.to(bloco1, 10, {x: window.innerWidth});
   
 }

 function criaMod(quant){
    var blocoGraph = new PIXI.Graphics();
    
    //cria os modificadores conforme a quantidade existente no json
    //conforme o numero de modficadores existente, os mesmos sao posicionados de maneira correta no campo
    // ja que o campo tem tamanho dinamico
    if(quant == 2){
        
        blocoGraph.beginFill(0xff0);
        blocoGraph.drawRect(0, 0, window.innerHeight/6, window.innerHeight/6);
        blocoGraph.endFill();
      
        mod1 = new PIXI.Sprite(blocoGraph.generateCanvasTexture());
        mod1.x = window.innerWidth/2 - window.innerHeight/6;
        mod1.y = window.innerHeight/2 - window.innerHeight/12;
        mod2 = new PIXI.Sprite(blocoGraph.generateCanvasTexture());
        mod2.x = window.innerWidth/2 + window.innerHeight/6;
        mod2.y = window.innerHeight/2 - window.innerHeight/12;
        tela.stage.addChild(mod1);
        tela.stage.addChild(mod2);
       }
    else{
        blocoGraph.beginFill(0xff0);
        blocoGraph.drawRect(0, 0, window.innerHeight/6, window.innerHeight/6);
        blocoGraph.endFill()


        mod1 = new PIXI.Sprite(blocoGraph.generateCanvasTexture());
        mod1.x = window.innerWidth/2;
        mod1.y = window.innerHeight/2 - window.innerHeight/12;
        tela.stage.addChild(mod1);
    }
      
                 

 }


 function metodoMod(type,value, modificador){
    
    if (type == "colorize"){

        modificador.visible = false;
        caminho.pause();
        bloco1.tint = parseInt(value,16);
        caminho.resume();
    }
    else if(type == "resize"){
        
        if (value == 2){

            var scaleMuday = (window.innerHeight/4) / bloco1.height;
           
        }else{

            var scaleMuday = (window.innerHeight/6) / bloco1.height;
            
        }
        modificador.visible = false;
        caminho.pause();
        resizer = TweenMax.to(bloco1.scale,1,{y: scaleMuday*bloco1.scale.y, onUpdate: aniCompleta(scaleMuday*bloco1.scale.y)}); 

      }
    else{

    }
 }

//funcao que checa se os tamanhos estao iguais, se sim o bloco1 volta a percorer o trilho
 function aniCompleta(valor){
     
    if (valor.toFixed(1) == bloco1.scale.y.toFixed(1)){
        
        resizer.kill();
        caminho.resume();
        
    }
        
  
 }

 function checaSobreposicaoMod(){

    if(lvls.levels[levelAtual].modifiers.length == 1){

        if(sobrepos(bloco1,mod1)){
           
            metodoMod(lvls.levels[levelAtual].modifiers[0].type,lvls.levels[levelAtual].modifiers[0].value,mod1);
            
                    
        }else {
            //console.log('sem sobreposicao');
        }

    }else{
        
        if(sobrepos(bloco1,mod1)){
            
            metodoMod(lvls.levels[levelAtual].modifiers[0].type,lvls.levels[levelAtual].modifiers[0].value,mod1);
            
                    
        }
        if(sobrepos(bloco1,mod2)){
           
            metodoMod(lvls.levels[levelAtual].modifiers[1].type,lvls.levels[levelAtual].modifiers[1].value,mod2);
    
        } 
    }
 }
 
 function checaSobreposicaoBloco2(){
    if(sobrepos(bloco1,bloco2)){
        levelAtual ++;
        setup();
    }else{
       // console.log('nao muda level')
    }
 }
