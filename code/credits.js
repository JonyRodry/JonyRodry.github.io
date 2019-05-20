(function()
{
	window.addEventListener("load", main);
}());

function main(){

	var sk = document.getElementById("skip");
	var end = document.getElementById("credits");

	document.getElementById('backg').ondragstart = function() { return false; };
	end.addEventListener("animationend",senMenu);


	sk.addEventListener("click",senMenu);
}

function senMenu(vi){
	window.location.href = "login_1.html" ;
}
