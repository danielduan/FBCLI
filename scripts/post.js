function postStatus(content) {
	FB.api('/me/feed', 'post', { message: content }, function(response) {
	  	if (!response || response.error) 
	  	{
	    	alert('Error occured');
	  	} 
	  	else 
	  	{
	    	console.log('New Post ID: ' + response.id);
	  	}
	});
}

function postFriend(id,content) {
	FB.api('/735548781/feed', 'post', { message: content }, function(response) {
	  	if (!response || response.error) 
	  	{
	    	alert('Error occured');
	  	} 
	  	else 
	  	{
	    	console.log('New Post ID: ' + response.id);
	  	}
	});
}