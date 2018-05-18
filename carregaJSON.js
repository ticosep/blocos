//carrega a varivel lvls com o conteudo do arquivo JSON
var lvls = (function() {
    var lvls= null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "/levels.json",
        'dataType': "json",
        'success': function (data) {
            lvls = data;
        }
    });
    return lvls;
})();
