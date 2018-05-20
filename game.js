var levelAtual = 0;
var click = -1;
var final = false;
var tela, trilho, bloco1, bloco2, mod1, mod2,resizer, caminho, texto, telaFim, telaBlur;
var tuto = true;



//inicia o jogo
setup();


//funcoes reponsaveis pelo loop do jogo
function setup() {
    
    checaLevel();
    
    tela.ticker.add(delta => gameLoop(delta));
    
  }
  
function gameLoop(delta){

    state(delta);
    
}

function play(delta) {
    
    checaSobreposicaoMod();
    checaSobreposicaoBloco2();
         
        
}

//desabilita a visao da tela inicia, para mostrar apenas a final
function fim(){

    tela.visible = false;
    
    
}

    


function carregaLevelAtual(levelAtual){

   //carrega os sprites do level atual
    geraTela();
    geraBlocos(levelAtual);
    criaMod(lvls.levels[levelAtual].modifiers.length);
    tutorial(levelAtual);
    
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
    //introduz texto que contem o lvl atual
    geraMsg(lvls.levels[levelAtual].name);
    
    
}

function geraBlocos(levelAtual){
    //gera e posiciona blocos do jogo de acordo com a janela do navegador e o level atual
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
        bloco2.anchor.set(0.5);
        bloco2.x = window.innerWidth - window.innerHeight/12;
        bloco2.y = window.innerHeight/2;
        tela.stage.addChild(bloco2);
    }
    else {
        
        blocoGraph2.beginFill(parseInt(lvls.levels[levelAtual].final[1],16));
        blocoGraph2.drawRect(0, 0, window.innerHeight/6, window.innerHeight/4);
        blocoGraph2.endFill();

        bloco2 = new PIXI.Sprite(blocoGraph2.generateCanvasTexture());
        bloco2.anchor.set(0.5);
        bloco2.x = window.innerWidth - window.innerHeight/12;
        bloco2.y = window.innerHeight/2;
        tela.stage.addChild(bloco2);
    }
 
}


