function LevelMeter(element){

	LevelMeter.inherits(ScaleOutput);
	ScaleOutput.call(this, element);
	
	//Object used for drawing
	var pen = this.pen;
	this.color = element.getAttribute("color") || "blue";
	this.align=element.getAttribute("align") || "vertical";
	this.topdown = element.getAttribute("topdown")=="true" || false;
	this.rounded = element.getAttribute("rounded")=="true" || false;
	this.divisions = element.getAttribute("divisions") || 25.00;
	var precision = this.precision;

	if(this.align=="vertical"){
		if(this.width==null)
			this.width = 100;
		if(this.height==null)
			this.height = 220;
	}
	else{
		if(this.width==null)
			this.width = 220;
		if(this.height==null)
			this.height = 100;
	}
	this.wv= this.width/100;
	this.hh= this.height/100;
	this.wh = this.width/220;
	this.hv = this.height/220;
	this.logfactv = Math.log(Math.E*this.wv);
	this.logfacth = Math.log(Math.E*this.hh);

	var createGradients = function(){
		if(this.align=="vertical"){
			this.grd = pen.createLinearGradient(-25*this.wv, 0, 25*this.wv, 0);
			this.grd.addColorStop(0, 'white');
			this.grd.addColorStop(1, this.color);
			this.grd2 = pen.createLinearGradient(-25*this.wv, 0, 25*this.wv, 0);
			this.grd2.addColorStop(0, 'white');
			this.grd2.addColorStop(1, '#bbb');
			this.main_grd = pen.createLinearGradient(-this.width/2, -50*this.hv, this.width/2, this.height);
			this.main_grd.addColorStop(0, 'white');
			this.main_grd.addColorStop(1, 'silver');
		}
		else{				
			this.grdo = pen.createLinearGradient(0, -25*this.hh, 0, 25*this.hh);
			this.grdo.addColorStop(0, 'white');
			this.grdo.addColorStop(1, this.color);
			this.grd2o = pen.createLinearGradient(0, -25*this.hh, 0, 25*this.hh);
			this.grd2o.addColorStop(0, 'white');
			this.grd2o.addColorStop(1, '#bbb');
			this.main_grd = pen.createLinearGradient(-this.width/2, -50*this.hh, this.width/2, this.height);
			this.main_grd.addColorStop(0, 'white');
			this.main_grd.addColorStop(1, 'silver');
		}
	}.bind(this);
	createGradients();

	this.drawLevel = function(){
		pen.save();
		pen.beginPath();
		pen.shadowColor = "#555";
		pen.strokeStyle='#555';
		if(this.align=="vertical"){
			pen.fillStyle=this.grd2;
			pen.shadowOffsetX = 1*this.wv;
			pen.shadowOffsetY = 0;
			pen.shadowBlur = 5*this.logfactv;
			pen.lineWidth=2*this.logfactv;
			if(this.rounded==true || this.rounded=="true"){
				pen.roundRect(-10*this.wv, -this.height/2+10*this.hv, 20*this.wv, this.height-20*this.hv, 10);
			}
			else{
				pen.rect(-10*this.wv, -this.height/2+10*this.hv, 20*this.wv, this.height-20*this.hv);
			}
		}
		else{
			pen.fillStyle=this.grd2o;
			pen.lineWidth=2*this.logfacth;
			pen.shadowBlur = 5*this.logfacth;
			pen.shadowOffsetX = 0;
			pen.shadowOffsetY = 1*this.hh;
			if(this.rounded==true || this.rounded=="true"){
				pen.roundRect(-this.width/2+10*this.wh, -10*this.hh, this.width-20*this.wh, 20*this.hh, 10);
			}
			else{
				pen.rect(-this.width/2+10*this.wh, -10*this.hh, this.width-20*this.wh, 20*this.hh);
			}
		}
		pen.closePath();
		pen.stroke();
		pen.fill();
		pen.restore();
	}

	var y2, x2;
	this.drawGrid=function(){ 
		var max_length=-1;
		precision = this.precision;
		for(var i=0; i<=this.divisions; i++){
			var num = Math.round((this.min_range+(this.max_range-this.min_range)*i/this.divisions)*precision)/precision; 
			pen.beginPath();
			pen.fillStyle="#000";
			var len = this.max_range.toString().length>=this.min_range.toString().length?this.max_range.toString().length:this.min_range.toString().length;
			if(precision>10)
				len = precision.toString().length+1;
			var font_ratio = len>3?len:3;
			var dx = this.divisions>50?50/this.divisions:1;
			if(this.align=="vertical"){
				pen.font='normal'+' '+'bolder'+' '+(10*this.logfactv)*3/font_ratio*dx+'px'+' '+'sans';
				y2 = (this.height/2-10*this.hv)-(this.height-20*this.hv)*i/this.divisions;
				if(this.topdown==true || this.topdown=="true")
					y2 = -y2;
				pen.moveTo(15*this.wv, y2);
				if(i%5==0 || this.divisions/5<1){
					pen.save();
					pen.lineWidth=2*this.hv;
					pen.lineTo(25*this.wv, y2);
					pen.fillText(num, 28*this.wv, y2+(5*this.logfactv)*3/font_ratio*dx);
					pen.restore();
				}
				else{
					pen.lineTo(20*this.wv, y2);
				}
			}
			else{
				pen.font='normal'+' '+'bolder'+' '+(10*this.logfacth)*3/font_ratio*dx+'px'+' '+'sans';
				x2 = (-this.width/2+10*this.wh)+(this.width-20*this.wh)*i/this.divisions;
				if(this.topdown==true || this.topdown=="true")
					x2 = -x2;
				pen.moveTo(x2, 15*this.hh);
				if(i%5==0 || this.divisions/5<1){
					pen.save();
					pen.lineWidth=2*this.wh;
					pen.lineTo(x2, 25*this.hh);
					pen.fillText(num, x2-pen.measureText(num).width/2, 28*this.hh+(10*this.hh)*3/font_ratio*dx);
					pen.restore();
				}
				else{
					pen.lineTo(x2, 20*this.hh);
				}
			}	
			pen.closePath();
			pen.stroke();
		}
	}
	var canv = document.createElement('canvas');
	canv.width = this.width;
	canv.height = this.height;
	var ctx = canv.getContext('2d');

	this.fillLevel = function(){
		var mheight = this.height-20*this.hv;
		var mwidth = this.width-20*this.wh;
		if(this.align=="vertical"){
			ctx.fillStyle=this.grd;
			var y;
			if(this.topdown==true || this.topdown=="true")
				y = -mheight/2-5*this.hv;
			else
				y = mheight/2-((this.actual_value-this.min_range)*(mheight))/(this.max_range-this.min_range);
	
			ctx.fillRect(-10*this.wv, y, 20*this.wv, (((this.actual_value-this.min_range)*(mheight))/(this.max_range-this.min_range))+5*this.hv);
		}else{
			ctx.fillStyle=this.grdo;
			var x;
			if(this.topdown==true || this.topdown=="true")
				x = mwidth/2-((this.actual_value-this.min_range)*(mwidth))/(this.max_range-this.min_range);
			else
				x = -mwidth/2-5*this.wh;
			ctx.fillRect(x, -10*this.hh, (((this.actual_value-this.min_range)*(mwidth))/(this.max_range-this.min_range))+5*this.wh, 20*this.hh);
		}
		ctx.restore();
		pen.clip();
	 	pen.drawImage(canv, -this.width/2, -this.height/2);
	}

	this.__defineSetter__("width", function(width){
		this._width = width;
		this.canvas.width=width;
		this.container.style.width = width+'px';
		this.wv= width/100;
		this.wh = width/220;
		this.logfactv = Math.log(Math.E*this.wv);
		this.logfacth = Math.log(Math.E*this.hh);
		if(this.height && this.width)
			createGradients();
		canv.width = width;
	});
	
	this.__defineGetter__("width", function(){
		return this._width;
	 });

	this.__defineSetter__("height", function(height){
		this._height = height;
		this.canvas.height=height;
		this.container.style.height = height+'px';
		this.hh= height/100;
		this.hv = height/220;
		this.logfactv = Math.log(Math.E*this.wv);
		this.logfacth = Math.log(Math.E*this.hh);
		if(this.height && this.width)
			createGradients();
		canv.height = height;
	});
	
	this.__defineGetter__("height", function(){
		return this._height;
	 });

	this.__defineSetter__("align", function(align){
		this._align = align;
		if((align=="vertical" && this.width>this.height) || (align=="horizontal" && this.height>this.width)){
			var h = this.height;
			this.height = this.width;
			this.width = h;
			if(this.height && this.width)
				createGradients();
		}
	});

	this.__defineGetter__("align", function(){
		return this._align;
	 });

	this.__defineSetter__("color", function(color){
		this._color = color;
		if(this.height && this.width)
			createGradients();
	});

	this.__defineGetter__("color", function(){
		return this._color;
	 });

	this.align=element.getAttribute("align") || "vertical";
	this.color = element.getAttribute("color") || "blue";
	this.width = this.canvas.width;
	this.height = this.canvas.height;

	this.render=function(){
		this.canvas.width=this.canvas.width;
		this.scaleOutputCommonOperations();
		pen.save();
		pen.translate(this.width/2, this.height/2);
		if(!this.hide_grid || this.hide_grid=="false")
			this.drawGrid();
		this.drawLevel();
		canv.width = canv.width;
		ctx.save();
		ctx.translate(this.width/2, this.height/2);
		this.fillLevel();
		pen.restore();

	}
}
