function postStatus(content) {
	FB.api('/me/feed', 'post', { message: content }, function(response) {
	  	if (!response || response.error) 
	  	{
	    	alert('Error occured');
	  	} 
	  	else 
	  	{
	    	$('#prompt').before('New Post ID: ' + response.id + '<br>');
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
	    	$('#prompt').before('New Post ID: ' + response.post_id + '<br>');
	  	}
	});
}

function postComment(id, content) {
	FB.api('/'+id+"/comments", 'post', { message: content },  function(response) {
	  	if (!response || response.error) 
	  	{
	    	alert('Error occured');
	  	} 
	  	else 
	  	{
	    	$('#prompt').before('New Comment ID: ' + response.id + '<br>');
	  	}
	});
}