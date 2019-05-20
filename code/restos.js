	loadVizinhos(){
		
		var c = this.c;
		var l = this.l;

		var grelhaDasCelulas = this.game.grelhaDasCelulas;

		if (this.l > 0 && !this.occupied){
			if(!this.game.grelhaDasCelulas[l][c-1].occupied){
				this.vizinhos.push(this.game.grelhaDasCelulas[l][c-1]);
			}
		}

		if (this.c < grelhaDasCelulas[l].length-1 && !this.occupied){
			if(!this.game.grelhaDasCelulas[l][c+1].occupied){
				this.vizinhos.push(this.game.grelhaDasCelulas[l][c+1]);
			}
		}

		if (this.l < grelhaDasCelulas.length-1 && !this.occupied){
			if(!this.game.grelhaDasCelulas[l+1][c].occupied){
				this.vizinhos.push(this.game.grelhaDasCelulas[l+1][c]);
			}
		}

		if (this.l < 0 && !this.occupied){
			if(!this.game.grelhaDasCelulas[l][c-1].occupied){
				this.vizinhos.push(this.game.grelhaDasCelulas[l][c-1]);
			}
		}
	}

	getVizinhoProx(){

		var maior = 0;

		for(let i = 0; i < this.vizinhos.length; i++){
			if(this.vizinhos[i].id>maior){
				maior = this.vizinhos[i].id;
				this.indexMaior = i;
			}
		}

		this.maiorVizinho = this.vizinhos[this.indexMaior];
		console.log(this.maiorVizinho)
	}






		checkFire(){

		let milli = Date.now()

		var inimigoProx = 0;
		menor = 1000000;

		for(let i = 0; i < towerGame.inimigosAtivos.length; i++)
			let dx = this.location.x - towerGame.inimigosAtivos[i];
			let dy = this.location.y - towerGame.canvas.mouseY;

			let distance = Math.sqrt(dx*dx + dy*dy);

			if(distance < menor){
				inimigoProx = distance;
			}

		if (inimigoProx < this.range && this.placed && (milli - this.lastTime > this.coolDown)){
			this.lastTime = milli;
			var shotLoc = new JSVetor(this.location.x, this.location.y);
			var newShot = new Shots(shotLoc, this.towerAngle, this.shotImage);
			towerGame.balasAtivas.push(newShot);
			newShot.visible = true;
		}
	}



		/*for(var i = 0; c+i < towerGame.numCol; i++){
			if(towerGame.grelhaDasCelulas[l][c].occupied == false && towerGame.grelhaDasCelulas[l][c+i].occupied == true){
					maisEsq = towerGame.grelhaDasCelulas[l][c+i].id;
					console.log(maisEsq)
			}
			else if(towerGame.grelhaDasCelulas[l][c].occupied == false && towerGame.grelhaDasCelulas[l][c-i].occupied == true){
					maisDir = towerGame.grelhaDasCelulas[l][c-i].id;
					console.log(maisDir)
			}
		}

		var distEsq = maisEsq - towerGame.grelhaDasCelulas[l][c].id;
		var distDir = towerGame.grelhaDasCelulas[l][c].id - maisDir;

		console.log(distEsq, distDir)*/




			/*if(distDir < distEsq){*/
			if(towerGame.grelhaDasCelulas[l][c-2].occupied == true){
				this.vel.x = 1;
				this.vel.y = 0
			}
			/*else if(distDir > distEsq){*/
			else if(towerGame.grelhaDasCelulas[l][c+2].occupied == true){
				this.vel.x = -1;
				this.vel.y = 0
			}
			else if(distEsq == distDir){
				this.vel.x = this.vel.x;
				this.vel.y = this.vel.y;	
////////////////////////////////////////////////////
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
				for(let c = 0; c < 8; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 7; l < 8; l++){
				for(let c = 0; c < 7; c++){
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
				for(let c = 0; c < 8; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}
			for(let l = 2; l < 6; l++){
				for(let c = 10; c < 13; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}

			for(let l = 9; l < 14; l++){
				for(let c = 9; c < 14; c++){
					this.grelhaDasCelulas[l][c].occupied=true;
				}
			}