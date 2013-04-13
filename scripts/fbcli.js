$("#cline").keyup(function(event){
    if(event.keyCode == 13){
        updateTerminal();
    }
});

$("#cline").focus();
$(document).click(function() { $("#cline").focus() });

function initial() { var prompt = "[userna@facebook.com ~]$ <input autofocus='autofocus' id='cline' type='text' size='65' name='cline' maxlength='100'></br>";
	$('#prompt').innerHTML = prompt;
	var cli = document.getElementById('cline');
	cli.value = "";
}

initial();

function updateTerminal()
{
	var cli = document.getElementById('cline');
	output = parse_input(cli.value);
	$('#prompt').before('['+window.user.substring(0,6)+'@facebook.com ~]$ ' + cli.value + '</br>');
	if (output != "") {
		output += '</br>';
	}
	$('#prompt').before(output);
	cli.value = "";
	$("#console").scrollTop($("#console")[0].scrollHeight);
	var prompt = "["+window.user.substring(0,6)+"@facebook.com ~]$ <input autofocus='autofocus' id='cline' type='text' size='65' name='cline' maxlength='100'></br>";
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
		break;
	case "wall":
		message = "wall: invalid argument </br> Try 'wall --help' for more information.";
	case "find":
		if (message == "") {
			return "find: insufficient arguments </br> Try 'find --help' for more information.";
		} else {
			message = "find: invalid option";
			message = message + " -- '" + parameter + "'";
			message += "</br>";
			return message + "Try 'find --help' for more information.";
		}
		break;
	case "helper_help":
		return "help: invalid option </br> Try 'help' for more information.";
		break;
	case "login":
		return "You are already logged in.";
		break;
	case "logout":
		return "You are already logged out.";
		break;
	default:
		return "-fbcli: " + command + ": command not found";
	}
	return "";
}

function help(command) {
	switch(command) {
	case "ls":
		return whatis("ls") + "<br>" + "Usage: ls [COUNT]";
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
	case "find":
		return whatis("find") + "</br>" + "Usage: find SEARCH_STRING";
		break;
	case "wall":
		return whatis("wall") + "</br>" + "Usage: wall [USER_ID]";
		break;
	case "login":
		return whatis("login") + "</br>" + "Usage: login";
		break;
	case "logout":
		return whatis("logout") + "</br>" + "Usage: logout";
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

function helper_help() {
	message = help("login") + "</br>" + whatis("logout") + "</br>" + whatis("ls") + "</br>" + whatis("whatis") + "</br>" + whatis("whoami") + "</br>" +  whatis("find") + "</br>" +  whatis("echo") + "</br>" + whatis("wall");
	return message +  "</br> Use the --help flag with any of those commands to learn more.";
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
	case "wall":
		return "wall(1)\t\t- view your own wall or the wall of another user";
		break;
	case "":
		return "whatis what?";
		break;
	case "--help":
		return help("whatis");
		break;
	case "echo":
		return "echo (1)\t\t- sets input text as new status";
		break;
	case "find":
		return "find (1)\t\t- search for friends based on query";
		break;
	case "login":
		return "login (1)\t\t- connect to facebook, no GUI required";
		break;
	case "logout":
		return "logout (1)\t\t- disconnect from facebook";
		break;
	default:
		return error("whatis", command);
	return "";
	}
}

function print_news_feed(num) {
	getUserWall(num);
	return "";
}

function print_friends() {
	return "List o' friends";
}

function ls(args) {
	if (args == "") {
		return print_news_feed(6);
	} else if (args == "--help") {
		return help("ls");
	} else if (args.substring(0,2) == "-u") {
		getUserWall(10,args.substring(2));
	} else if (parseInt(args) != NaN) {
		return print_news_feed(parseInt(args));
	} else {
		return error("ls", args);
	}
	return "";
}

function echo(message) {
	if (message.length == 0) {
		return "Invalid status";
	} else if (message[0] == "--help") {
		return help("echo");
	} else if (message[0] == "-u") {
		postFriend(message[1]);
	} else if (message.length == 1) {
		postStatus(message[0]);
	}
	return "";
}

function find(search) {
	if (search == --help) {
		return help("find");
	} else if (search == "") {
		return error("find", "");
	} else if (search[0] == "-") {
		return error("find", search);
	} else {
		getUserFriends(search);
		return "";
	}
}

function wall(id) {
	if (id == "") {
		getUserWall(15);
		return "";
	} else if (id == "--help") {
		return help("wall");
	} else {
		num_id =  parseInt(id);
		if (num_id != NaN) {
			getUserWall(15, num_id);
			return "";
		}
	}
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
			return echo(new Array());
		} else if (input_arr[0] == "find") {
			return find("");
		} else if (input_arr[0] == "help") {
			return helper_help();
		} else if (input_arr[0] == "login") {
			login();
		} else if (input_arr[0] == "logout") {
			logout();
		} else if (input_arr[0] == "cat") {
			return "=^..^=  meow";
		} else if (input_arr[0] == "wall") {
			return wall("");
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
			var temp = new Array;
			temp.push(input_arr[1]);
			return echo(temp);
		} else if (input_arr[0] == "find") {
			return find(input_arr[1]);
		} else if (input_arr[0] == "help") {
			return error("help", "");
		} else if (input_arr[0] == "login") {
			return "Invalid login";
		} else if (input_arr[0] == "logout") {
			return "Invalid logout";
		} else if (input_arr[0] == "wall") {
			return wall(input_arr[1]);
		} else {
			return error(input_arr[0], "");
		}
		break;
	case 3:
		if (input_arr[0] == "ls" && input_arr[1] == "-u") {
			return ls(input_arr[1]+" "+input_arr[2]);
		} else if (input_arr[0] == "echo" && input_arr[1] == "-u") {
			var temp = new Array();
			temp.push(input_arr[1]);
			temp.push(input_arr[2]);
			return echo(temp);
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
		} else if (input_arr[0] == "find") {
			return find(input_arr[1]);
		} else if (input_arr[0] == "help") {
			return error("help", "");
		} else if (input_arr[0] == "login") {
			return "Invalid login";
		} else if (input_arr[0] == "logout") {
			return "Invalid logout";
		} else if (input_arr[0] == "wall") {
			return error("wall", input_arr[1] + input_arr[2]);
		} else {
			return error(input_arr[0], "");
		}
	}
	return "";
}

