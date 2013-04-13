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
		message = "whatis: invalid option";
		if (parameter != "") {
			message = message + " -- '" + parameter + "'";
		}
		message += "\n";
		console.log(message + "Try 'whatis --help' for more information.");
		break;
	default:
		console.log("-fbcli: " + command + ": command not found");
	}
	return;
}

function help(command) {
	switch(command) {
	case "ls":
		break;
	case "whatis":
		break;
	default:
	}
	return;
}

function whoami() {
	name = "name";
	console.log(name);
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
	case "":
		console.log("whatis what?");
		break;
	default:
		console.log(command + ": nothing appropriate");
	return;
}

function print_news_feed() {
	window.alert("News Feed");
	return;
}

function print_friends() {
	window.alert("List o' friends");
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
			print_news_feed();
		} else if (input_arr[0] == "whatis") {
			whatis("");
		} else if (input_arr[0] == "whoami") {
			whoami();
		} else {
			error(input_arr[0], "");
		}
		break;
	case 2:
		if (input_arr[0] == "ls") {
			error(input_arr[0],input_arr[1]);
		} else if (input_arr[0] == "whatis") {
			whatis(input_arr[1]);
		} else {
			error(input_arr[0], "");
		}
		break;
	default:
		error(input_arr[0], "");
	}
	return;
}
