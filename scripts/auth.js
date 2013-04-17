// Additional JS functions here
window.fbAsyncInit = function() {
  FB.init({
    appId      : '443620105724613', // App ID
    channelUrl : '//fbcli.heroku.com/channel.html', // Channel File
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
   window.permissions = "email,read_friendlists,user_status,user_likes,user_relationships,user_about_me,user_birthday,friends_status,read_stream,manage_notifications,publish_actions";
   window.user = "guest";
}(document));

function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            checkLogon();
            console.log("login");
            $('#prompt').before('User is now logged in<br>');
        } else {
            // cancelled
        }
    },{scope: permissions});
}

function logout() {
    FB.logout(function(response) {
        $('#prompt').before('User is now logged out<br>');
    });
    window.user = "guest";
    $('.username').text(window.user);
}

function checkLogon() {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
        // User logged into FB and authorized
        testAPI();
        console.log("check login status");
        FB.api('/me?fields=username', function(response) {
          window.user = response.username;
          $('.username').text(window.user.substring(0,6));
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
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
    });
}


