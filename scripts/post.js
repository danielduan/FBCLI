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

function postFriend(id,link) {
	var temp = {
		method: 'feed',
        to: id,
	};
	if (link)
	{
		temp.link = link;
	}
	FB.ui(temp, function(response) {
	  	if (!response || response.error) 
	  	{
	    	console.log('Error occured');
	  	} 
	  	else 
	  	{
	    	console.log('New Post ID: ' + response.post_id);
	  	}
	});
}