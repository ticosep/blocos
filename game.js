var tela = new PIXI.Application(800, 600);
document.body.appendChild(tela.view);




function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'levels.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {

            // .open will NOT return a value but simply returns undefined in async mode so use a callback
            callback(xobj.responseText);

        }
    }
    xobj.send(null);

}


loadJSON(function(response) {
    
 var level = JSON.parse(response);
 alert(level.name);
});


