
function ArcSwitch(element){
	
	ArcSwitch.inherits(BinaryInput);
	BinaryInput.call(this, element);

	var pen = this.pen;
	if(this.width==null)
		this.width = 70;
	if(this.height==null)
		this.height = 70;
	var color; 
	var shadow;
	var border;

	var grd, grd1;
	var createGradients = function(){
		grd = pen.createLinearGradient(0, -this.height/2, 0, this.height/2);
		grd.addColorStop(0, '#eee');
		grd.addColorStop(1, '#999');
		grd1 = pen.createLinearGradient(0, -this.height/2, 0, 3*this.height/4);
		grd1.addColorStop(0, '#eee');
		grd1.addColorStop(1, '#bbb');
	}.bind(this);
	createGradients();

	var updateColor = function(){
		if(this.value==0){
			color = grd1;
			shadow = 1;			
			border = "#bbb";			
		}
		else{
			color = grd;
			shadow = 0;
			border = "#444";			
		}	
	}.bind(this);
	updateColor();


	var clickHandler = function(event){
		this.toggle();
		updateColor();
	}.bind(this);

	if(this.canvas){
		var mousedown = function(event){if(event.button==0)clickHandler(event);};
		this.addEvents = function(){
			this.canvas.style.cursor="pointer";
			attach(this.canvas, "mousedown", mousedown);
		}
		this.addEvents();
		this.removeEvents = function(){
			this.canvas.style.cursor="auto";
			detach(this.canvas, "mousedown", mousedown);
		}

	}

	this.__defineSetter__("width", function(width){
		this._width = width;
		this.canvas.width=width;
		this.container.style.width = width+'px';
		if(this.height && this.width){
			createGradients();
			updateColor();
		}
	});
	
	this.__defineGetter__("width", function(){
		return this._width;
	 });

	this.__defineSetter__("height", function(height){
		this._height = height;
		this.canvas.height=height;
		this.container.style.height = height+'px';
		if(this.height && this.width){
			createGradients();
			updateColor();
		}
	});
	
	this.__defineGetter__("height", function(){
		return this._height;
	 });
	
	this.width = this.canvas.width;
	this.height = this.canvas.height;

	this.drawButton = function(){
		pen.beginPath();
		pen.moveTo(-3*this.width/8, -this.height/8);
		pen.quadraticCurveTo(0, -this.height/3, 3*this.width/8, -this.height/8);
		pen.quadraticCurveTo(this.width/2+10*this.width/200, 0, 3*this.width/8, this.height/8);
		pen.quadraticCurveTo(0, this.height/3, -3*this.width/8, this.height/8);
		pen.quadraticCurveTo(-this.width/2-10*this.width/200, 0, -3*this.width/8, -this.height/8);
		pen.closePath();
		pen.stroke();
		pen.fill();
	}

	this.render = function(){
		this.canvas.width = this.canvas.width;
		this.instrumentCommonOperations();
		pen.save();	
		updateColor();
		pen.fillStyle=color;
		pen.strokeStyle=border;
		pen.translate(this.width/2, this.height/2);
		pen.shadowOffsetX = shadow;
		pen.shadowOffsetY = shadow;
		pen.shadowColor = '#777';
		pen.shadowBlur = 5;
		this.drawButton();
		pen.restore();	
	}
}
