function getUserInfo() {
	FB.api('/me?fields=id,name,email,gender', function(response) {
	  	var array = new Array();
	  	array.push(response);
	  	render(array);
	});
}

function getUserActivity(numberPosts) {
	FB.api('/me/posts?fields=id,status_type,created_time,story,message', { limit: numberPosts }, function(response) {
		var array = new Array();
		for(var i=0;i<response.data.length;i++)
		{
			array.push(response.data[i])
		}
	  	render(array);
	});
}

function getUserWall(numberPosts) {
	FB.api('/me/feed?fields=id,status_type,created_time,story,message', { limit: numberPosts }, function(response) {
		var array = new Array();
		for(var i=0;i<response.data.length;i++)
		{
			array.push(response.data[i])
		}
	  	render(array);
	});
}

function getUserFriends(search) {
	FB.api('/me?fields=friends', function(response) {
		var array = new Array();
		for (var i=0;i<response.friends.data.length;i++)
		{
			console.log("looping");
			console.log(response.friends.data[i]);
			if (search && response.friends.data[i].name.toLowerCase().indexOf(search.toLowerCase()) < 0)
				continue;
			console.log("looping2");
			array.push(response.friends.data[i]);
		}
		render(array);
	});
}

function render(array) {
	var target = document.getElementById("console");
	for (var i=0;i<array.length;i++)
	{
		for (var property in array[i])
		{
			if (!property)
				continue;
			var string = "<p>" + array[i][property] + "</p>";
			target.innerHTML += string;
		}
		target.innerHTML += "<br>";
	}
}