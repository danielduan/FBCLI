// Additional JS functions here
window.fbAsyncInit = function() {
  FB.init({
    appId      : '443620105724613', // App ID
    channelUrl : 'http://www.fbcli.net/channel.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

};

// Load the SDK Asynchronously
(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
   window.permissions = "email,read_friendlists,user_status,user_likes,user_relationships,user_about_me,user_birthday,read_stream,manage_notifications,publish_actions";
   window.user = "guest";
}(document));

function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            //checkLogon(); <-- gonna shoot whoever put this here cause its calling login twice
            $('#prompt').before('You are now logged in. Type "whoami" to view your own profile.<br>');
        } else {
            // cancelled
        }
    },{scope: permissions});
}

function logout() {
    FB.logout(function(response) {
        $('#prompt').before('You are now logged out.<br>');
    });
    window.user = "guest";
    $('.username').text(window.user);
}

function checkLogon() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
        // User logged into FB and authorized
        FB.api('/me', function(response) {
          window.user = response.name;
          $('.username').text(window.user.split(' ')[0].toLowerCase());
        });
    } else if (response.status === 'not_authorized') {
        // User logged into FB but not authorized
        login();
    } else {
        // User not logged into FB
        login();
    }
  });
}

function testAPI() {
    // console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        // console.log('Good to see you, ' + response.name + '.');
    });
}
