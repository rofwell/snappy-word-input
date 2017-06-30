function tempChangeClass(obj, cls, time) {
    $(obj).addClass(cls);
    setTimeout(function(){
        $(obj).removeClass(cls);
    },time);
};

function tempSwapClass(obj, existing, adding, time) {
    $(obj).removeClass(existing);
    $(obj).addClass(adding);
    setTimeout(function(){
    $(obj).addClass(existing);
    $(obj).removeClass(adding);
    },time);
}

function validResponse() {
    tempChangeClass('#submit','rotate-icon',300);
    tempSwapClass('#submit i','fa-arrow-circle-right','fa-refresh',300);

    tempChangeClass('.word','hide-text',150)
    setTimeout(function(){
        $('.word')[0].value = '';
    },150);
}

function invalidResponse() {
    tempChangeClass('body','invalid',300);

    tempChangeClass('#submit','invalid',300);
    tempChangeClass('#submit','rotate-icon',300);

    tempSwapClass('#submit i','fa-arrow-circle-right','fa-ban',300);

    tempChangeClass('.word','hide-text',150)
    setTimeout(function(){
        $('.word')[0].value = '';
    },150);
}

var wordsUsed = [];
var lastEnter = 0;

$(document).ready(function(){
    $('.word').focus();
    $('#input').submit(function(event){
        event.preventDefault(); 
        if(lastEnter + 500 > new Date().getTime()) {
            return;
        }
        lastEnter = new Date().getTime();

        var word = $('.word')[0].value;

        if(word == '' || $.inArray(word,wordsUsed) != -1) {
            invalidResponse();
        } else {
            validResponse();

            wordsUsed.push(word);

            tempChangeClass('body','valid','300');
/*
            $.ajax({
                method: 'GET',
                url: 'php/write_db.php',
                data: {word:word,user:'Anonymous'},
                success: function(data) {
                    if(data == 'success') {
                        tempChangeClass('body','valid',300);
                    } else if (data == 'failure') {
                        tempChangeClass('body','invalid',300);
                    }
                }
            });
*/
        }
    });
    $('#submit').click(function(){
        $('#input').submit();
    });
});