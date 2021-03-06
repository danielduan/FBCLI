<!DOCTYPE html>
<html lang="en" xmlns:fb="http://ogp.me/ns/fb#">
    <head>
        <meta charset="utf-8">
        <meta property="og:title" content="FBCLI" />
        <meta property="fb:app_id" content="443620105724613" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://www.fbcli.net/" />
        <meta property="og:image" content="http://www.fbcli.net/img/fbcli.png" />
        <meta name="description" property="og:description" content="The command line interface for Facebook, for those of us who think GUI is too mainstream." />
        <title>FBCLI</title>
        <link href='http://fonts.googleapis.com/css?family=Inconsolata:400,700' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="style.css">
        <link rel="shortcut icon" href="img/favicon.ico"/>
    </head>
    <body>
        <div id="fb-root"></div>
        <div class="row" id="logo"></div>
        <div id="topbar">
            <div id="lights"></div>
            <span>
                <div style="display: inline;" class="username">guest</div>
                &mdash; fbcli &mdash; 100x33
            </span>
        </div>
        <div class="row" id="console">
            <div id="consolation">
                &#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;
<pre>
  __._.        ._ _
 / _| |__   ___| (_)
| |_| '_ \ / __| | |
|  _| |_) | (__| | |
|_| |_.__/ \___|_|_|

</pre>
                Welcome to fbcli, the command line interface for Facebook. </br>
                To get started, type "login" and start hacking away. </br>
                </br>
                &#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;&#126;
                </br>
                <noscript>Please enable Javascript!</br></noscript>
                <span id="prompt">[<span class="username">guest</span>@facebook.com ~]$ <input autofocus='autofocus' id='cline' type='text' size='65' name='cline' maxlength='100'></br></span>
            </div>
        </div>
        <div class="row" id="tasukete"><span>Stuck? Type <code>help</code> for a list of commands!</span></div>
        <div class="row" id="facebook">
            <div class="fb-like" data-href="http://www.fbcli.net" data-send="true" data-layout="button_count" data-width="450" data-show-faces="false" data-font="trebuchet ms" data-colorscheme="dark"></div>
        </div>
        <div class="row" id="twitter">
            <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://www.fbcli.net" data-text="Check out this command line interface for Facebook!" data-hashtags="FBCLI" data-dnt="true">Tweet</a>
            <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
        </div>
        <div id="footer">
            <span>Coded in 24 hours by <span id="cc">Calvin Chan</span>, <span id="jw">James Wu</span>, <span id="dd">Daniel Duan</span>, and <span id="aa">Aman Agarwal</span> and placed 1st in the <a href="https://www.facebook.com/events/527470107303097/" target="_blank">2013 Facebook SoCal Hackathon.</a></span>
            <br><span>FBCLI is created using <span id="os">open source technology</span>. Source code is available <a href="https://github.com/danielduan/FBCLI" target="_blank">here</a>.</span>
        </div>
        <script src="https://code.jquery.com/jquery-1.12.3.min.js" integrity="sha256-aaODHAgvwQW1bFOGXMeX+pC4PZIPsvn2h1sArYOhgXQ=" crossorigin="anonymous"></script>
        <script type="text/javascript" src="scripts/ascii.js"></script>
        <script type="text/javascript" src="scripts/auth.js"></script>
        <script type="text/javascript" src="scripts/display.js"></script>
        <script type="text/javascript" src="scripts/post.js"></script>
        <script type="text/javascript" src="scripts/fbcli.js"></script>
        <!-- google analytics -->
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-40116455-1', 'fbcli.net');
            ga('send', 'pageview');

        </script>
        <!-- end google analytics -->

        <!-- statcounter -->
        <script type="text/javascript">
            var sc_project=8871206;
            var sc_invisible=1;
            var sc_security="e1b54627";
            var scJsHost = (("https:" == document.location.protocol) ?
            "https://secure." : "http://www.");
            document.write("<sc"+"ript type='text/javascript' src='" +
            scJsHost+
            "statcounter.com/counter/counter.js'></"+"script>");
        </script>
        <!-- end statcounter -->
    </body>
</html>
