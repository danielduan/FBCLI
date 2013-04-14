var stack = new Array();
var stacknum = 0;
var current = 0;

$("#cline").keyup(function(event){
    if(event.keyCode == 13){
        updateTerminal();
    } else if(event.keyCode == 38){ //up arrow
    	if (current > 0) {
    		current--;
    		document.getElementById('cline').value = stack[current];
    	}
    } else if (event.keyCode == 40){
    	if (current < stacknum - 1) {
    		current++;
    		document.getElementById('cline').value = stack[current];
    	}
    }
});

var tabc = "\xA0\xA0\xA0\xA0";

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
	stack[stacknum] = cli.value;
	current = stacknum;
	stacknum++;
	console.log(stacknum);
	output = parse_input(cli.value);
	$('#prompt').before('['+window.user.substring(0,6)+'@facebook.com ~]$ ' + cli.value + '</br>');
	if (output != "") {
		output += '</br>';
	}
	$('#prompt').before(output);
	cli.value = "";
	//$("#console").scrollTop($("#console")[0].scrollHeight);
	var prompt = "["+window.user.substring(0,6)+"@facebook.com ~]$ <input autofocus='autofocus' id='cline' type='text' size='65' name='cline' maxlength='100'></br>";
	$('#prompt').innerHTML = prompt;
	$("#console").scrollTop($("#console")[0].scrollHeight);
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
	case "cd":
		cdhelp = "Try 'cd --help' for more information.";
		if (parameter == "") {
			return "cd: must include POST_ID." + "</br>" + cdhelp;
		} else {
			return "cd: extra operand `" + parameter + "</br>" + cdhelp;
		}
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
	case "comment":
		tryhelp = "Try 'comment --help' for more information.";
		if (parameter == "") {
			return "# (comment): insufficient arguments </br>" + tryhelp;
		} else if (parameter == "id") {
			return "# (comment): insufficient arguments </br>" + tryhelp;
		} else if (parameter == "NaN") {
			return "# (comment): id argument must be a number </br>" + tryhelp;
		}
		break;
	case "man":
		manhelp = "Try 'man --help' for more information";
		if (parameter == "") {
			return "man: invalid option. Requires User_Id. </br>" + manhelp;
		} else {
			return "man: invalid argument: " + parameter + "</br>" + manhelp;
		}
		break;
	case "rm":
		if (parameter == "") {
			return "rm: insufficient arguments, requires ITEM_ID. </br> Try 'rm --help' for more information.";
		} else {
			return "rm: invalid argument: " + paramter + "</br> Try 'rm --help' for more information.";
		}
		break;
	case "like":
		if (parameter == "") {
			return "like: insuffiecient arguments, requires ITEM_ID. </br> Try 'like --help' for more information.";
		} else {
			return "like: invalid argument: " + parameter + "</br> Try 'like --help' for more information.";d
		}
		break;
	default:
		return "-fbcli: " + command + ": command not found";
	}
	return "";
}

