function changeSrc(url){
  var audioPlayer = document.getElementsByTagName('audio')[0];
  audioPlayer.src = url;
  audioPlayer.load();
  audioPlayer.play();
}