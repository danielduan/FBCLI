$("#cline").keyup(function(event){
    if(event.keyCode == 13){
        updateTerminal();
    }
});

function updateTerminal()
{
	var cli = document.getElementById('cline');
    consolation.innerHTML += cli.value + "</br>";
    cli.value = "";
    $("#consolation").animate({
        scrollTop: $("#consolation").height()
    }, 300);
}
