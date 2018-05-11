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
