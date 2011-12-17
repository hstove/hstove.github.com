$.template("track", "<div id='trackbox'><a data-url='${stream_url}' href='#'>${title}</a>");

$(document).ready(function(){
  $('#q').keyup(function(){
    $.ajax({
      url: "https://api.soundcloud.com/tracks.json?" + $('#search').serialize(),
      dataType: 'json',
      success:
        function(data){
          var items = [];
          $.each(data, function(key, val){
            items.push("<div id='trackbox'><h2><a data-url=" + val.stream_url + " href='#'>"+val.title+"</a></h2>\
            <span class='plays'>" + val.playback_count+ " plays</span></br>\
            <h4>" + val.user.username+ "</h4></div>");
          });
          $('#results').html(items.join(' '));
          getReady();
        }
    });
  });
});
var clientid = "client_id=3191b63184cbb88d54a36d1e6afc3a00";

function getReady(){
  $('#trackbox a').click(function(){
    var url= $(this).attr('data-url') +"?"+ clientid;
    changeSrc(url);
    return false;
  });
}
