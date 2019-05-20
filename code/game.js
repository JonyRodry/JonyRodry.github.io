'use strict'

window.addEventListener('load', init, false);

var towerGame;
var paused = false;
var gameState = "standby";

/*
	standby
	play
	loss
	win
*/

const FrameRate = 30;

function carregaImg(ctx) {

	var nLoad = 0;
	var totLoad = 12;

	var inimigosEasy = new Array(totLoad/3);
	var inimigosMedium = new Array(totLoad/3);
	var inimigosHard = new Array(totLoad/3);


	var enemy1 = new Image();
	enemy1.addEventListener('load', imgLoadedHandler);
	enemy1.id = 'enemy1';
	enemy1.src = '../resources/Enemies/enemy1.png';

	var enemy2 = new Image();
	enemy2.addEventListener('load', imgLoadedHandler);
	enemy2.id = 'enemy2';
	enemy2.src = '../resources/Enemies/enemy2.png';

	var enemy3 = new Image();
	enemy3.addEventListener('load', imgLoadedHandler);
	enemy3.id = 'enemy3';
	enemy3.src = '../resources/Enemies/enemy3.png';

	var enemy4 = new Image();
	enemy4.addEventListener('load', imgLoadedHandler);
	enemy4.id = 'enemy4';
	enemy4.src = '../resources/Enemies/enemy4.png';

	var enemy1up1 = new Image();
	enemy1up1.addEventListener('load', imgLoadedHandler);
	enemy1up1.id = 'enemy1up1';
	enemy1up1.src = '../resources/Enemies/enemy1up1.png';

	var enemy1up2 = new Image();
	enemy1up2.addEventListener('load', imgLoadedHandler);
	enemy1up2.id = 'enemy1up2';
	enemy1up2.src = '../resources/Enemies/enemy1up2.png';

	var enemy2up1 = new Image();
	enemy2up1.addEventListener('load', imgLoadedHandler);
	enemy2up1.id = 'enemy2up1';
	enemy2up1.src = '../resources/Enemies/enemy2up1.png';

	var enemy2up2 = new Image();
	enemy2up2.addEventListener('load', imgLoadedHandler);
	enemy2up2.id = 'enemy2up2';
	enemy2up2.src = '../resources/Enemies/enemy2up2.png';

	var enemy3up1 = new Image();
	enemy3up1.addEventListener('load', imgLoadedHandler);
	enemy3up1.id = 'enemy3up1';
	enemy3up1.src = '../resources/Enemies/enemy3up1.png';

	var enemy3up2 = new Image();
	enemy3up2.addEventListener('load', imgLoadedHandler);
	enemy3up2.id = 'enemy3up2';
	enemy3up2.src = '../resources/Enemies/enemy3up2.png';

	var enemy4up1 = new Image();
	enemy4up1.addEventListener('load', imgLoadedHandler);
	enemy4up1.id = 'enemy4up1';
	enemy4up1.src = '../resources/Enemies/enemy4up1.png';

	var enemy4up2 = new Image();
	enemy4up2.addEventListener('load', imgLoadedHandler);
	enemy4up2.id = 'enemy4up2';
	enemy4up2.src = '../resources/Enemies/enemy4up2.png';

	function imgLoadedHandler(ev) {

		var img = ev.target;
		if (img.id == "enemy1"){
			inimigosEasy[0] = img;
		}
		else if (img.id == "enemy2"){
			inimigosEasy[1] = img;
		}
		else if (img.id == "enemy3"){
			inimigosEasy[2] = img;
		}
		else if (img.id == "enemy4"){
			inimigosEasy[3] = img;
		}
		else if (img.id == "enemy1up1"){
			inimigosMedium[0] = img;
		}
		else if (img.id == "enemy2up1"){
			inimigosMedium[1] = img;
		}
		else if (img.id == "enemy3up1"){
			inimigosMedium[2] = img;
		}
		else if (img.id == "enemy4up1"){
			inimigosMedium[3] = img;
		}
		else if (img.id == "enemy1up2"){
			inimigosHard[0] = img;
		}
		else if (img.id == "enemy2up2"){
			inimigosHard[1] = img;
		}
		else if (img.id == "enemy3up2"){
			inimigosHard[2] = img;
		}
		else if (img.id == "enemy4up2"){
			inimigosHard[3] = img;
		}

		nLoad++;

		if (nLoad == totLoad) {
			var ev2 = new Event('initend');
			ev2.inimigosEasy = inimigosEasy;
			ev2.inimigosMedium = inimigosMedium;
			ev2.inimigosHard = inimigosHard;
			ctx.canvas.dispatchEvent(ev2);
		}
	}
}

