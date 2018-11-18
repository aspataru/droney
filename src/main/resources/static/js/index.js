var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
  playerDefaults = { autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3 };
var vid = [
  { 'videoId': 'm2Xw8Fg4Dwg', 'startSeconds': 0, 'endSeconds': 10, 'suggestedQuality': 'hd540', 'description': 'Cooking'},
  {'videoId': 'QvHUVAGBct4', 'startSeconds': 90, 'endSeconds': 100, 'suggestedQuality': 'hd540', 'description': 'Nara'}
  // {'videoId': 'OWsCt7B-KWs', 'startSeconds': 0, 'endSeconds': 240, 'suggestedQuality': 'hd720'},
  // {'videoId': 'qMR-mPlyduE', 'startSeconds': 19, 'endSeconds': 241, 'suggestedQuality': 'hd720'}
],
  randomVid = Math.floor(Math.random() * vid.length),
  currVid = randomVid;

var overlayShowing = false;

$('.hi em:last-of-type').html(vid.length);

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
   // state is playback finished 
  else if (e.data === 0) {
    $('#tv').removeClass('active');
    tv.loadVideoById(vid[currVid]);
    tv.seekTo(vid[currVid].startSeconds);
  }
  // playback paused
  else if (e.data === 2) {
    $('#tv').removeClass('active');
    if (currVid === vid.length - 1) {
      currVid = 0;
    } else {
      currVid++;
    }
    tv.loadVideoById(vid[currVid]);
    tv.seekTo(vid[currVid].startSeconds);
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

$('.hi span:first-of-type').on('click', function () {
  $('#tv').toggleClass('mute');
  $('.hi em:first-of-type').toggleClass('hidden');
  if ($('#tv').hasClass('mute')) {
    tv.mute();
  } else {
    tv.unMute();
  }
});

$('.hi span:last-of-type').on('click', function () {
  $('.hi em:nth-of-type(2)').html('~');
  tv.pauseVideo();
});

// new
function toggleOverlay() {
  var displayValue = "none";
  if (overlayShowing) {
    displayValue = "block";
  }
  document.getElementById("overlay").style.display = displayValue;
  overlayShowing = !overlayShowing;
}

function nextVideo() {
  // hack :)
  tv.pauseVideo();
}