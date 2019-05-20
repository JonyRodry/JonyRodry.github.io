'use strict'

class Enemies{

	constructor(game, location, vida, imgInimigos, speedInimigos){

		if(localStorage._difficulty == 1){
			this.speed = speedInimigos[0];
		}
		else if(localStorage._difficulty == 2){
			this.speed = speedInimigos[1];	
		}
		else if(localStorage._difficulty == 3){
			this.speed = speedInimigos[2];
		}

		this.location = location;
		this.vel = new JSVetor(0, this.speed);
		this.acc = new JSVetor(0, 0);
		this.vida = vida;
		this.vidaMax = vida;
		this.game = game;
		this.img = imgInimigos;
		this.elimina = false;

		var i = Math.round(Math.random()*3);
		this.vida = vida[i];
		this.vidaMax = vida[i];
		this.enemy = this.img[i];
		this.w = this.enemy.width;
		this.h = this.enemy.height;
		this.decide = Math.round(Math.random());

		/*var canvasAux = document.createElement('canvas');
		canvasAux.width = this.w;
		canvasAux.height = this.h;
		var context = canvasAux.getContext('2d');
		context.drawImage(this.enemy, 0, 0, this.w, this.h);
		this.bitmap = context.getImageData(0, 0, this.w, this.h).data;*/


	}

	run(){
		this.update();
		this.render();
		this.superRender();
	}

	update(){
		this.checkLimit();
		this.location.add(this.vel);
		this.vel.add(this.acc);
	}

	render(){
		var ctx = towerGame.context;
		ctx.save();
		ctx.translate(this.location.x, this.location.y);
		ctx.rotate(this.towerAngle);
		ctx.drawImage(this.enemy, -this.enemy.width/2, -this.enemy.height/2);
		ctx.restore();
	}

	superRender(){
		var x = this.location.x;
		var y = this.location.y-this.enemy.height;
		var ctx = towerGame.context;

		ctx.save();
		ctx.fillStyle = 'red';
		var width = 30*this.vida/this.vidaMax;
		if(width < 0){
			width = 0;
		}
		ctx.fillRect(x-15,y,width,5);
		ctx.strokeStyle = 'black';
		ctx.strokeRect(x-15,y,30,5);
		ctx.restore();
	}

	checkLimit(){

		var l = Math.floor(this.location.y/this.game.cellWidth);
		var c = Math.floor(this.location.x/this.game.cellWidth);

		if(l>= Math.floor(towerGame.numLinh - 1)){
			this.vel.x = 0;
			this.vel.y = this.speed;
		}
		else if(towerGame.grelhaDasCelulas[l+1][c].occupied){
			if(towerGame.grelhaDasCelulas[l][c-2].occupied == true){
				this.vel.x = this.speed;
				this.vel.y = 0;
			}
			else if(towerGame.grelhaDasCelulas[l][c+2].occupied == true){
				this.vel.x = -this.speed;
				this.vel.y = 0;
			}
			else if(localStorage._currentLevel == 3 || localStorage._currentLevel == 4 || localStorage._currentLevel == 5){
				if(towerGame.grelhaDasCelulas[l][c+2].occupied == false && towerGame.grelhaDasCelulas[l][c-2].occupied == false){
					if(l>towerGame.numLinh-3){
						this.vel.x = -this.speed;
						this.vel.y = 0;
					}
					else{
						if(this.decide == 1){
							if((this.location.y <= 176) && (this.location.y>=170) && (localStorage._currentLevel == 5)){
								this.vel.x = -this.speed;
								this.vel.y = 0;
							}
							else{
								this.vel.x = this.speed;
								this.vel.y = 0;
							}
						}
						else{
							this.vel.x = -this.speed;
							this.vel.y = 0;
						}
					}
				}
			}
		}
		
		else if(this.location.y - this.rad/2 < 0 || towerGame.grelhaDasCelulas[l][c-1].occupied == true ||towerGame.grelhaDasCelulas[l][c+1].occupied == true){
				this.vel.x = 0;
				this.vel.y = this.speed;
			
		}

		else if(l>1){
			if (towerGame.grelhaDasCelulas[l-2][c].occupied == true) {
				this.vel.x = 0;
				this.vel.y = this.speed;
			}
		}

		if(this.location.y > towerGame.canvas.height){
			var index = towerGame.inimigosAtivos.indexOf(this);
			if(index !== -1){
				towerGame.inimigosAtivos.splice(index, 1);
			}
			towerGame.inimigosPassados++;
			towerGame.vidas--;
			document.getElementById("lives").innerHTML = towerGame.vidas;
			console.log("Nº de Inimigos que passaram: " + towerGame.inimigosPassados);
		}
		
		if(this.elimina == true){
			var audio = document.getElementById("som3");
			audio.play();
			var index = towerGame.inimigosAtivos.indexOf(this);
			if(index !== -1){
				towerGame.inimigosAtivos.splice(index, 1);
			}
			towerGame.inimigosMortos++;
			towerGame.moedas = towerGame.moedas + towerGame.moedasInimigo;
			console.log("Nº de Inimigos Mortos: " + towerGame.inimigosMortos)
		}	
	}
}