function init(){
	var audio = document.getElementById("som1");
	audio.play();
	audio.volume = 0.2;
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	document.getElementById("menu").addEventListener("click",checkClick);
	canvas.addEventListener('initend', comecarJogo);
	carregaImg(ctx);

	function comecarJogo(ev){
		var inimigosEasy = ev.inimigosEasy;
		var inimigosMedium = ev.inimigosMedium;
		var inimigosHard = ev.inimigosHard;
		if(localStorage._difficulty == 1){
			document.getElementById("dificuldade").src = "../resources/Info/easy.png";
		}
		else if (localStorage._difficulty == 2) {
			document.getElementById("dificuldade").src = "../resources/Info/normal.png";
		}
		else{
			document.getElementById("dificuldade").src = "../resources/Info/hard.png";
		}
		towerGame = new Game(inimigosEasy, inimigosMedium, inimigosHard, canvas);
		window.setTimeout(animation, 100/30);
	}
}

function goldGenerator(ev){
	towerGame.moedas = towerGame.moedas + 1; 
	var money = document.getElementById("gold");
	money.innerHTML = towerGame.moedas;
}

function verRonda(ev){
	towerGame.rondaAtual++;
	var ronda = document.getElementById("ronda");
	ronda.innerHTML = "Ronda: " + towerGame.rondaAtual;;
}

function loadEnemies(){
	var nivelAtual = localStorage._currentLevel;

	if(towerGame.inimigos < towerGame.inimigosMax){
		towerGame.inimigos++;

		if(towerGame.inimigos == towerGame.inimigosMax){
			stopEnemies();
		}

		//Local de Spawn
		if(nivelAtual == 3){
			if(towerGame.inimigos%2 == 0){
				var location = new JSVetor(towerGame.initEnemies[nivelAtual-1][0],towerGame.initEnemies[nivelAtual-1][1]);				}
			else{
				var location = new JSVetor(365, 5);
			}
		}
		else if(nivelAtual == 5){
			if(towerGame.inimigos%3 == 0){
				var location = new JSVetor(towerGame.initEnemies[nivelAtual-1][0],towerGame.initEnemies[nivelAtual-1][1]);
			}
			else if(towerGame.inimigos%3 == 1){
				var location = new JSVetor(550, 5);
			}
			else{
				var location = new JSVetor(700, 5);
			}
		}
		else{
			var location = new JSVetor(towerGame.initEnemies[nivelAtual-1][0],towerGame.initEnemies[nivelAtual-1][1]);
		}

		//Vida
		if(nivelAtual == 1){
			var vida = towerGame.hpEnemies[0];
		}
		else if(nivelAtual == 2 || nivelAtual == 3){
			var vida = towerGame.hpEnemies[1];
		}
		else if(nivelAtual == 4 || nivelAtual == 5){
			var vida = towerGame.hpEnemies[2];
		}

		var enemy = new Enemies(towerGame, location, vida, towerGame.imgInimigos, towerGame.speedEnemies);
		towerGame.inimigosAtivos.push(enemy);
	}
}

function stopEnemies(){
		clearInterval(enemyGen);
		verif = setInterval(verifyWin,2000);
}

function verifyWin(){
	if(towerGame.inimigosMortos + towerGame.inimigosPassados == towerGame.inimigosMax){
		gameState = "win";
		clearInterval(verif);
	}
}

