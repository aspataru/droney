var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
  playerDefaults = { autoplay: 0, autohide: 1, modestbranding: 1, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3 };
var vid = [
  {'videoId': '39Vl-I_QtQ4', 'startSeconds': 5, 'endSeconds': 29, 'suggestedQuality': 'hd720', 'description': 'Veyrier'},
  {'videoId': '6_1Wy7976EY', 'startSeconds': 3, 'endSeconds': 29, 'suggestedQuality': 'hd720', 'description': 'Veyrier'},
  {'videoId': 'ic6LaxGtP1c', 'startSeconds': 6, 'endSeconds': 31, 'suggestedQuality': 'hd720', 'description': 'Salève'},
  {'videoId': 'MQ_oJ7QQPoM', 'startSeconds': 4, 'endSeconds': 23, 'suggestedQuality': 'hd720', 'description': 'Salève'},
  {'videoId': 'ic6LaxGtP1c', 'startSeconds': 4, 'endSeconds': 30, 'suggestedQuality': 'hd720', 'description': 'Salève'},
  {'videoId': 'sgKchpT8-Ng', 'startSeconds': 5, 'endSeconds': 30, 'suggestedQuality': 'hd720', 'description': 'Satigny'},
  {'videoId': 'Z3t-rWEH2ik', 'startSeconds': 20, 'endSeconds': 60, 'suggestedQuality': 'hd720', 'description': 'Gy'},
  {'videoId': 'K6lGuJZer94', 'startSeconds': 5, 'endSeconds': 33, 'suggestedQuality': 'hd720', 'description': 'St-Cergue'},
  {'videoId': 'c5yR_EtI7PA', 'startSeconds': 7, 'endSeconds': 34, 'suggestedQuality': 'hd720', 'description': 'Sixt-Fer-à-Cheval'},
  {'videoId': 'aKy56Vn_iBI', 'startSeconds': 3, 'endSeconds': 33, 'suggestedQuality': 'hd720', 'description': 'Sixt-Fer-à-Cheval'},
  {'videoId': 'S9RhDjvPwPs', 'startSeconds': 5, 'endSeconds': 22, 'suggestedQuality': 'hd720', 'description': 'Creux du Van'},
  {'videoId': 'ihEEHIN7a8', 'startSeconds': 5, 'endSeconds': 33, 'suggestedQuality': 'hd720', 'description': 'L\'Abbaye'},
  {'videoId': 'tdLKRwYlDVw', 'startSeconds': 8, 'endSeconds': 34, 'suggestedQuality': 'hd720', 'description': 'Rougemont'},
  {'videoId': 'msm9jgbLmKc', 'startSeconds': 4, 'endSeconds': 27, 'suggestedQuality': 'hd720', 'description': 'Rougemont'},
  {'videoId': 'AoEo0c4XSBs', 'startSeconds': 2, 'endSeconds': 33, 'suggestedQuality': 'hd720', 'description': 'Moléson'},
  {'videoId': '79XUSbZX0Wg', 'startSeconds': 30, 'endSeconds': 90, 'suggestedQuality': 'hd720', 'description': 'Val d\'Illiez'},
  {'videoId': 'm0_LGC1sLeQ', 'startSeconds': 2, 'endSeconds': 56, 'suggestedQuality': 'hd720', 'description': 'Folegandros'},
  {'videoId': 'O_uVv0tFN_8', 'startSeconds': 5, 'endSeconds': 40, 'suggestedQuality': 'hd720', 'description': 'Folegandros'}
],
currVid = 0;

function onYouTubePlayerAPIReady() {
  tv = new YT.Player('tv', { events: { 'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange }, playerVars: playerDefaults });
}

function onPlayerReady() {
  tv.loadVideoById(vid[currVid]);
  tv.mute();
}

function onPlayerStateChange(e) {
  // update description
  $('.description').html(vid[currVid].description);
  // state is playing
  if (e.data === 1) {
    $('#tv').addClass('active');
    $('.hi em:nth-of-type(2)').html(currVid + 1);
  }
   // state is playback finished or paused
  else if (e.data === 0 || e.data == 2) {
    $('#tv').removeClass('active');
    if (currVid === vid.length - 1) {
      currVid = 0;
    } else {
      currVid++;
    }
    tv.loadVideoById(vid[currVid]);
  }
}

function vidRescale() {
  var w = $(window).width() + 200,
    h = $(window).height() + 200;

  if (w / h > 16 / 9) {
    tv.setSize(w, w / 16 * 9);
    $('.tv .screen').css({ 'left': '0px' });
  } else {
    tv.setSize(h / 9 * 16, h);
    $('.tv .screen').css({ 'left': -($('.tv .screen').outerWidth() - w) / 2 });
  }
}

$(window).on('load resize', function () {
  vidRescale();
});

// new
function nextVideo() {
  // hack :)
  tv.pauseVideo();
}