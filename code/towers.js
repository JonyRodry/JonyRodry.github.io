'use strict'

class Tower{

	constructor(cost, ImgTower, ImgShot, range, id){

		this.cost = cost;
		this.towerImage = ImgTower;
		this.shotImage = ImgShot;
		this.range = range;
		this.Id = id;
		this.location = new JSVetor(0,0);
		this.towerAngle = 0;
		this.visible = false;
		this.lastTime = Date.now();
		this.coolDown = 1000;
		this.inimigoProx = towerGame.inimigosAtivos[0];
		this.distance = Math.sqrt((Math.abs(this.location.x - this.inimigoProx.location.x))*(Math.abs(this.location.x - this.inimigoProx.location.x)) + (Math.abs(this.location.y - this.inimigoProx.location.y))*(Math.abs(this.location.y - this.inimigoProx.location.y)));

		if(this.Id == 0){
			if(localStorage._currentLevel == 1){
				this.damage = Math.round((Math.random()*5)+1);
			}
			if(localStorage._currentLevel == 2 || localStorage._currentLevel == 3){
				this.damage = Math.round((Math.random()*7)+1);
			}
			if(localStorage._currentLevel == 4 || localStorage._currentLevel == 5){
				this.damage = Math.round((Math.random()*20)+12);
			}
		}
		if(this.Id == 1){
			if(localStorage._currentLevel == 1){
				this.damage = Math.round((Math.random()*10)+5);
			}
			if(localStorage._currentLevel == 2 || localStorage._currentLevel == 3){
				this.damage = Math.round((Math.random()*15)+7);
			}
			if(localStorage._currentLevel == 4 || localStorage._currentLevel == 5){
				this.damage = Math.round((Math.random()*20)+12);
			}
		}
		if(this.Id == 2){
			if(localStorage._currentLevel == 1){
				this.damage = Math.round((Math.random()*15)+10);
			}
			if(localStorage._currentLevel == 2 || localStorage._currentLevel == 3){
				this.damage = Math.round((Math.random()*22)+15);
			}
			if(localStorage._currentLevel == 4 || localStorage._currentLevel == 5){
				this.damage = Math.round((Math.random()*32)+20);
			}
		}
		if(this.Id == 3){
			if(localStorage._currentLevel == 1){
				this.damage = Math.round((Math.random()*20)+15);
			}
			if(localStorage._currentLevel == 2 || localStorage._currentLevel == 3){
				this.damage = Math.round((Math.random()*30)+22);
			}
			if(localStorage._currentLevel == 4 || localStorage._currentLevel == 5){
				this.damage = Math.round((Math.random()*40)+32);
			}
		}
	}

	run(){
		this.render();
		this.update();
		this.checkFire();
	}

	update(){
		if(this.distance > this.range){
			if(this.placed == true){
				for(let i = 0; i < towerGame.inimigosAtivos.length; i++){
					var dx = this.location.x - towerGame.inimigosAtivos[i].location.x;
					var dy = this.location.y - towerGame.inimigosAtivos[i].location.y;

					var distancia = Math.sqrt(dx*dx + dy*dy);

					if(distancia < this.distance){
						this.inimigoProx = towerGame.inimigosAtivos[i];
						this.distance = distancia;
					}
				}
			}
		}

		if(towerGame.inimigosAtivos.length > 0){
				var ix = this.location.x - this.inimigoProx.location.x;
				var iy = this.location.y - this.inimigoProx.location.y;
				this.towerAngle = Math.atan2(iy, ix) - Math.PI;
		}


	}

	render(){

		var ctx = towerGame.context;
		ctx.save();
		ctx.translate(this.location.x, this.location.y);
		ctx.rotate(this.towerAngle);
		if (this.visible){
			ctx.drawImage(this.towerImage, -this.towerImage.width/2, -this.towerImage.height/2);
		}
		ctx.restore();
		ctx.beginPath();
		ctx.arc(this.location.x, this.location.y, this.range, 0, Math.PI*2);
		ctx.strokeStyle = "red";
		ctx.stroke();
	}

	checkFire(){

		let milli = Date.now()
		var verifica = 0;

		if (this.distance < this.range && this.placed && (milli - this.lastTime > this.coolDown)){
				this.lastTime = milli;
				var shotLoc = new JSVetor(this.location.x, this.location.y);
				var newShot = new Shots(shotLoc, this.towerAngle, this.shotImage, this.damage, this.inimigoProx, this, this.distance);
				towerGame.balasAtivas.push(newShot);
				newShot.visible = true;

		}
	}
}