function checkClick(){
		paused = !paused;
		var popupDiv = document.getElementById("popUpMenu");
		var go = document.getElementById("continue");
		var levSel = document.getElementById("levelSelect");
		var mMenu = document.getElementById("mainMenu");
		var audio = document.getElementById("som1");

		go.addEventListener("click",cont);
		levSel.addEventListener("click",game);
		mMenu.addEventListener("click",menu);

		if(paused === true){
			popupDiv.style.display = "block";
			document.getElementById("audio").addEventListener("click",changeIcon);
			clearInterval(goldInterval);
			clearInterval(enemyGen);

		}
		else{
			popupDiv.style.display = "none";
			goldInterval = setInterval(goldGenerator,1500);
			enemyGen = setInterval(loadEnemies,2000);
		}
}

function game(){
	window.location.href = "new_game.html";
}

function changeIcon(){
	var audio = document.getElementById("som1");
	if(document.getElementById("imagem").src.match("565-512.png")){
		document.getElementById("imagem").src = "../resources/info/icon_no_sound_2-512.png";
		audio.pause()
	}
	else if(document.getElementById("imagem").src.match("icon_no_sound_2-512.png")){
		document.getElementById("imagem").src = "../resources/info/565-512.png";
		audio.play();
	}
}

function menu(){
	window.location.href = "login_1.html";
}

function cont(){
	paused = !paused;
	document.getElementById("popUpMenu").style.display = "none";
	goldInterval = setInterval(goldGenerator,1500);
	enemyGen = setInterval(loadEnemies,1500)
}

function animation(e){
	towerGame.run();
	window.requestAnimationFrame(animation);

}
function lostGame(){
	document.getElementById("state").innerHTML = "<div id='endMainDiv'><p> You lost :(</p><button id='loseMenu'><img id='loseMenuImg' src='../resources/Info/buttonMenu.png' width='65px' height='65px'></button><button id='loseRetry'><img id='loseRetryImg' src='../resources/Info/buttonRetry.png' width='65px' height='65px'></button></div>";
	document.getElementById("endMainDiv").style.backgroundColor = "orange";
	document.getElementById("endMainDiv").style.border = "3px solid";
	document.getElementById("endMainDiv").style.width="200px";
	document.getElementById("state").style.top = "350px";
	document.getElementById("state").style.left = "325px";
	document.getElementById("loseMenu").style.cursor = "pointer";
	document.getElementById("loseMenu").style.background = "transparent";
	document.getElementById("loseMenu").style.border = "none";
	document.getElementById("loseRetry").style.cursor = "pointer";
	document.getElementById("loseRetry").style.background = "transparent";
	document.getElementById("loseRetry").style.border = "none";
	document.getElementById("loseMenu").addEventListener("click",function(){
		window.location.href = "new_game.html";
	});
	document.getElementById("loseRetry").addEventListener("click",function(){
		window.location.reload();
	});
	var audio = document.getElementById("som1");
	audio.pause()
	document.getElementById("som5").play();
	return;
}

function wonGame(){
	clearInterval(goldInterval);
	clearInterval(enemyGen);
	document.getElementById("state").innerHTML = "<div id='endMainDiv'><p> You Won !!!</p><button id='winButton' width='180px' height='180px' ><img src='../resources/info/Icon_23-512.png' width='180px' height='180px'></button><br id='frase'>-Press to get to level select-</br></div>";
	document.getElementById("endMainDiv").style.backgroundColor = "orange";
	document.getElementById("endMainDiv").style.border = "3px solid";
	document.getElementById("state").style.top = "330px";
	document.getElementById("state").style.left = "325px";
	document.getElementById("winButton").style.backgroundColor = "transparent";
	document.getElementById("winButton").style.border = "none";
	document.getElementById("winButton").style.cursor = "pointer";
	document.getElementById("frase").style.fontSize = "20px";
	var audio = document.getElementById("som1");
	audio.pause()
	var audio = document.getElementById("som2");
	audio.play()
	document.getElementById("winButton").addEventListener("click",function(){
		localStorage._unlockedLevel = parseInt(localStorage._currentLevel) + 1;
		window.location.href = "new_game.html";
	});
}

