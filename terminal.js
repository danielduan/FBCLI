$("#cline").keyup(function(event){
    if(event.keyCode == 13){
        updateTerminal();
    }
});

$("#cline").focus();
$(document).click(function() { $("#cline").focus() });

function updateTerminal()
{
	var cli = document.getElementById('cline');
    $('#prompt').before(cli.value + '</br>');
    cli.value = "";
    $("#consolation").animate({
        scrollTop: $("#consolation").height()
    }, 300);
}

 