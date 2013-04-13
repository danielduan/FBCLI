// Additional JS functions here
window.fbAsyncInit = function() {
  FB.init({
    appId      : '443620105724613', // App ID
    channelUrl : '//fbcli.heroku.com/channel.html', // Channel File
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : false  // parse XFBML
  });

  // Additional init code here
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      alert('connected');
      testAPI();
      document.getElementById('fb-logout').style.display = 'block';
    } 
    else if (response.status === 'not_authorized') {
      alert('not authorized');
      login();
    } 
    else {
      alert('not logged on');
      //login();
      //document.getElementById('fb-logout').style.display = 'block';
    }
   });
};

// Load the SDK Asynchronously
(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
}(document));

function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            // connected
            testAPI();
        } else {
            // cancelled
        }
    });
};

function logout() {
    FB.logout(function(response) {
        alert('User is now logged out');
    });
};

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
    });
};

