var tv,
  playerDefaults = { autoplay: 0, autohide: 1, modestbranding: 1, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3 };
var vid = [
  // Have a default video in the list while fetching the whole list
  { 'videoId': '39Vl-I_QtQ4', 'startSeconds': 5, 'endSeconds': 29, 'suggestedQuality': 'hd720', 'title': 'Loading full video list' }
];
var currVid = 0;
var buffering = false;

$(window).on('load', function () {
  retrieveAndSetVideoList();
  loadYoutubeAPI();
});

$(window).on('resize', function () {
  vidRescale();
});

function loadYoutubeAPI() {
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/player_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubePlayerAPIReady() {
  tv = new YT.Player('tv', { events: { 'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange }, playerVars: playerDefaults });
  vidRescale();
}

function onPlayerReady() {
  console.info("Showing flight #" + currVid);
  tv.loadVideoById(vid[currVid]);
  tv.mute();
}

// Youtube player states
var ENDED = 0, PLAYING = 1, PAUSED = 2, BUFFERING = 3, CUED = 5;
// it seems that the YT player sends ENDED events without actually going through playing...
// adding this counter to make sure we don't take these duplicates into account and skip videos
let endedWithoutPlaying = 0;

function onPlayerStateChange(e) {
  if (e.data != ENDED && e.data != PLAYING && e.data != PAUSED && e.data != BUFFERING) {
    // nothing to do for unknown events
    return;
  }
  if (e.data === PLAYING) {
    endedWithoutPlaying = 0;
    updateVideoData();
    $('#tv').addClass('active');
    hideBuffering();
  }
  else if (e.data === BUFFERING) {
    showBuffering();
  }
  else if (e.data === ENDED) {
    if (++endedWithoutPlaying > 1) {
      return;
    }
    $('#tv').removeClass('active');
    hideBuffering();
    if (currVid === vid.length - 1) {
      currVid = 0;
    } else {
      currVid++;
    }
    console.info("Showing flight #" + currVid);
    tv.loadVideoById(vid[currVid]);
  }
  else if (e.data == PAUSED) {
    $('#tv').removeClass('active');
    hideBuffering();
    if (currVid === vid.length - 1) {
      currVid = 0;
    } else {
      currVid++;
    }
    console.info("Showing flight #" + currVid);
    tv.loadVideoById(vid[currVid]);
  }
}

function updateVideoData() {
  let description = vid[currVid].title
    + ", on: " + vid[currVid].flight.dateAndTime.substring(0, 16)
    + ", avg height(m): " + vid[currVid].flight.averageHeightInMeters
    + ", filmed on: " + vid[currVid].flight.equipment;

  $('.description .descriptionLink').html(description);
  let a = document.getElementById('mapLink');
  a.href = vid[currVid].flight.locationLink
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

function nextVideo() {
  if (buffering) {
    return;
  }
  // hack :)
  tv.pauseVideo();
}

function showBuffering() {
  buffering = true;
  $('.arrow').addClass('border-red');
  $('.arrow').removeClass('arrowhover');
}

function hideBuffering() {
  buffering = false;
  $('.arrow').removeClass('border-red');
  $('.arrow').addClass('arrowhover');
}

function retrieveAndSetVideoList() {
  const Http = new XMLHttpRequest();
  const url = window.location.href + "/videos";
  // DEBUG: when loading this page as a static resource, window.location.href is empty
  // const url = "http://localhost:8080/videos";
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = (e) => {
    json = Http.responseText;
    if (json != "") {
      vid = JSON.parse(json);
      console.info("Loaded " + vid.length + " videos!");
    }
  }
}