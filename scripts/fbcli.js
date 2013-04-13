function error(command, parameter) {
	switch(command) {
	case "ls":
		if (parameter[0] == "-") {
			message = "ls: invalid option";
			if (parameter != "") {
				message = message + " -- '" + parameter + "'";
			}
			message += "\n";
			console.log(message + "Try 'ls --help' for more information.");
		} else {
			console.log("ls: cannot access " + parameter + ": Not a valid option");
		}
		break;
	case "whatis":
		if (parameter[0] == "-") {
			message = "whatis: invalid option";
			if (parameter != "") {
				message = message + " -- '" + parameter + "'";
			}
			message += "\n";
			console.log(message + "Try 'whatis --help' for more information.");
		} else {
			console.log(parameter + ": nothing appropriate");
		}
		break;
	case "whoami":
		console.log("whoami: extra operand `" + parameter + "'\nTry 'whoami --help' for more information.");
		break;
	default:
		console.log("-fbcli: " + command + ": command not found");
	}
	return;
}

function help(command) {
	switch(command) {
	case "ls":
		whatis("ls");
		console.log("Usage: ls");
		break;
	case "whatis":
		whatis("whatis");
		console.log("Usage: whatis KEYWORD");
		break;
	case "whoami":
		whatis("whoami");
		console.log("Usage: whoami");
	default:
	}
	return;
}

function whoami(args) {
	if (args == "--help") {
		help("whoami");
	} else if (args == "") {
		name = "name";
		console.log(name);
	} else {
		error("whoami", args);
	}
	return;
}

function whatis(command) {
	switch(command) {
	case "ls":
		console.log("ls (1)\t\t- list news feed contents");
		break;
	case "whatis":
		console.log("whatis (1)\t\t- display manual page descriptions");
		break;
	case "whoami":
		console.log("whoami (1)\t\t- prints effective user id");
	case "":
		console.log("whatis what?");
		break;
	case "--help":
		help("whatis");
	default:
		error("whatis", command);
	return;
}

function print_news_feed() {
	window.alert("News Feed");
	return;
}

function ls(args) {
	if (args == "") {
		print_news_feed();
	} else {
		error("ls", args);
}

function print_friends() {
	window.alert("List o' friends");
	return;
}

function echo(message) {
	if (message.length == 0) {
		console.log("Invalid status");
	} else if (message == "--help") {
		help("echo");
	} else if (message[0] == "-") {
		error("echo", message);
	} else {
		console.log("The new status will be: " + message);
	}
	return;
}

function parse_input(input) {
	input_arr = input.split(" ");
	input_arr_len = input_arr.length;
	switch(input_arr_len) {
	case 0:
		break;
	case 1:
		if (input_arr[0] == "ls") {
			ls("");
		} else if (input_arr[0] == "whatis") {
			whatis("");
		} else if (input_arr[0] == "whoami") {
			whoami("");
		} else {
			error(input_arr[0], "");
		}
		break;
	case 2:
		if (input_arr[0] == "ls") {
			ls(input_arr[1]);
		} else if (input_arr[0] == "whatis") {
			whatis(input_arr[1]);
		} else if (input_arr[0] == "whoami") {
			whoami(input_arr[1]);
		} else {
			error(input_arr[0], "");
		}
		break;
	default:
		if (input_arr[0] == "ls") {
			ls(input_arr[1]);
		} else if (input_arr[0] == "whatis") {
			for (i = 1; i < input_arr_len; i++) {
				whatis(input_arr[i]);
			}
		} else if (input_arr[0] == "whoami") {
			error(input_arr[0], input_arr[1] + input_arr[2]);
		} else {
			error(input_arr[0], "");
		}
	}
	return;
}
