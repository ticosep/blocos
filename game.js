//funcao para carregar json em variavel

loadJSON(function(response) {
   
     level = JSON.parse(response);
     alert(level.levels[1].name);

    
});