function help(command) {
	switch(command) {
	case "ls":
		return whatis("ls") + "</br>" + tabc + "Usage: ls [COUNT=6]" + "</br>" + whatis("ls2") + "</br>" + tabc + "Usage: ls - u COUNT";
		break;
	case "whatis":
		return whatis("whatis") + "</br>" + tabc + "Usage: whatis KEYWORD";
		break;
	case "whoami":
		return whatis("whoami") + "</br>" + tabc + "Usage: whoami";
		break;
	case "echo":
		return whatis("echo") + "</br>" + tabc + "Usage: echo STATUS_POST" + "</br>" + whatis("echo2") + "</br>" + tabc + "Usage: echo -u WALL_POST";
		break;
	case "comment":
		return whatis("comment") + "</br>" + tabc + "Usage: # ID_POST MESSAGE_STRING";
		break;
	case "find":
		return whatis("find") + "</br>" + tabc + "Usage: find SEARCH_STRING";
		break;
	case "wall":
		return whatis("wall") + "</br>" + tabc + "Usage: wall [USER_ID=me]";
		break;
	case "login":
		return whatis("login") + "</br>" + tabc + "Usage: login";
		break;
	case "logout":
		return whatis("logout") + "</br>" + tabc + "Usage: logout";
		break;
	case "man":
		return whatis("man") + "</br>" + tabc + "Usage: man USER_ID";
		break;
	case "cd":
		return whatis("cd") + "</br>" + tabc + "Usage: cd POST_ID";
		break;
	case "rm":
		return whatis("rm") + "</br>" + tabc + "Usage: rm ITEM_ID";
		break;
	case "like":
		return whatis("like") + "</br>" + tabc + "Usage: like ITEM_ID";
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
	message = help("login") + "</br>" + help("logout") + "</br>" + help("ls") + "</br>" + help("whatis") + "</br>" + help("whoami") + "</br>" +  help("find") + "</br>" +  help("echo") + "</br>" + help("wall") + "</br>" + help("man") + "</br>" + help("comment") + "</br>" + help("cd") + "</br>" + help("rm") + "</br>" + help("like");
	return message;
}

function whatis(command) {
	switch(command) {
	case "ls":
		return "ls (1)- list your own activity";
		break;
	case "ls2":
		return "ls (2)- list activity of other users";
		break;
	case "whatis":
		return "whatis (1)- display manual page descriptions";
		break;
	case "whoami":
		return "whoami (1)- prints effective user id";
		break;
	case "wall":
		return "wall(1)- view your own wall or the wall of another user";
		break;
	case "":
		return "whatis what?";
		break;
	case "--help":
		return help("whatis");
		break;
	case "echo":
		return "echo (1)- sets input text as new status";
		break;
	case "comment":
		return "# (1) - comment on posts";
		break;
	case "echo2":
		return "echo (2)- sets input text as wall post";
		break;
	case "find":
		return "find (1)- search for friends based on query";
		break;
	case "man":
		return "man (1)- display information about your friends";
		break;
	case "login":
		return "login (1)- connect to facebook, no GUI required";
		break;
	case "logout":
		return "logout (1)- disconnect from facebook";
		break;
	case "cd":
		return "cd (1)- access connections to a post";
		break;
	case "rm":
		return "rm (1)- remove items such as posts and comments";
		break;
	case "like":
		return "like (1)- like an item";
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
		console.log("ssssss");
		postStatus(message[0]);
	}
	return "";
}

function man(string_id) {
	if (string_id.length == 0) {
		return error("man","");
	} else if (string_id.length == 1) {
		if (string_id[0] == "--help") {
			return help("man");
		}
		intform = parseInt(string_id[0]);
		if (intform != NaN) {
			getUserInfo(intform);
			return "";
		} else {
			return error("man", string_id[0]);
		}
	}
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

function comment(id, message) {
	if (id == "") {
		return error("comment", "");
	} else if (id == "--help") {
		return help("comment");
	}
	if (message == "") {
		return error("comment", "id");
	}
	postComment(id, message);
	return "";
}

function cd(id) {
	if(id == "") {
		return error("cd", "");
	} else {
		getPostComments(id);
		return "";
	}
}

function rm(id) {
	if(id == "") {
		return error("rm", "");
	} else if (id == "--help") {
		return help("rm");
	} else {
		deletePost(id);
		return "";
	}
}

function like(id) {
	if (id == "") {
		return error("like", id);
	} else if (id == "--help") {
		return help("like");
	} else {
		likePost(id);
		return "";
	}
}

function parse_input(input) {
	checkLogon(); 
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
		} else if (input_arr[0] == "#") {
			return comment("","");
		} else if (input_arr[0] == "man") {
			return man(new Array());
		} else if (input_arr[0] == "exit") {
			setTimeout(function(){var ww = window.open(window.location, '_self'); ww.close(); }, 2000);
			return "Goodbye.";
		} else if (input_arr[0] == "cd") {
			return cd("");
		} else if (input_arr[0] == "rm") {
			return rm("");
		} else if (input_arr[0] == "troll") {
			window.open("http://bringvictory.com/");
		} else if (input_arr[0] == "meatspin") {
			window.open("http://www.backgroundsdesktop.org/wallpapers/troll_face_background-1680x1050.jpg");
		} else if (input_arr[0] == "like") {
			return like("");
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
		} else if (input_arr[0] == "#") {
			return comment(input_arr[1],"");
		} else if (input_arr[0] == "help") {
			return error("help", "");
		} else if (input_arr[0] == "login") {
			return "Invalid login";
		} else if (input_arr[0] == "logout") {
			return "Invalid logout";
		} else if (input_arr[0] == "wall") {
			return wall(input_arr[1]);
		} else if (input_arr[0] == "man") {
			var temp = new Array;
			temp.push(input_arr[1]);
			return man(temp);
		} else if (input_arr[0] == "cd") {
			return cd(input_arr[1]);
		} else if (input_arr[0] == "git" && input_arr[1] == "revert") {
			window.open("http://www.thefacebook.us/");
		} else if (input_arr[0] == "rm") {
			return rm(input_arr[1]);
		} else if (input_arr[0] == "like") {
			return like(input_arr[1]);
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
		} else if (input_arr[0] == "rm") {
			return error("rm", input_arr[2]);
		} else if (input_arr[0] == "echo") {
			if (input_arr[1] == "-u") {
				var temp = new Array();
				temp.push(input_arr[1]);
				temp.push(input_arr[2]);
				return echo(temp);
			} else {
				var temp = new Array();
				message = "";
				for (i = 1; i < input_arr_len; i++) {
					message += input_arr[i];
					message += " ";
				}
				console.log(message);
				temp.push(message);
				return echo(temp);
			}
		} else if (input_arr[0] == "find") {
			return find(input_arr[1]);
		} else if (input_arr[0] == "help") {
			return error("help", "");
		} else if (input_arr[0] == "#") {
			id = input_arr[1];
			input_arr.splice(0,2);
			message = input_arr.join(" ");
			comment(id, message);				
		} else if (input_arr[0] == "login") {
			return "Invalid login";
		} else if (input_arr[0] == "logout") {
			return "Invalid logout";
		} else if (input_arr[0] == "wall") {
			return error("wall", input_arr[1] + input_arr[2]);
		} else if (input_arr[0] ==  "man") {
			var temp = new Array();
			for (i = 1; i < input_arr_len; i++) {
				temp.push(input_arr[i]);
			}
			return man(temp);
		} else if (input_arr[0] == "cd") {
			return error("cd", input_arr[2]);
		} else if (input_arr[0] == "like") {
			return error("like", input_arr[2]);
		} else {
			return error(input_arr[0], "");
		}
	}
	return "";
}

