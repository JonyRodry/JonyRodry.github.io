(function()
{
	window.addEventListener("load", main);
}());

function main(){

	var som = document.getElementById("som");
	var bk = document.getElementById("back");
	var b1 = document.getElementById("lvl_1");
	var b2 = document.getElementById("lvl_2");
	var b3 = document.getElementById("lvl_3");
	var b4 = document.getElementById("lvl_4");
	var b5 = document.getElementById("lvl_5");
	var reset = document.getElementById("reset");

	document.getElementById('backg').ondragstart = function() { return false; };
	b1.ondragstart = function() { return false; };
	b2.ondragstart = function() { return false; };
	b3.ondragstart = function() { return false; };
	b4.ondragstart = function() { return false; };
	b5.ondragstart = function() { return false; };

	bk.addEventListener("click",senMenu);
	b1.addEventListener("click",click1);
	b2.addEventListener("click",click2);
	b3.addEventListener("click",click3);
	b4.addEventListener("click",click4);
	b5.addEventListener("click",click5);
	reset.addEventListener("click",function(){
		if(confirm("Would you like to reset your progress?")){
			resetFunc();
		}
	});

	if(localStorage._music == "false"){
		som.currentTime = localStorage._musicTime;
		som.play();
	}
	if(localStorage._unlockedLevel == 2){
		click_1();
	}
	else if(localStorage._unlockedLevel == 3){
		click_1();
		click_2();
	}
	else if(localStorage._unlockedLevel == 4){
		click_1();
		click_2();
		click_3();
	}
	else if(localStorage._unlockedLevel == 5){
		click_1();
		click_2();
		click_3();
		click_4();
	}
}

function resetFunc(){
	localStorage._unlockedLevel = 1;
	location.reload();
}

function senMenu(vi){
	localStorage._musicTime = document.getElementById("som").currentTime;
	window.location.href = "login_1.html" ;
}

function click_1(ev){
	var lvl2 = document.getElementById("lvl_2");
	var lvl2img = document.getElementById("img2");

	lvl2.disabled = false;
	lvl2.style.cursor = "pointer";
	lvl2img.style.filter = "blur(0px)";
}

function click_2(ev){
	var lvl3 = document.getElementById("lvl_3");
	var lvl3img = document.getElementById("img3");

	lvl3.disabled = false;
	lvl3.style.cursor = "pointer";
	lvl3img.style.filter = "blur(0px)";
}

function click_3(ev){
	var lvl4 = document.getElementById("lvl_4");
	var lvl4img = document.getElementById("img4");

	lvl4.disabled = false;
	lvl4.style.cursor = "pointer";
	lvl4img.style.filter = "blur(0px)";
}

function click_4(ev){
	var lvl5 = document.getElementById("lvl_5");
	var lvl5img = document.getElementById("img5");

	lvl5.disabled = false;
	lvl5.style.cursor = "pointer";
	lvl5img.style.filter = "blur(0px)";
}

function click1(ev){
	localStorage._currentLevel = 1;
	var lvl2 = document.getElementById("lvl_2");
	var lvl2img = document.getElementById("img2");

	window.location.href = "index.html";

	lvl2.disabled = false;
	lvl2.style.cursor = "pointer";
	lvl2img.style.filter = "blur(0px)";
}

function click2(ev){
	localStorage._currentLevel = 2;
	var lvl3 = document.getElementById("lvl_3");
	var lvl3img = document.getElementById("img3");

	window.location.href = "index.html";

	lvl3.disabled = false;
	lvl3.style.cursor = "pointer";
	lvl3img.style.filter = "blur(0px)";
}

function click3(ev){
	localStorage._currentLevel = 3;
	var lvl4 = document.getElementById("lvl_4");
	var lvl4img = document.getElementById("img4");

	window.location.href = "index.html";

	lvl4.disabled = false;
	lvl4.style.cursor = "pointer";
	lvl4img.style.filter = "blur(0px)";
}

function click4(ev){
	localStorage._currentLevel = 4;
	var lvl5 = document.getElementById("lvl_5");
	var lvl5img = document.getElementById("img5");

	window.location.href = "index.html";

	lvl5.disabled = false;
	lvl5.style.cursor = "pointer";
	lvl5img.style.filter = "blur(0px)";
}

function click5(ev){
	localStorage._currentLevel = 5;
	window.location.href = "index.html";
}
