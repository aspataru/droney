var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
  playerDefaults = { autoplay: 0, autohide: 1, modestbranding: 1, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3 };
var vid = [
  {'videoId': 'sgKchpT8-Ng', 'startSeconds': 5, 'endSeconds': 30, 'suggestedQuality': 'hd720', 'description': 'Satigny'},
  {'videoId': '39Vl-I_QtQ4', 'startSeconds': 5, 'endSeconds': 29, 'suggestedQuality': 'hd720', 'description': 'Veyrier'},
  {'videoId': 'ic6LaxGtP1c', 'startSeconds': 6, 'endSeconds': 31, 'suggestedQuality': 'hd720', 'description': 'Saleve'},
  {'videoId': 'MQ_oJ7QQPoM', 'startSeconds': 4, 'endSeconds': 23, 'suggestedQuality': 'hd720', 'description': 'Saleve'},
  {'videoId': 'ic6LaxGtP1c', 'startSeconds': 4, 'endSeconds': 30, 'suggestedQuality': 'hd720', 'description': 'Saleve'}
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