function iniciaCaminho(){
    //faz o bloco1 após click, andar ate o fim do campo de jogo
    caminho = TweenMax.to(bloco1, 10, {x: window.innerWidth});
   
 }

 function criaMod(quant){
       
    //cria os modificadores conforme a quantidade existente no json
    //conforme o numero de modficadores existente, os mesmos sao posicionados de maneira correta no campo
    // ja que o campo tem tamanho dinamico
    if(quant == 2){
        
        
        mod1 = new PIXI.Sprite.fromImage(imgSpriteMod(lvls.levels[levelAtual].modifiers[0].type, lvls.levels[levelAtual].modifiers[0].value));
        mod1.height = window.innerHeight/6;
        mod1.width = window.innerHeight/6;
        mod1.anchor.set(0.5);
        mod1.x = window.innerWidth/2 - window.innerHeight/6;
        mod1.y = window.innerHeight/2; 
        mod2 = new PIXI.Sprite.fromImage(imgSpriteMod(lvls.levels[levelAtual].modifiers[1].type, lvls.levels[levelAtual].modifiers[1].value));
        mod2.height = window.innerHeight/6;
        mod2.width = window.innerHeight/6;
        mod2.anchor.set(0.5);
        mod2.x = window.innerWidth/2 + window.innerHeight/6;
        mod2.y = window.innerHeight/2;
        tela.stage.addChild(mod1);
        tela.stage.addChild(mod2);

       }
    else{
        
        mod1 = new PIXI.Sprite.fromImage(imgSpriteMod(lvls.levels[levelAtual].modifiers[0].type, lvls.levels[levelAtual].modifiers[0].value));
        mod1.height = window.innerHeight/6;
        mod1.width = window.innerHeight/6;
        mod1.anchor.set(0.5);
        mod1.x = window.innerWidth/2;
        mod1.y = window.innerHeight/2;
        //se o modificador for do tipo select entao este deve ser interativo
        if (lvls.levels[levelAtual].modifiers[0].type == "select"){
            var click = -1;
            mod1.interactive = true;
            mod1.buttonMode = true;
            mod1.on('click',select);

        } 

        tela.stage.addChild(mod1);
     
    }
      
                 

 }


 function metodoMod(type,value, modificador){
    //quando um bloco se sobrepoem a um modificador, esta função faz as ações conforme o type e value definidos
    if (type == "colorize"){

        modificador.visible = false;
        caminho.pause();
        TweenMax.to(bloco1,1,{pixi:{tint:parseInt(value,16)}});
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


 function aniCompleta(valor){
    //funcao que checa se os tamanhos estao iguais, se sim o bloco1 volta a percorer o trilho
    if (valor.toFixed(1) == bloco1.scale.y.toFixed(1)){
        
        resizer.kill();
        caminho.resume();
        
    }
        
  
 }

 function checaSobreposicaoMod(){
    //checa se houve sobreposição entra um bloco e um modificador, caso house o metodo do modificador é excutado
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
     //checa se o bloco 1 chegou ao final do level, se sim, o levelAtual é incrementado
     // e a função setup iniciada para o novo level
    if(sobrepos(bloco1,bloco2)){

            levelAtual ++;
            setup();

        
    }else{
       // console.log('nao muda level')
    }
 }

 function imgSpriteMod(type, value){
    //responsavel por retornar a imagem que sera feita a textura do modificador passado.
    if (type == "resize"){

        return 'imgs/' + type + value + '.png';

    }else if (type == "colorize"){

        return 'imgs/' + type + '.png';

    }else{

        return 'imgs/' + type + '.png';

    }
 }

 function select(){
    //a cada click no modificador do tipo select, ele assume um dos possiveis valores dos modificadores
    // e sua textura ja criados no jogo, isto é, o usuario deve clicar no modificador select ate encontrar o que deseja
    var modificadores =["colorize","resize1","resize2"];
    
    if (click == (modificadores.length) -1){

        click = 0;

    }else{
        
        click++;
    }
    

    if (modificadores[click] ==  "colorize") {

        lvls.levels[levelAtual].modifiers[0].value = "0000ff";
        lvls.levels[levelAtual].modifiers[0].type = "colorize";
        var textura = new PIXI.Texture.fromImage(imgSpriteMod("colorize",0));
        mod1.setTexture(textura);
        final = false;

    }else if (modificadores[click] ==  "resize1"){

        lvls.levels[levelAtual].modifiers[0].value = "1";
        lvls.levels[levelAtual].modifiers[0].type = "resize";
        var textura = new PIXI.Texture.fromImage(imgSpriteMod("resize","1"));
        mod1.setTexture(textura);
        final = false;

    }else if (modificadores[click] ==  "resize2"){

        
        lvls.levels[levelAtual].modifiers[0].value = "2";
        lvls.levels[levelAtual].modifiers[0].type = "resize";
        var textura = new PIXI.Texture.fromImage(imgSpriteMod("resize","2"));
        mod1.setTexture(textura);
        final = true;
        
    }
    
  
 }

 function checaLevel(){
     //checa se o final do jogo foi atingido, caso tenha sido atingido mas o modificador era
     //incorreto o level é reiniciado, se não, o jogo é terminado com saudações.
    if(final == true && levelAtual == 5){
        
        
        ultimoLv();
        state = fim;
    }
    else if(final == false && levelAtual == 5){

        tuto = false;
        alert("OPS! Modificador incorreto, o level sera reiniciado.");
        levelAtual = 4;
        lvls.levels[levelAtual].modifiers[0].type = "select";
        state = play;
        setup();

    }else{
       
        carregaLevelAtual(levelAtual);
        state = play;
    }
}

function geraMsg(msg){
//gera msg do lvl que aparecera na tela
    texto = new PIXI.Text(msg,
                {fontFamily : 'Arial', fontSize: 50, fill : 'white', align : 'center'});

    texto.anchor.set(0.5);
    texto.x = window.innerWidth/2;
    texto.y = 1 + texto.height;
    tela.stage.addChild(texto);
    animaTexto(msg);
}

function animaTexto(name){
    // funcao responsavel por animar os textos passados, conforme o nome do level atual
    var scaleMuday = (window.innerHeight/2) / texto.height;
    var scaleMudax = (window.innerWidth/2) / texto.width;

    if (name == "Growing"){
        
        TweenMax.to(texto.scale, 3, {x: texto.scale.x*scaleMudax ,
                     y: texto.scale.y*scaleMuday, repeat:-1}); 
        
    }else if(name == "Let it blue"){
       
        TweenMax.to(texto, 1, {pixi:{tint: 0x0000ff} , repeat:-1}); 

    }else if (name == "Mix and Match"){
        texto.scale.x = texto.scale.x*scaleMudax;
        texto.scale.y = texto.scale.y*scaleMuday;
        TweenMax.to(texto, 3, {pixi:{tint: 0x0000ff, scaleX: 1
                    , scaleY: 1} , repeat:-1});

    }else if(name == "Pulsating"){
        texto.scale.x = texto.scale.x*scaleMudax;
        texto.scale.y = texto.scale.y*scaleMuday;
        TweenMax.to(texto.scale, 3, {x: 1 ,
            y: 1, repeat:-1}); 
    }else{
        texto.tint =  0xff0000;
        TweenMax.to(texto, 3, {pixi:{skewX:15} , repeat:-1});
    }

}

function ultimoLv(){
        //gera tela final do jogo
        
        telaFim = new PIXI.Application();
        telaFim.renderer.autoResize = true;
        telaFim.renderer.view.style.position = "absolute";
        telaFim.renderer.view.style.display = "block";
        telaFim.renderer.resize(window.innerWidth, window.innerHeight);
        document.body.appendChild(telaFim.view);
        texto = new PIXI.Text("YOU WIN!",
            {fontFamily : 'Arial', fontSize: 100, fill : 'white', align : 'center'});

       texto.anchor.set(0.5);
       texto.x = window.innerWidth/2;
       texto.y = window.innerHeight/2;
       var scaleMuday = (window.innerHeight) / texto.height;
       var scaleMudax = (window.innerWidth) / texto.width;
       texto.scale.x = texto.scale.x*scaleMudax;
       texto.scale.y = texto.scale.y*scaleMuday;
       telaFim.stage.addChild(texto);
       TweenMax.to(texto, 3, {pixi: {scaleX: 0 ,
       scaleY: 0}}); 
       geraBotaoRealod();
}

function geraBotaoRealod(){
    //Gera botao que da opcao para reinicio do jogo, reinicia variaveis e se clicado retorna a tela inicial
       
       var botao = new PIXI.Text("CLIQUE AQUI PARA JOGAR NOVAMENTE",
            {fontFamily : 'Arial', fontSize: 32, fill : 'white', align : 'center'});
            
       levelAtual = 0;
       lvls.levels[4].modifiers[0].type = "select";
       state = play;
       final = false;
       botao.anchor.set(0.5);
       botao.x = window.innerWidth/2;
       botao.y = window.innerHeight/2;
       botao.interactive = true;
       botao.buttonMode = true;
       botao.on('click',setup);
       botao.alpha = 0;
       TweenMax.to(botao,15,{pixi:{alpha:1}});
       telaFim.stage.addChild(botao);
      
}

function tutorial(estagio){
//funcao que gera tela com instrucoes para jogador, em frente a tela principal com blur
    var style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 32,
        fontWeight: 'bold',
        fill: '#ff0000',
        stroke: 'white',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
    });
    
    if(estagio == 0 && tuto == true){

        telaBlur = new PIXI.Application({transparent: true});
        telaBlur.renderer.autoResize = true;
        telaBlur.renderer.view.style.position = "absolute";
        telaBlur.renderer.view.style.display = "block";
        telaBlur.renderer.resize(window.innerWidth, window.innerHeight);
        document.body.appendChild(telaBlur.view);
        var blur = new PIXI.filters.BlurFilter();
        var instruc = new PIXI.Text("CLIQUE NO BLOCO MAIS A ESQUERDA PARA INICIAR O JOGO",style);
                
        instruc.anchor.set(0.5);
        instruc.x = window.innerWidth/2;
        instruc.y = window.innerHeight/2;
        blur.blur = 15;
        tela.stage.filters = [blur];

        telaBlur.stage.addChild(instruc);
        instruc.alpha = 1;
        TweenMax.to(instruc,6,{pixi: {alpha: 0}, onComplete:desabiitablur});

    }else if(estagio == 4 && tuto == true){
            
            telaBlur = new PIXI.Application({transparent: true});
            telaBlur.renderer.autoResize = true;
            telaBlur.renderer.view.style.position = "absolute";
            telaBlur.renderer.view.style.display = "block";
            telaBlur.renderer.resize(window.innerWidth, window.innerHeight);
            document.body.appendChild(telaBlur.view);

            var blur = new PIXI.filters.BlurFilter();
            var instruc = new PIXI.Text("CLIQUE NO BLOCO CENTRAL PARA SELECIONAR O MODIFICADOR DESEJADO \n " +
                                        "A CADA CLIQUE O MODIFICADOR IRA MUDAR",
                                        style);


            instruc.anchor.set(0.5);
            instruc.x = window.innerWidth/2;
            instruc.y = window.innerHeight/2;
            blur.blur = 15;
            tela.stage.filters = [blur];
            telaBlur.stage.addChild(instruc);
            instruc.alpha = 1;
            TweenMax.to(instruc,8,{pixi: {alpha: 0}, onComplete:desabiitablur});
        }
}

function desabiitablur(){
    //tira filtro da tela principal e retira a tela com a msg de tutorial
    tela.stage.filters = null;
    telaBlur.destroy(true);

}

    
       
   

