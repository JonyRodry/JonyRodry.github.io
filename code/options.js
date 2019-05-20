(function()
{
	window.addEventListener("load", main);
}());

function main(){

	var som = document.getElementById("som");
	var bk = document.getElementById("back");
	var df1 = document.getElementById("ez");
	var df2 = document.getElementById("med");
	var df3 = document.getElementById("hard");

	document.getElementById('backg').ondragstart = function() { return false; };

	if(localStorage._music == "false"){
		som.currentTime = localStorage._musicTime;
		som.play();
	}

	if(localStorage._difficulty == 1){
		df1.style.color = "black";
		df2.style.color = "grey";
		df3.style.color	= "grey";
	}
	else if(localStorage._difficulty == 2){
		df1.style.color = "grey";
		df2.style.color = "black";
		df3.style.color	= "grey";
	}
	else{
		df1.style.color = "grey";
		df2.style.color = "grey";
		df3.style.color	= "black";
	}


	df1.addEventListener("click",function(){
		localStorage._difficulty = 1;
		df1.style.color = "black";
		df2.style.color = "grey";
		df3.style.color	= "grey";
	});

	df2.addEventListener("click",function(){
		localStorage._difficulty = 2;
		df1.style.color = "grey";
		df2.style.color = "black";
		df3.style.color = "grey";
	});

	df3.addEventListener("click",function(){
		localStorage._difficulty = 3;
		df1.style.color = "grey";
		df2.style.color = "grey";
		df3.style.color = "black";
	});

	bk.addEventListener("click",senMenu);
}

function senMenu(vi){
	localStorage._musicTime = document.getElementById("som").currentTime;
	window.location.href = "login_1.html" ;
}