function startingLevel(){
	gameState = "play";
	document.getElementById("state").innerHTML = null;
	goldInterval = setInterval(goldGenerator,1500);
	enemyGen = setInterval(loadEnemies,2000);
}

var verif;
var goldInterval = setInterval(goldGenerator,1500);
var enemyGen = setInterval(loadEnemies,2000);

class Game{

	constructor(inimigosEasy, inimigosMedium, inimigosHard, canvas){

		this.torresAtivas = [];
		this.inimigosAtivos = [];
		this.balasAtivas =[];
		this.grelhaDasCelulas = [];
		if(localStorage._difficulty == 1){
			this.imgInimigos = inimigosEasy;
		}
		else if(localStorage._difficulty == 2){
			this.imgInimigos = inimigosMedium;
		}
		else if(localStorage._difficulty == 3){
			this.imgInimigos = inimigosHard;
		}
		this.initEnemies = [[650, 5],[550, 5],[540, 5],[400, 5],[385, 5]];
		this.speedEnemies = [0.5, 0.8, 1.10];
		this.hpEnemies = [[10, 15, 20, 25], [20, 30, 35, 40], [30, 40, 50, 60]];
		this.enemiesNivel = [[5, 10, 15, 25, 50], [10, 20, 30, 45, 75], [15, 20, 25, 50, 100]];
		this.inimigos = 0;
		this.inimigosPassados = 0;
		this.inimigosMortos = 0;

		this.moedas = 250;
		this.moedasInimigo = 0;
		this.vidas = Math.floor(Math.round((this.enemiesNivel[localStorage._difficulty-1][localStorage._currentLevel-1])/2);

		this.placingTower = false;
		this.isRunning = true;

		this.canvas = canvas;
		this.canvas.addEventListener('mouseover', this.handleCanvasMouseOver, false);
		this.canvas.addEventListener('mousemove', this.handleCanvasMouseMoved, false);
		this.canvas.addEventListener('click', this.handleCanvasMouseClicked, false);
		this.context = this.canvas.getContext('2d');

		if(localStorage._currentLevel == 1){
			this.canvas.style.backgroundImage = "url('../resources/Nivel/Nivel1.jpg')";
			this.moedasInimigo = 10;
			if(localStorage._difficulty == 1){

				this.inimigosMax = this.enemiesNivel[0][0];
				console.log(this.inimigosMax)
			}
			else if(localStorage._difficulty == 2){
				this.inimigosMax = this.enemiesNivel[1][0];
			}
			else if(localStorage._difficulty == 3){
				this.inimigosMax = this.enemiesNivel[2][0];
			}
		}
		else if(localStorage._currentLevel == 2){
			this.canvas.style.backgroundImage = "url('../resources/Nivel/Nivel2.jpg')";
			this.moedasInimigo = 20;
			if(localStorage._difficulty == 1){
				this.inimigosMax = this.enemiesNivel[0][1];
			}
			else if(localStorage._difficulty == 2){
				this.inimigosMax = this.enemiesNivel[1][1];
			}
			else if(localStorage._difficulty == 3){
				this.inimigosMax = this.enemiesNivel[2][1];
			}
		}
		else if(localStorage._currentLevel == 3){
			this.canvas.style.backgroundImage = "url('../resources/Nivel/Nivel3.png')";
			this.moedasInimigo = 20;
			if(localStorage._difficulty == 1){
				this.inimigosMax = this.enemiesNivel[0][2];
			}
			else if(localStorage._difficulty == 2){
				this.inimigosMax = this.enemiesNivel[1][2];
			}
			else if(localStorage._difficulty == 3){
				this.inimigosMax = this.enemiesNivel[2][2];
			}
		}
		else if(localStorage._currentLevel == 4){
			this.canvas.style.backgroundImage = "url('../resources/Nivel/Nivel4.png')";
			this.moedasInimigo = 30;
			if(localStorage._difficulty == 1){
				this.inimigosMax = this.enemiesNivel[0][3];
			}
			else if(localStorage._difficulty == 2){
				this.inimigosMax = this.enemiesNivel[1][3];
			}
			else if(localStorage._difficulty == 3){
				this.inimigosMax = this.enemiesNivel[2][3];
			}

		}
		else if(localStorage._currentLevel == 5){
			this.canvas.style.backgroundImage = "url('../resources/Nivel/Nivel5.png')";
			this.moedasInimigo = 30;
			if(localStorage._difficulty == 1){
				this.inimigosMax = this.enemiesNivel[0][4];
			}
			else if(localStorage._difficulty == 2){
				this.inimigosMax = this.enemiesNivel[1][4];
			}
			else if(localStorage._difficulty == 3){
				this.inimigosMax = this.enemiesNivel[2][4];
			}
		}

		this.cellWidth = 35;
		this.numCol = this.canvas.width/this.cellWidth;
		this.numLinh = this.canvas.height/this.cellWidth;
		this.tileDivs = this.createTilesDivs();
		this.handleDomCallbacks(this.tileDivs);
		this.loadGrelhaDasCelulas();
	}

	handleCanvasMouseOver(){
		if(towerGame.torresAtivas.length < 1) return;
		towerGame.torresAtivas[towerGame.torresAtivas.length-1].visible = true;
	}

	handleCanvasMouseMoved(event){
		this.mouseX = event.offsetX;
		this.mouseY = event.offsetY;

		if(towerGame.torresAtivas.length < 1) return;
		if (!towerGame.torresAtivas[towerGame.torresAtivas.length-1].placed && towerGame.placingTower == true) {
				towerGame.torresAtivas[towerGame.torresAtivas.length-1].location.x = this.mouseX;
				towerGame.torresAtivas[towerGame.torresAtivas.length-1].location.y = this.mouseY;
		}
	}

	handleCanvasMouseClicked(){
		if(towerGame.canAddTower()){
			towerGame.putTower();
		}
	}

	run(){
		var canvas = document.getElementById("canvasDiv");
		if(paused){
			return;
		}
		if(towerGame.vidas <= 0){
			gameState = "loss";
		}
		if(gameState == "play"){
			this.render()
			document.getElementById("lives").innerHTML = towerGame.vidas;
			document.getElementById("enemyText").innerHTML = towerGame.inimigos + "/" +  towerGame.enemiesNivel[parseInt(localStorage._difficulty)-1][parseInt(localStorage._currentLevel)-1] ;
		}
		else if(gameState == "standby"){
			clearInterval(goldInterval);
			clearInterval(enemyGen);
			document.getElementById("startGame").addEventListener("click",startingLevel);
		}
		else if(gameState == "win"){
			wonGame();
			paused=!paused;
		}
		else if (gameState == "loss") {
			clearInterval(goldInterval);
			clearInterval(enemyGen);
			lostGame();
			paused = !paused;
		}
		for (let i = 0; i < this.torresAtivas.length; i++){
			this.torresAtivas[i].run();
		}

		for (let i = 0; i < this.balasAtivas.length; i++){
			this.balasAtivas[i].run();
		}

		for(let l = 0; l < this.numLinh; l++){
			for(let c = 0; c < this.numCol; c++){
				this.grelhaDasCelulas[l][c].render()
			}
		}

		for (let i = 0; i < this.inimigosAtivos.length; i++){
			this.inimigosAtivos[i].run();
		}

	}

	render(){
		this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
	}

	loadGrelhaDasCelulas(){

		var count = 1;
		for(var linhas = 0; linhas < this.numLinh; linhas++){
			this.grelhaDasCelulas.push([]);
			for(let colunas = 0; colunas < this.numCol; colunas++){
				this.grelhaDasCelulas[linhas].push(new Cell(this, count++,linhas, colunas));
			}
		}

		if(localStorage._currentLevel == 1){
			for(let l = 0; l < 6; l++){
				for(let c = 0; c < 17; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}

			for(let l = 6; l < 7; l++){
				for(let c = 0; c < 13; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}

			for(let l = 7; l < this.numLinh; l++){
				for(let c = 0; c < 11; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}

			for(let l = 0; l < 9; l++){
				for(let c = 20; c < 23; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}

			for(let l = 9; l < this.numLinh; l++){
				for(let c = 14; c < 23; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
		}
		else if(localStorage._currentLevel == 2){
			for(let l = 0; l < 2; l++){
				for(let c = 0; c < 14; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 2; l < 3; l++){
				for(let c = 0; c < 10; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}

			for(let l = 3; l < 10; l++){
				for(let c = 0; c < 8; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 10; l < 12; l++){
				for(let c = 0; c < 16; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 12; l < 13; l++){
				for(let c = 0; c < 12; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 13; l < this.numLinh; l++){
				for(let c = 0; c < 10; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}

			for(let l = 0; l < 5; l++){
				for(let c = 17; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 5; l < 7; l++){
				for(let c = 11; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}

			for(let l = 7; l < 8; l++){
				for(let c = 17; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 8; l < 15; l++){
				for(let c = 19; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}

			for(let l = 15; l < this.numLinh; l++){
				for(let c = 13; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
		}
		else if(localStorage._currentLevel == 3){
			for(let l = 0; l < 5; l++){
				for(let c = 0; c < 9; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}

			for(let l = 5; l < 12; l++){
				for(let c = 0; c < 11; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 12; l < this.numLinh; l++){
				for(let c = 0; c < 9; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 0; l < 3; l++){
				for(let c = 12; c < 14; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}

			for(let l = 14; l < this.numLinh; l++){
				for(let c = 12; c < 14; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}

			for(let l = 0; l < 5; l++){
				for(let c = 17; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 5; l < 12; l++){
				for(let c = 15; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 12; l < this.numLinh; l++){
				for(let c = 17; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
		}
		else if(localStorage._currentLevel == 4){
			for(let l = 0; l < 1; l++){
				for(let c = 0; c < 9; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 1; l < 2; l++){
				for(let c = 0; c < 8; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 2; l < 6; l++){
				for(let c = 0; c < 7; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 6; l < 7; l++){
				for(let c = 0; c < 7; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 7; l < 8; l++){
				for(let c = 0; c < 6; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 8; l < 15; l++){
				for(let c = 0; c < 6; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 15; l < 16; l++){
				for(let c = 0; c < 7; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 16; l < this.numLinh; l++){
				for(let c = 0; c < 9; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 3; l < 6; l++){
				for(let c = 10; c < 13; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}

			for(let l = 9; l < 14; l++){
				for(let c = 8; c < 15; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 0; l < 1; l++){
				for(let c = 14; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 1; l < 2; l++){
				for(let c = 15; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 2; l < 6; l++){
				for(let c = 16; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 6; l < 7; l++){
				for(let c = 16; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 7; l < 8; l++){
				for(let c = 17; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 8; l < 15; l++){
				for(let c = 17; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 15; l < 16; l++){
				for(let c = 16; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 16; l < this.numLinh; l++){
				for(let c = 14; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 15; l < this.numLinh; l++){
				for(let c = 10; c < 12; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 6; l < 7; l++){
				for(let c = 7; c < 8; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 6; l < 7; l++){
				for(let c = 15; c < 16; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
		}
		else if(localStorage._currentLevel == 5){
			for(let l = 0; l < 3; l++){
				for(let c = 0; c < 9; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 3; l < 8; l++){
				for(let c = 0; c < 3; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 8; l < 14; l++){
				for(let c = 0; c < 2; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 14; l < 15; l++){
				for(let c = 0; c < 3; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 15; l < 16; l++){
				for(let c = 0; c < 5; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 16; l < 17; l++){
				for(let c = 0; c < 6; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 17; l < this.numLinh; l++){
				for(let c = 0; c < 11; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 0; l < 3; l++){
				for(let c = 12; c < 14; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 0; l < 3; l++){
				for(let c = 17; c < 19; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 3; l < 4; l++){
				for(let c = 18; c < 19; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 0; l < 6; l++){
				for(let c = 21; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 6; l < 7; l++){
				for(let c = 6; c < 9; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 6; l < 7; l++){
				for(let c = 12; c < 14; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 6; l < 7; l++){
				for(let c = 17; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 10; l < 11; l++){
				for(let c = 5; c < 14; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			/*for(let l = 11; l < 12; l++){
				for(let c = 4; c < 14; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}*/
			for(let l = 10; l < 11; l++){
				for(let c = 17; c < 19; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 13; l < 15; l++){
				for(let c = 8; c < 14; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 7; l < 8; l++){
				for(let c = 20; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}

			for(let l = 8; l < 15; l++){
				for(let c = 21; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 15; l < 16; l++){
				for(let c = 20; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 16; l < this.numLinh; l++){
				for(let c = 15; c < this.numCol; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
		}
	}

	hideImgElement(){this.style.display - "none";}

	createTilesDivs(){

		var tiles = [];
		for (var i = 0; i<4; i++){

			if(localStorage._currentLevel == 1){
				var menuTilesDiv = document.createElement("div");
				var canvasTowerImage = "../resources/Towers/tower"+ (i+1) +".png";
				var canvasShotImage = "../resources/Balas/projTower" + (i+1) + ".png";

				menuTilesDiv.canvasTowerImg = new Image();
				menuTilesDiv.canvasTowerImg.addEventListener('load', this.hideImgElement, false);
				menuTilesDiv.canvasTowerImg.addEventListener('error', function() { console.log(canvasTowerImage + "Failed to Load"); }, false);
				menuTilesDiv.canvasTowerImg.src = canvasTowerImage;

				menuTilesDiv.canvasShotImg = new Image();
				menuTilesDiv.canvasShotImg.addEventListener('load', this.hideImgElement, false);
				menuTilesDiv.canvasShotImg.addEventListener('error', function() { console.log(canvasShotImage + "Failed to Load"); }, false);
				menuTilesDiv.canvasShotImg.src = canvasShotImage;

				document.getElementById("menuDiv").appendChild(menuTilesDiv);

				menuTilesDiv.cost = 20*i + 50;
				var imgInimigos = "../resources/Info/moedas.png";
				menuTilesDiv.textContent = "Cost: " + menuTilesDiv.cost;
				//menuTilesDiv.textContent.style.left = 50;
				menuTilesDiv.range = 50+(20*(i+1));
				menuTilesDiv.Id = i;
				menuTilesDiv.id = 'TowerImgDiv' + i;
				tiles.push(menuTilesDiv);
				var tileImagePath = "../resources/Towers/tower"+ (i+1) +".png";
				var tileImg = new Image();
				tileImg.addEventListener('error', function(){console.log(tileImagePath + "Failed to load");}, false);
				tileImg.src = tileImagePath;
				menuTilesDiv.appendChild(tileImg);
			}
			else if(localStorage._currentLevel == 2 || localStorage._currentLevel == 3){
				var menuTilesDiv = document.createElement("div");
				var canvasTowerImage = "../resources/Towers/tower"+ (i+1) +"up1.png";
				var canvasShotImage = "../resources/Balas/projTower" + (i+1) + "up1.png";

				menuTilesDiv.canvasTowerImg = new Image();
				menuTilesDiv.canvasTowerImg.addEventListener('load', this.hideImgElement, false);
				menuTilesDiv.canvasTowerImg.addEventListener('error', function() { console.log(canvasTowerImage + "Failed to Load"); }, false);
				menuTilesDiv.canvasTowerImg.src = canvasTowerImage;

				menuTilesDiv.canvasShotImg = new Image();
				menuTilesDiv.canvasShotImg.addEventListener('load', this.hideImgElement, false);
				menuTilesDiv.canvasShotImg.addEventListener('error', function() { console.log(canvasShotImage + "Failed to Load"); }, false);
				menuTilesDiv.canvasShotImg.src = canvasShotImage;

				document.getElementById("menuDiv").appendChild(menuTilesDiv);

				menuTilesDiv.cost = 30*i + 50;
				menuTilesDiv.textContent = "Cost: " + menuTilesDiv.cost;
				menuTilesDiv.range = 50+(20*(i+1));
				menuTilesDiv.Id = i;
				menuTilesDiv.id = 'TowerImgDiv' + i;
				tiles.push(menuTilesDiv);
				var tileImagePath = "../resources/Towers/tower"+ (i+1) +"up1.png";
				var tileImg = new Image();
				tileImg.addEventListener('error', function(){console.log(tileImagePath + "Failed to load");}, false);
				tileImg.src = tileImagePath;
				menuTilesDiv.appendChild(tileImg);
			}
			else if(localStorage._currentLevel == 4 || localStorage._currentLevel == 5){
				var menuTilesDiv = document.createElement("div");
				var canvasTowerImage = "../resources/Towers/tower"+ (i+1) +"up2.png";
				var canvasShotImage = "../resources/Balas/projTower" + (i+1) + "up2.png";

				menuTilesDiv.canvasTowerImg = new Image();
				menuTilesDiv.canvasTowerImg.addEventListener('load', this.hideImgElement, false);
				menuTilesDiv.canvasTowerImg.addEventListener('error', function() { console.log(canvasTowerImage + "Failed to Load"); }, false);
				menuTilesDiv.canvasTowerImg.src = canvasTowerImage;

				menuTilesDiv.canvasShotImg = new Image();
				menuTilesDiv.canvasShotImg.addEventListener('load', this.hideImgElement, false);
				menuTilesDiv.canvasShotImg.addEventListener('error', function() { console.log(canvasShotImage + "Failed to Load"); }, false);
				menuTilesDiv.canvasShotImg.src = canvasShotImage;

				document.getElementById("menuDiv").appendChild(menuTilesDiv);

				menuTilesDiv.cost = 40*i + 50;
				menuTilesDiv.textContent = "Cost: " + menuTilesDiv.cost;
				menuTilesDiv.range = 50+(20*(i+1));
				menuTilesDiv.Id = i;
				menuTilesDiv.id = 'TowerImgDiv' + i;
				tiles.push(menuTilesDiv);
				var tileImagePath = "../resources/Towers/tower"+ (i+1) +"up2.png";
				var tileImg = new Image();
				tileImg.addEventListener('error', function(){console.log(tileImagePath + "Failed to load");}, false);
				tileImg.src = tileImagePath;
				menuTilesDiv.appendChild(tileImg);
			}
		}

		return tiles;
	}

	canAddTower(){
		if(towerGame.placingTower){
			return true;
		}
		return(false);
	}

	putTower(){
		if(towerGame.grelhaDasCelulas[Math.floor(this.canvas.mouseY/towerGame.cellWidth)][Math.floor(this.canvas.mouseX/towerGame.cellWidth)].occupied == true){
			towerGame.torresAtivas[towerGame.torresAtivas.length-1].placed = true;
			towerGame.placingTower = false;
			towerGame.moedas -= towerGame.torresAtivas[towerGame.torresAtivas.length-1].cost;
		}
	}

	handleDomCallbacks(tiles){

		for (var i =0; i< tiles.length; i++) {
			var menuTilesDiv = tiles[i];
			menuTilesDiv.addEventListener('mouseover', this.tileRollOver, false);
			menuTilesDiv.addEventListener('mouseout', this.tileRollOut, false);
			menuTilesDiv.addEventListener('mousedown', this.tilePressed, false);
			menuTilesDiv.addEventListener('click', this.tileClicked, false);
		}
	}

	tileClicked(){
		if(towerGame.placingTower == true) return;
		if(towerGame.moedas >= this.cost){
			towerGame.createTower(this);
			towerGame.placingTower = true;
		}
	}

	tileRollOver(){
		this.style.backgroundColor = 'yellow';
	}

	tileRollOut(){
		this.style.backgroundColor = '#DDD';
	}

	tilePressed(){
		this.style.backgroundColor = 'green';
	}

	createTower(menuTilesDiv){
		var tower = new Tower(menuTilesDiv.cost, menuTilesDiv.canvasTowerImg, menuTilesDiv.canvasShotImg, menuTilesDiv.range, menuTilesDiv.Id);
		if(tower){
			this.torresAtivas.push(tower);
		}
		else{
			console.log("Failed create Tower")
		}
	}

}
