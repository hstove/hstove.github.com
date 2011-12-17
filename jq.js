// JavaScript Document

$.template("track", "<div id='trackbox'><a data-url='${stream_url}' href='#'>${title}</a>");

$(document).ready(function(){
  $("#container img").hide();
  $('#q').keyup(function(){
    $.ajax({
      url: "https://api.soundcloud.com/tracks.json?" + $('#search').serialize(),
      dataType: 'json',
      beforeSend: 
        function(data){
          $('#results').html('')
        },
      success:
        function(data){
          $('#results').html('')
          var items = [];
          $.each(data, function(key, val){
            items.push("<div id='trackbox'><h2><a data-artist='"+val.user.username+"' data-url=" + val.stream_url + " href='#'>"+val.title+"</a></h2>\
            <span class='plays'>" + val.playback_count+ " plays</span></br>\
            <h4>" + val.user.username+ "</h4></div>");
          });
          $("#container img").hide();
          $('#results').html(items.join(' '));
          getReady();
        }
    });
    $('.btn').click(function(){
      playPause();
    });
  });
  $("#search").submit(function(){
    $.ajax({
      url: "https://api.soundcloud.com/tracks.json?" + $('#search').serialize(),
      dataType: 'json',
      success:
        function(data){
          var items = [];
          $.each(data, function(key, val){
            items.push("<div id='trackbox'><h2><a data-plays='"+val.playback_count+"' data-url=" + val.stream_url + " href='#'>"+val.title+"</a></h2>\
            <span class='plays'>" + val.playback_count+ " plays</span></br>\
            <h4>" + val.user.username+ "</h4></div>");
          });
          $('#results').html(items.join(' '));
          getReady();
        }
    });
    return false;
  })
});
var clientid = "client_id=3191b63184cbb88d54a36d1e6afc3a00";

function getReady(){
  $('#trackbox a').click(function(){
    var url= $(this).attr('data-url') +"?"+ clientid;
    var title= $(this).html();
    var artist = $(this).attr('data-artist');
    $('#topbar h2').html(title);
    $('#topbar h4').html(artist);
    changeSrc(url);
    return false;
  });
}

function changeSrc(url){
  var audioPlayer = document.getElementsByTagName('audio')[0];
  audioPlayer.src = url;
  audioPlayer.load();
  playPause();
}

function playPause(){
  var audioPlayer = document.getElementsByTagName('audio')[0];
  if (audioPlayer.paused) {
          audioPlayer.play();
          $('.btn').html('Pause');
  } else {
          audioPlayer.pause();
          $('.btn').html('Play');
  }
}



