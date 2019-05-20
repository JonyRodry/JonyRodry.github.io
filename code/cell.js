'use strict'

class Cell{

	constructor(game, id, l, c){

		this.game = game;
		this.ctx = game.context;
		this.w = game.cellWidth;
		this.location = new JSVetor(c*this.w,l*this.w);
		this.center = new JSVetor(this.location.x + this.w/2, this.location.y +this.w/2);
		this.id = id;
		this.c = c;
		this.l = l;
		this.occupied = false;
		//this.value = -1;
		//this.vizinhos = [];
		//this.indexMaior = 0;
		//this.maiorVizinho = null;
	}

	run(){
		this.render();
	}

	render(){
		if(this.occupied == true){
			//this.ctx.fillStyle = "black";
			this.ctx.strokeStyle = "white";
			//this.ctx.fillRect(this.location.x, this.location.y, this.w, this.w);
			//this.ctx.strokeRect(this.location.x, this.location.y, this.w, this.w);
			
		}
		this.ctx.font = "11px Arial";
		this.ctx.fillStyle = "white";
		//this.ctx.fillText(this.id,this.location.x+5, this.location.y+15);
	}


}