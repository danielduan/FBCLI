function getUserInfo(uid) {
	if (!uid)
		var id = "me";
	else
		var id = uid;
	FB.api('/'+id+'?fields=id,name,birthday,email,gender,relationship_status,about', function(response) {
		response.picture = '<img asciify="true" asciicolor="true" asciiresolution="high" asciiscale="7" src="scripts/img.php?url=http://graph.facebook.com/' + response.id + '/picture"/>';
		var array = new Array();
	  	array.push(response);
	  	render(array);
	});
}

function getUserNotifications() {
	FB.api('/me/notifications?include_read=true', function(response) {
		var array = new Array();
		for(var i=0;i<response.data.length;i++)
		{
			array.push(response.data[i])
		}
	  	render(array);
	});
}

function getUserActivity(numberPosts, uid) {
	FB.api('/me/posts?fields=id,status_type,created_time,story,message', { limit: numberPosts }, function(response) {
		var array = new Array();
		// console.log(response);
		for(var i=0;i<response.data.length;i++)
		{
			array.push(response.data[i])
		}
	  	render(array);
	});
}

function getUserWall(numberPosts, uid) {
	if (!uid)
		var id = "me";
	else
		var id = uid;
	FB.api('/'+id+'/feed?fields=id,status_type,created_time,story,message', { limit: numberPosts }, function(response) {
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
			// console.log("looping");
			// console.log(response.friends.data[i]);
			if (search && response.friends.data[i].name.toLowerCase().indexOf(search.toLowerCase()) < 0)
				continue;
			// console.log("looping2");
			array.push(response.friends.data[i]);
		}
		render(array);
	});
}

function getPostComments(id) {
	FB.api('/'+id+'?fields=comments.fields(id,like_count,message,from.fields(name))', function(response) {
		// console.log(response);
		var array = new Array();
		for(var i=0;i<response.comments.data.length;i++)
		{
			array.push(response.comments.data[i])
		}
	  	render(array);
	});
}

function render(array) {
	var temp = '';
	for (var i=array.length-1;i>=0;i--)
	{
		temp += "<p>&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;</p>";
		for (var property in array[i])
		{
			if (!array[i][property])
				continue;
			else if (typeof(array[i][property])=='object')
			{
				for (var prop in array[i][property])
				{
					temp += "<p>" + array[i][property][prop] + "</p>";
				}
				continue;
			}
			temp += "<p>" + array[i][property] + "</p>";
			// console.log(array[i][property]);
		}
	}
	temp += "<p>&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;</p>";
	$('#prompt').before(temp);
	var aImg = document.getElementsByTagName("img");
                var aImages = [];
                for (var i=0;i<aImg.length;i++) {
                        aImages[i] = aImg[i];
                }

                for (var i=0;i<aImages.length;i++) {
                        if (aImages[i].getAttribute("asciify") == "true") {
                                asciifyImageLoad(aImages[i]);
                        }
                }
                $("#console").scrollTop($("#console")[0].scrollHeight);

}
