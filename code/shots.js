'use strict'

class Shots{

	constructor(location, angle, shotImage, damage, inimigo, torre, distance){

		this.location = location;
		this.shotImage = shotImage;
		this.angle = angle;
		this.speed = 3;
		this.damage = damage;
		this.inimigo = inimigo;
		this.w = this.shotImage.width;
		this.h = this.shotImage.height;
		this.torre = torre;
		this.distance = distance;

		/*var canvasAux = document.createElement('canvas');
		canvasAux.width = this.w;
		canvasAux.height =this.h;
		var context = canvasAux.getContext('2d');
		context.drawImage(this.shotImage, 0, 0, this.w, this.h);
		this.bitmap = context.getImageData(0, 0, this.w, this.h).data;*/
	}

	run(){
		this.update();
		this.render();
		this.eliminar();
	}

	render(){
		var ctx = towerGame.context;
		ctx.save();
		ctx.translate(this.location.x, this.location.y);
		ctx.rotate(this.towerAngle);
		ctx.drawImage(this.shotImage, -this.shotImage.width/2, -this.shotImage.height/2);
		ctx.restore();
	}

	update(){
		this.location.y += Math.sin(this.angle)*this.speed;
		this.location.x += Math.cos(this.angle)*this.speed;
	}

	boundingBox(component) {

		if (this.location.x < component.location.x + component.w && this.location.x + this.w > component.location.x && this.location.y < component.location.y + component.h && this.location.y + this.h > component.location.y){
			return true;
		} 
		else{
			return false;
		}
	}

	eliminar(){
		if (this.boundingBox(this.inimigo)) {
			/*var xMin = Math.max(this.location.x, this.inimigo.location.x);
			var yMin = Math.max(this.location.y, this.inimigo.location.y);
			var xMax = Math.min(this.location.x + this.width, this.inimigo.location.x + this.inimigo.width);
			var yMax = Math.min(this.location.y + this.height, this.inimigo.location.y + this.inimigo.height);
			for (var pixelPosX = xMin; pixelPosX < xMax; pixelPosX++) {
				for (var pixelPosY = yMin; pixelPosY < yMax; pixelPosY++) {
					var thisPixel = (pixelPosX - this.location.x + (pixelPosY - this.location.y) * this.width) * 4 + 3;
					var inimigoPixel = (pixelPosX - this.inimigo.x + (pixelPosY - this.inimigo.y) * this.inimigo.width) * 4 + 3;
					if (this.bitmap[thisPixel] != 0 && this.inimigo.bitmap[this.inimigoPixel] != 0) {*/
						this.inimigo.vida = this.inimigo.vida - this.damage;
						var index2 = towerGame.balasAtivas.indexOf(this);
						if(index2 !== -1){
							towerGame.balasAtivas.splice(index2, 1);
						}

						if(this.inimigo.vida <= 0){
							this.inimigo.elimina = true;
							this.torre.distance = 1000;
						}
						else if(this.inimigo.vida > 0){
							this.torre.distance = Math.sqrt((Math.abs(this.torre.location.x - this.inimigo.location.x))*(Math.abs(this.torre.location.x - this.inimigo.location.x)) + (Math.abs(this.torre.location.y - this.inimigo.location.y))*(Math.abs(this.torre.location.y - this.inimigo.location.y)));
						}
					//}
				//}
			//}
		}

	}
}