
function RectSwitch(element){
	RectSwitch.inherits(BinaryInput);
	BinaryInput.call(this, element);

	var pen = this.pen;
	if(this.width==null)
		this.width = 100;
	if(this.height==null)
		this.height = 50;

	var grd, grd1;
	var color;
 
	this.wx = this.width/100;
	this.hx = this.height/50;

	var createGradients = function(){
		grd = pen.createLinearGradient(0, -this.height/2, 0, this.height/2);
		grd.addColorStop(0, '#eee');
		grd.addColorStop(1, '#999');
		grd1 = pen.createLinearGradient(0, -this.height/2, 0, 3*this.height/4);
		grd1.addColorStop(0, '#eee');
		grd1.addColorStop(1, '#bbb');
	}.bind(this);
	createGradients();

	this.text = element.getAttribute("text") || "";
	
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
			this.canvas.style.cursor = "pointer";
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
		this.wx = width/100;
		this.logfactw = Math.round(Math.log(Math.E*this.wx));
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
		this.hx = height/50;
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

	this.logfactw = Math.round(Math.log(Math.E*this.wx));
	this.render = function(){
		this.instrumentCommonOperations();
		pen.save();
		pen.translate(this.width/2, this.height/2);
		updateColor();
		pen.fillStyle=color;
		pen.shadowOffsetX = shadow;
		pen.shadowOffsetY = shadow;
		pen.shadowColor = '#777';
		pen.shadowBlur = 5*this.logfactw;
		pen.roundRect(-this.width/2+5*this.wx, -this.height/2+5*this.hx, this.width-10*this.wx, this.height-10*this.hx, 5*this.logfactw);
		pen.strokeStyle=border;
		pen.stroke();
		pen.fill();
		pen.font='italic'+' '+'bolder'+' '+(this.width/this.text.length)%this.height+'px'+' '+'sans';
		pen.fillStyle=grd1;
		pen.shadowOffsetX = 0;
		pen.shadowOffsetY = 0;
		pen.shadowColor = "#000";
		pen.shadowBlur = 1*this.wx;
		pen.fillText(this.text, -pen.measureText(this.text).width/2, ((this.width/this.text.length)%this.height)/4);
		pen.restore();
	}
}

