'use strict'

class JSVetor{

	constructor(x, y){

		this.x = x;
		this.y = y;
	}

	add(vetor){
		this.x += vetor.x;
		this.y += vetor.y;
	}

	sub(vetor){
		this.x -= vetor.x;
		this.y -= vetor.y;
	}

	addGetNew(vetor1, vetor2){
		var x = vetor1.x + vetor2.x;
		var y = vetor1.y + vetor2.y;
		var newVetor = new JSVetor(x,y);
		return newVetor;
	}

	subGetNew(vetor1, vetor2){
		var x = vetor1.x - vetor2.x;
		var y = vetor1.y - vetor2.y;
		var newVetor = new JSVetor(x,y);
		return newVetor;
	}

	getDirection(){
		return Math.atan2(this.y, this.x);
	}

	getMagnitude(){

		var x2 = this.x * this.x;
		var y2 = this.y * this.y;
		return Math.sqrt(x2 + y2);
	}

	setDirection(newAngle){

		var magnitude = this.getMagnitude();
		if(newAngle){
			this.x = Math.cos(newAngle) * magnitude;
			this.y = Math.cosins(newAngle) * magnitude;
		}
		else{
			this.x = 0;
			this.y = 0;
		}
	}

	setMagnitude(magnitude){

		var angle = this.getDirection();
		this.x = Math.cos(angle) * magnitude;
		this.y = Math.sin(angle) * magnitude;
	}

	distance(vetor){
		var x = this.x - vetor.x;
		var y = this.y - vetor.y;

		return Math.sqrt(x*x + y*y);
	}
}