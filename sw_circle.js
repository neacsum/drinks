
function CircleSwitch(element){
	CircleSwitch.inherits(MoveInput);
	MoveInput.call(this, element);
	
	this.make_binary();
	var pen = this.pen;
	if(this.width==null)
		this.width = 100;
	if(this.height==null)
		this.height = 50;

	this.wx = this.width/100;
	this.hx = this.height/50;

	var grd, grd2, grd3, grd4;	
	var createGradients = function(){
		grd = pen.createLinearGradient(this.width/4, 0, this.width/4, this.height);
		grd.addColorStop(0, '#ddd');
		grd.addColorStop(1, '#666');
		grd2 = pen.createLinearGradient(this.width/2, 0, this.width/2, this.height);
		grd2.addColorStop(0, '#666');
		grd2.addColorStop(1, '#ddd');
		grd3 = pen.createLinearGradient(0, 0, this.width-10*this.wx, this.height+30*this.hx);
		grd3.addColorStop(0, '#333');
		grd3.addColorStop(1, '#fff');
		grd4 = pen.createLinearGradient(0, -5*this.hx, 0, 10*this.hx);
		grd4.addColorStop(0, '#666');
		grd4.addColorStop(1, '#ddd');
	}.bind(this);
	createGradients();

	var switchValue = function(){
		if(this.x_root<this.width/2){
			this.x_root=20*this.wx;
			this.off();
		}
		if(this.x_root>=this.width/2){
			this.x_root=this.width-20*this.wx;
			this.on();
		}
	}.bind(this);

	this.__defineSetter__("width", function(width){
		this._width = width;
		this.canvas.width=width;
		this.container.style.width = width+'px';
		this.wx = width/100;
		this.value = this.value;
		if(this.height && this.width)
			createGradients();
	
	});
	
	this.__defineGetter__("width", function(){
		return this._width;
	 });

	this.__defineSetter__("value", function(value){
		this._value = value;
		if(value==1)
			this.x_root=this.width-20*this.wx;
		else
			this.x_root=20*this.wx;
	});
	
	this.__defineGetter__("value", function(){
		return this._value;
	 });

	this.__defineSetter__("height", function(height){
		this._height = height;
		this.canvas.height=height;
		this.container.style.height = height+'px';
		this.hx = height/50;
		if(this.height && this.width)
			createGradients();
	});
	
	this.__defineGetter__("height", function(){
		return this._height;
	 });
	
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.value = element.getAttribute("value") || 0;
	this.up_func = switchValue;

	this.render = function(){
		this.canvas.width=this.canvas.width;
		this.instrumentCommonOperations();
		pen.save();
		pen.translate(this.width/2, this.height/2);
		pen.restore();
		pen.save();
		pen.strokeStyle=grd3;
		pen.fillStyle=grd2;
		pen.roundRect(5*this.wx, this.height/2-15*this.hx, this.width-10*this.wx, 30*this.hx, 10*this.wx);
		pen.stroke();
		pen.fill();
		pen.beginPath();
		if(this.x_root<20*this.wx)
			this.x_root=20*this.wx;
		if(this.x_root>this.width-20*this.wx)
			this.x_root=this.width-20*this.wx;
		pen.shadowOffsetX = 1*this.wx;
		pen.shadowOffsetY = 1*this.hx;
		pen.shadowColor = '#777';
		pen.shadowBlur = 3*this.wx;

		pen.arc(this.x_root, this.height/2, 18*this.wx, 0, Math.PI*2, false);
		pen.lineWidth=2*this.wx;
		pen.strokeStyle="silver";
		pen.stroke();
		pen.clip();
		process(this.canvas, angularGradient, pen, this.x_root);
		pen.restore();
	}
}