$('#cc').click(function() { 
	$('#prompt').before('['+window.user.substring(0,6)+'@facebook.com ~]$  man cchan</br>');
	$('#prompt').before("Calvin Chan</br>email: <a href='mailto:calvin.c.h@gmail.com'>calvin.c.h@gmail.com</a></br>website: <a href='http://www.thecalvinchan.com/'>www.thecalvinchan.com</a></br>");
	$("#console").scrollTop($("#console")[0].scrollHeight);
	var prompt = "["+window.user.substring(0,6)+"@facebook.com ~]$ <input autofocus='autofocus' id='cline' type='text' size='65' name='cline' maxlength='100'></br>";
	$('#prompt').innerHTML = prompt;
	document.getElementById('cline').value = "";
	});
$('#jw').click(function() { 
	$('#prompt').before('['+window.user.substring(0,6)+'@facebook.com ~]$  man jwu</br>');
	$('#prompt').before("James Wu</br>email: <a href='mailto:jwu@efunda.com'>jwu@efunda.com</a></br>website: <a href='http://wuzhonglin.bol.ucla.edu/'>wuzhonglin.bol.ucla.edu</a></br>");
	$("#console").scrollTop($("#console")[0].scrollHeight);
	var prompt = "["+window.user.substring(0,6)+"@facebook.com ~]$ <input autofocus='autofocus' id='cline' type='text' size='65' name='cline' maxlength='100'></br>";
	$('#prompt').innerHTML = prompt;
	document.getElementById('cline').value = "";
	});
$('#dd').click(function() { 
	$('#prompt').before('['+window.user.substring(0,6)+'@facebook.com ~]$  man dduan</br>');
	$('#prompt').before("Daniel Duan</br>email: <a href='mailto:danielduan88@yahoo.com'>danielduan88@yahoo.com</a></br>website: <a href='http://www.danielduan.net/'>www.danielduan.net</a></br>");
	$("#console").scrollTop($("#console")[0].scrollHeight);
	var prompt = "["+window.user.substring(0,6)+"@facebook.com ~]$ <input autofocus='autofocus' id='cline' type='text' size='65' name='cline' maxlength='100'></br>";
	$('#prompt').innerHTML = prompt;
	document.getElementById('cline').value = "";
	});
$('#aa').click(function() { 
	$('#prompt').before('['+window.user.substring(0,6)+'@facebook.com ~]$  man aagarwal</br>');
	$('#prompt').before("Aman Agarwal</br>email: <a href='mailto:amanaamazing@gmail.com'>aman.agarwal.2718@gmail.com</a></br>website: <a href='http://www.seas.ucla.edu/~aman/'>www.seas.ucla.edu/~aman</a></br>");
	$("#console").scrollTop($("#console")[0].scrollHeight);
	var prompt = "["+window.user.substring(0,6)+"@facebook.com ~]$ <input autofocus='autofocus' id='cline' type='text' size='65' name='cline' maxlength='100'></br>";
	$('#prompt').innerHTML = prompt;
	document.getElementById('cline').value = "";
	});
