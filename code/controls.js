(function()
{
	window.addEventListener("load", main);
}());

function main(){

	var som = document.getElementById("som");
	var bk = document.getElementById("back");

	document.getElementById('gif').ondragstart = function() { return false; };
	bk.addEventListener("click",senMenu);
	console.log("ola")

	if(localStorage._music == "false"){
		som.currentTime = localStorage._musicTime;
		som.play();
	}


}


function senMenu(vi){

	window.location.href = "login_1.html" ;
}
