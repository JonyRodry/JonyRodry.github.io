(function()
{
	window.addEventListener("load", main);
}());


function main(){

	var imagem = document.getElementById("imagem");
	var audio = document.getElementById("som");
	var ima = document.getElementById("audio");
	var game = document.getElementById("game")
	var opt = document.getElementById("options");
	var ctr = document.getElementById("controls");
	var cdt = document.getElementById("credits");

	imagem.ondragstart = function() { return false; };
	document.getElementById("shield").ondragstart = function() { return false; };
	document.getElementById("backg").ondragstart = function() { return false; };
	if(localStorage._music == "true"){
		audio.pause();
		imagem.src = "../resources/Info/icon_no_sound_2-512.png";
	}
	else if(localStorage._music == "false"){
		audio.currentTime = localStorage._musicTime;
		audio.play();
		imagem.src = "../resources/Info/565-512.png";
	}

	ima.addEventListener("click",function(){
		if(imagem.src.match("565-512.png")){
			imagem.src = "../resources/Info/icon_no_sound_2-512.png";
			audio.pause();
		}
		else{
			imagem.src = "../resources/Info/565-512.png";
			audio.play();
		}
		localStorage._music = document.getElementById("som").paused;
	});

	game.addEventListener("click",function(){
		localStorage._musicTime = audio.currentTime;
		window.location.href = "new_game.html";}
	);

	opt.addEventListener("click",function(){
		localStorage._musicTime = audio.currentTime;
		window.location.href = "options.html";}
	);

	ctr.addEventListener("click",function(){
		localStorage._musicTime = audio.currentTime;
		window.location.href = "controls.html";}
	);

	cdt.addEventListener("click",function(){
		window.location.href = "credits.html";}
	);



}
