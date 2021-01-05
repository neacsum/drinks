
function RockerSwitch(element){
	RockerSwitch.inherits(BinaryInput);
	BinaryInput.call(this, element);

	var pen = this.pen;
	if(this.width==null)
		this.width = 150;
	if(this.height==null)
		this.height = 200;
	
	var grd, grd2, grd3, grd4, grd5, grd6, main_grd;
	this.wx = this.width/150;
	this.hx = this.height/200;
	var createGradients = function(){
		grd = pen.createLinearGradient(0, this.height/8, 0, 175*this.hx);
		grd.addColorStop(0, '#999');
		grd.addColorStop(1, '#666');
		grd2 = pen.createLinearGradient(0, -3*this.height/8, 0, 75*this.hx);
		grd2.addColorStop(0, '#666');
		grd2.addColorStop(1, '#999');
		grd3 = pen.createLinearGradient(0, -30*this.hx, 0, 0);
		grd3.addColorStop(0, '#bbb');
		grd3.addColorStop(1, '#888');
		grd4 = pen.createLinearGradient(0, -10*this.hx, 0, 20*this.hx);
		grd4.addColorStop(0, '#888');
		grd4.addColorStop(1, '#bbb');
		grd5 = pen.createLinearGradient(0, 0, 0, 80*this.hx);
		grd5.addColorStop(0, '#555');
		grd5.addColorStop(1, '#444');
		grd6 = pen.createLinearGradient(0, -2*this.height/5, 0, 0);
		grd6.addColorStop(0, '#555');
		grd6.addColorStop(1, '#999');
		main_grd = pen.createLinearGradient(-this.width/6, -this.height/2, -this.width/6, this.height/2);
		main_grd.addColorStop(0, '#bbb');
		main_grd.addColorStop(0.5, '#eee');
		main_grd.addColorStop(1, '#bbb');
	}.bind(this);
	createGradients();
	var color1;
	var color2;

	var updateColor = function(){
		if(this.value==0){
			color1=grd3;
			color2=grd2;
		}
		else{
			color1=grd4;
			color2=grd4;
		}	
	}.bind(this);
	updateColor();

	var clickHandler = function(event){
		var obj = getRelativeCoordinates(event, this.canvas);
		if(this.value==0 && isOverOn(obj)){
			this.on();
		}else if(this.value==1 && isOverOff(obj)){
			this.off();
		}
		updateColor();
	}.bind(this);

	var isOverOff = function(obj){
		if(obj.x>=this.width/3 && obj.x<=(2*this.width)/3 && obj.y>=this.height/8 && obj.y<=this.height/2)
			return true;
		else
			return false;
	}.bind(this);

	var isOverOn = function(obj){
		if(obj.x>=this.width/3 && obj.x<=(2*this.width)/3 && obj.y>=this.height/2 && obj.y<=175*this.hx)
			return true;
		else
			return false;
	}.bind(this);

	var isOver = function(obj){
		if(obj.x>=this.width/3 && obj.x<=(2*this.width)/3 && obj.y>=this.height/8 && obj.y<=175*this.hx)
			return true;
		else
			return false;
	}.bind(this);

	var mouseHandler = function(event){
		var obj = getRelativeCoordinates(event, this.canvas);
		if(isOver(obj))
			this.canvas.style.cursor = 'pointer';
		else
			this.canvas.style.cursor = 'auto';
	}.bind(this);

	if(this.canvas){
		var mousedown = function(event){if(event.button==0)clickHandler(event);};
		var mousemove = function(event){mouseHandler(event);};
		this.addEvents = function(){
			attach(this.canvas, "mousedown", mousedown);
			attach(this.canvas, "mousemove", mousemove);	
		}
		this.addEvents();
		this.removeEvents = function(){
			detach(this.canvas, "mousedown", mousedown);
			detach(this.canvas, "mousemove", mousemove);	
		}
	}

	this.drawBackground = function(){
		pen.beginPath();
		pen.moveTo(-this.width/6, -85*this.hx);
		pen.lineTo(this.width/6, -85*this.hx);
		pen.quadraticCurveTo(35*this.wx, -2*this.height/5, 35*this.wx, -3*this.height/8);
		pen.lineTo(35*this.wx, 75*this.hx);
		pen.quadraticCurveTo(35*this.wx, 85*this.hx, this.width/6, 85*this.hx);
		pen.lineTo(-this.width/6, 85*this.hx);
		pen.quadraticCurveTo(-35*this.wx, 80*this.hx, -35*this.wx,  75*this.hx);
		pen.lineTo(-35*this.wx, -3*this.height/8);
		pen.quadraticCurveTo(-35*this.wx, -2*this.height/5, -this.width/6, -85*this.hx);
		pen.closePath();
		pen.stroke();
		pen.fill();
	}

	this.drawButton = function(){
		pen.beginPath();
		pen.moveTo(5*this.wx, -3*this.height/8);
		pen.lineTo(15*this.wx, -3*this.height/8);
		pen.quadraticCurveTo(this.width/6, -3*this.height/8, this.width/6, -65*this.hx);
		pen.lineTo(this.width/6, 65*this.hx);
		pen.quadraticCurveTo(this.width/6, 75*this.hx, 15*this.wx, 75*this.hx);
		pen.lineTo(-15*this.wx, 75*this.hx);
		pen.quadraticCurveTo(-this.width/6,  75*this.hx, -this.width/6, 65*this.hx);
		pen.lineTo(-this.width/6, -65*this.hx);
		pen.quadraticCurveTo(-this.width/6, -3*this.height/8, -15*this.wx, -3*this.height/8);
		pen.closePath();
		pen.stroke();
		pen.fill();
	}

	this.drawUpShadow = function(){
		pen.beginPath();
		pen.moveTo(this.width/6, 0);
		pen.lineTo(27*this.wx, -70*this.hx);
		pen.quadraticCurveTo(27*this.wx, -2*this.height/5, 20*this.wx, -2*this.height/5);
		pen.lineTo(-18*this.wx, -2*this.height/5);
		pen.quadraticCurveTo(-27*this.wx, -3*this.height/8, -this.width/6, -65*this.hx);
		pen.quadraticCurveTo(-this.width/6, -3*this.height/8, -15*this.wx, -3*this.height/8);
		pen.lineTo(15*this.wx, -3*this.height/8);
		pen.quadraticCurveTo(this.width/6, -3*this.height/8, this.width/6, -65*this.hx);
		pen.lineTo(this.width/6, 0);
		pen.closePath();
		pen.fill();
	}
	
	this.drawDownShadow = function(){
		pen.beginPath();
		pen.moveTo(this.width/6, 0);
		pen.lineTo(27*this.wx, 65*this.hx);
		pen.quadraticCurveTo(27*this.wx, 75*this.hx, 20*this.wx, 80*this.hx);
		pen.lineTo(-20*this.wx, 80*this.hx);
		pen.quadraticCurveTo(-this.width/6, 75*this.hx, -this.width/6, 65*this.hx);
		pen.quadraticCurveTo(-this.width/6, 75*this.hx, -15*this.wx, 75*this.hx);
		pen.lineTo(15*this.wx, 75*this.hx);
		pen.quadraticCurveTo(this.width/6, 75*this.hx, this.width/6, 65*this.hx);
		pen.lineTo(this.width/6, 0);
		pen.closePath();
		pen.fill();
	}
	
	this.drawOnOffSimbols = function(){
		pen.beginPath();
		pen.arc(0, -50*this.hx, this.width/15,  (Math.PI/180)*0, (Math.PI/180)*360);
		pen.closePath();
		pen.stroke();
		pen.strokeStyle=grd2;
		pen.beginPath();
		pen.moveTo(0, 30*this.hx);
		pen.lineTo(0, 50*this.hx);
		pen.stroke();
		pen.closePath();
	}

	this.__defineSetter__("width", function(width){
		this._width = width;
		this.canvas.width=width;
		this.container.style.width = width+'px';
		this.wx= width/150;
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
		this.hx= height/200;
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

	this.render = function(){
		this.canvas.width = this.canvas.width;
		this.instrumentCommonOperations();
		pen.save();
		updateColor();
		pen.translate(this.width/2, this.height/2);
		pen.fillStyle=main_grd;		
		pen.strokeStyle=main_grd;
		pen.shadowOffsetX = 0;
		pen.shadowOffsetY = 1.5*this.wx;
		pen.shadowColor = '#999';
		pen.shadowBlur = 3*this.wx;
		this.drawBackground();
		pen.restore();
		pen.translate(this.width/2, this.height/2);
		if(!this.value){
			pen.strokeStyle=grd;
		}
		else{
			pen.strokeStyle=grd2;
		}
		pen.lineWidth=3;
		pen.fillStyle=color1;
		this.drawButton();
		pen.save();
		if(this.value){
			pen.fillStyle=grd6;
			pen.lineWidth=3;
			this.drawUpShadow();
		}
		if(!this.value){
			pen.fillStyle=grd5;
			pen.lineWidth=3;
			this.drawDownShadow();
		}
		pen.restore();
		pen.save();
		pen.lineWidth=3*this.wx;
		pen.shadowOffsetX = 0;
		pen.shadowOffsetY = 0;
		pen.shadowColor = "#222";
		pen.shadowBlur = 3*this.wx;
		pen.strokeStyle=grd;
		this.drawOnOffSimbols();
		pen.restore();
	}
}
