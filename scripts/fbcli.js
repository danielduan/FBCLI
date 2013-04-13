$("#cline").keyup(function(event){
    if(event.keyCode == 13){
        updateTerminal();
    }
});

$("#cline").focus();
$(document).click(function() { $("#cline").focus() });

function initial() {
	var prompt = "[userna@facebook.com ~]$ <input autofocus='autofocus' id='cline' type='text' size='70' name='cline' maxlength='100'></br>";
	$('#prompt').innerHTML = prompt;
	var cli = document.getElementById('cline');
	cli.value = "";
}

initial();

function updateTerminal()
{
	var cli = document.getElementById('cline');
	output = parse_input(cli.value);
	$('#prompt').before(output + '</br>');
	cli.value = "";
	$("#console").animate({
		scrollTop: $("#console").height()
	}, 300);
	var prompt = "[userna@facebook.com ~]$ <input autofocus='autofocus' id='cline' type='text' size='70' name='cline' maxlength='100'></br>";
	$('#prompt').innerHTML = prompt;
}

function error(command, parameter) {
	switch(command) {
	case "ls":
		if (parameter[0] == "-") {
			message = "ls: invalid option";
			message = message + " -- '" + parameter + "'";
			message += "<br>";
			return message + "Try 'ls --help' for more information.";
		} else {
			return "ls: cannot access " + parameter + ": Not a valid option";
		}
		break;
	case "whatis":
		if (parameter[0] == "-") {
			message = "whatis: invalid option";
			message = message + " -- '" + parameter + "'";
			message += "<br>";
			return message + "Try 'whatis --help' for more information.";
		} else {
			return parameter + ": nothing appropriate";
		}
		break;
	case "whoami":
		return "whoami: extra operand `" + parameter + "'<br>Try 'whoami --help' for more information.";
		break;
	case "echo":
	default:
		return "-fbcli: " + command + ": command not found";
	}
	return "";
}

function help(command) {
	switch(command) {
	case "ls":
		return whatis("ls") + "<br>" + "Usage: ls";
		break;
	case "whatis":
		return whatis("whatis") + "<br>" + "Usage: whatis KEYWORD";
		break;
	case "whoami":
		return whatis("whoami") + "<br>" + "Usage: whoami";
		break;
	case "echo":
		return whatis("echo") + "<br>" + "Usage: echo STRING";
		break;
	default:
		return error(command,"");
	}
	return "";
}

function whoami(args) {
	if (args == "--help") {
		return help("whoami");
	} else if (args == "") {
		getUserInfo();
		return "";
	} else {
		return error("whoami", args);
	}
	return "";
}

function whatis(command) {
	switch(command) {
	case "ls":
		return "ls (1)\t\t- list news feed contents";
		break;
	case "whatis":
		return "whatis (1)\t\t- display manual page descriptions";
		break;
	case "whoami":
		return "whoami (1)\t\t- prints effective user id";
		break;
	case "":
		return "whatis what?";
		break;
	case "--help":
		return help("whatis");
		break;
	case "echo":
		return "echo (1)\t\t- sets input text as new status";
	default:
		return error("whatis", command);
	return "";
	}
}

function print_news_feed() {
	return "News Feed";
}

function print_friends() {
	return "List o' friends";
}

function ls(args) {
	if (args == "") {
		return print_news_feed();
	} else if (args == "--help") {
		return help("ls");
	} else {
		return error("ls", args);
	}
	return "";
}

function echo(message) {
	if (message.length == 0) {
		return "Invalid status";
	} else if (message == "--help") {
		return help("echo");
	} else if (message[0] == "-") {
		return error("echo", message);
	} else {
		postStatus(message);
		return "Your status has just been set to : " + message;
	}
	return "";
}

function parse_input(input) {
	input_arr = input.split(" ");
	input_arr_len = input_arr.length;
	switch(input_arr_len) {
	case 1:
		if (input_arr[0] == "ls") {
			return ls("");
		} else if (input_arr[0] == "whatis") {
			return whatis("");
		} else if (input_arr[0] == "whoami") {
			return whoami("");
		} else if (input_arr[0] == "") {
		} else if (input_arr[0] == "echo") {
			return echo("");
		} else {
			return error(input_arr[0], "");
		}
		break;
	case 2:
		if (input_arr[0] == "ls") {
			return ls(input_arr[1]);
		} else if (input_arr[0] == "whatis") {
			return whatis(input_arr[1]);
		} else if (input_arr[0] == "whoami") {
			return whoami(input_arr[1]);
		} else if (input_arr[0] == "echo") {
			return echo(input_arr[1]);
		} else {
			return error(input_arr[0], "");
		}
		break;
	default:
		if (input_arr[0] == "ls") {
			return ls(input_arr[1] + input_arr[2]);
		} else if (input_arr[0] == "whatis") {
			output = "";
			for (i = 1; i < input_arr_len; i++) {
				output += whatis(input_arr[i]);
				if ((i -1) < input_arr_len) {
					output += "<br>";
				}
			}
			return output;
		} else if (input_arr[0] == "whoami") {
			return error(input_arr[0], input_arr[1] + input_arr[2]);
		} else if (input_arr[0] == "echo") {
			input_arr.splice(0,1);
			return echo(input_arr.join(" "));
		} else {
			return error(input_arr[0], "");
		}
	}
	return "";
}