if (document.images) {
    img1 = new Image();
    img1.src = "../img/dotshover.png";
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
$('#os').click(function() { 
	$('#prompt').before('[fbcli@facebook.com ~]$  man about</br>');
	$('#prompt').before("FBCLI is a hack created by Calvin Chan, James Wu, Aman Agarwal, and Daniel Duan for the 2013 SoCal Facebook Hackathon in a period of 24 hours. <br> More information about each individual can be found by clicking their respective links at the botom of this page. Unless otherwise noted, all code is the sole property of the four individuals.</br> <br> The following software may be included in this product: jsascii. part of jsascii was used in the ASCII picture generation process. This software contains the following license and notice below:<br><br>The MIT License<br><br>Copyright (c) 2007-2009 Jacob Seidelin<br><br>Permission is hereby granted, free of charge, to any person obtaining a copy<br>of this software and associated documentation files (the 'Software'), to deal<br>in the Software without restriction, including without limitation the rights<br>to use, copy, modify, merge, publish, distribute, sublicense, and/or sell<br>copies of the Software, and to permit persons to whom the Software is<br>furnished to do so, subject to the following conditions:<br><br>The above copyright notice and this permission notice shall be included in<br>all copies or substantial portions of the Software.<br><br>THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING <br>BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT <br>HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, <br>ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</br>");
	$("#console").scrollTop($("#console")[0].scrollHeight);
	var prompt = "["+window.user.substring(0,6)+"@facebook.com ~]$ <input autofocus='autofocus' id='cline' type='text' size='65' name='cline' maxlength='100'></br>";
	$('#prompt').innerHTML = prompt;
	document.getElementById('cline').value = "";
	});
