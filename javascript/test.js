function help(command, error) {
	switch(command) {
	case "ls":
		message = "ls: invalid option";
		if (error != "") {
			message = message + " -- '" + error + "'";
		}
		message += "\n";
		window.alert(message + "Try 'ls --help' for more information.");
		break;
	default:
		window.alert("-fbcli: " + command + ": command not found");
	}
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
		} else {
			help(input_arr[0], "");
		}
		break;
	case 2:
		if (input_arr[0] == "ls") {
			if (input_arr[1] == "-n") {
				print_news_feed();
			} else if(input_arr[1] == "-f") {
				print_friends();
			} else {
				help(input_arr[0],input_arr[1]);
			}
		} else {
			help(input_arr[0], "");
		}
		break;
	default:
	}
	return;
}
