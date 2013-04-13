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

function postFriend(id) {
	var temp = {
		method: 'feed',
        to: id,
	}
	FB.ui(temp, function(response) {
	  	if (!response || response.error) 
	  	{
	    	alert('Error occured');
	  	} 
	  	else 
	  	{
	    	console.log('New Post ID: ' + response.post_id);
	  	}
	});
}