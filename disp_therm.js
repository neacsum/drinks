function ThermoMeter(element){

	ThermoMeter.inherits(ScaleOutput);
	ScaleOutput.call(this, element);

	var pen = this.pen;
	this.align=element.getAttribute("align") || "vertical";
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
	this.color = element.getAttribute("color") || "blue";
	this.divisions= element.getAttribute("divisions") || 25.00;

	var precision = this.precision;
	if(this.align=="vertical")
		var radius = Math.round(17.5*this.logfactv);
	else
		var radius = Math.round(17.5*this.logfacth);
	var grd, grd3, grd2, main_grd;
	var createGradients = function(){
		if(this.align=="vertical"){
			grd = pen.createLinearGradient(-25*this.wv, 0, 25*this.wv, 0);
			grd.addColorStop(0, 'white');
			grd.addColorStop(1, this.color);
			grd2 = pen.createLinearGradient(-25*this.wv, 0, 25*this.wv, 0);
			grd2.addColorStop(0, 'white');
			grd2.addColorStop(1, '#bbb');
			main_grd = pen.createLinearGradient(-this.width/2, -50*this.hv, this.width/2, this.height);
			main_grd.addColorStop(0, 'white');
			main_grd.addColorStop(1, 'silver');
		}
		else{				
			grdo = pen.createLinearGradient(0, -25*this.hh, 0, 25*this.hh);
			grdo.addColorStop(0, 'white');
			grdo.addColorStop(1, this.color);
			grd2o = pen.createLinearGradient(0, -25*this.hh, 0, 25*this.hh);
			grd2o.addColorStop(0, 'white');
			grd2o.addColorStop(1, '#bbb');
			main_grd = pen.createLinearGradient(-this.width/2, -50*this.hh, this.width/2, this.height);
			main_grd.addColorStop(0, 'white');
			main_grd.addColorStop(1, 'silver');
		}
	}.bind(this);
	createGradients();
	//x coord of arc's starting point
	var x1 = 0;		 
	//y coord of arc's starting point	
	var y1 = 0;		 
	//x coord of arc's ending point
	var x2 = 0;
	//y coord of number's starting point
	var y2 = 0;
	//y coord of first number's starting point
	var y3 = 0;
	//meter's height
	var mheight = 0;
	//meter's width
	var mwidth = 0;
	
	this.drawThermo = function(){
		pen.save();
		pen.beginPath();
		pen.shadowColor = "#555";
		pen.strokeStyle='#555';	
		if(this.align=="vertical"){
			pen.fillStyle=grd;
			pen.shadowOffsetX = 1*this.wv;
			pen.shadowOffsetY = 0*this.hv;
			pen.shadowBlur = 5*this.logfactv;
			pen.lineWidth=2*this.logfactv;
			pen.arc(0, this.height/2-10*this.hv-radius, radius, (Math.PI/180)*240, (Math.PI/180)*-60, true);
			pen.stroke();
			pen.fill();
			pen.closePath();
			pen.beginPath();
			x1 = (radius)*Math.cos(120*Math.PI/180);
			y1 = this.height/2-10*this.hv-radius-(radius)*Math.sin(120*Math.PI/180);
			x2 = (radius)*Math.cos(60*Math.PI/180)
			pen.moveTo(x1, y1);
			pen.lineTo(x1, -this.height/2+10*this.hv);
			pen.lineTo(x2, -this.height/2+10*this.hv);
			pen.lineTo(x2, y1);
			pen.fillStyle=grd2;
		}
		else{
			pen.fillStyle=grdo;
			pen.shadowOffsetX = 1*this.wh;
			pen.shadowOffsetY = 0*this.hh;
			pen.shadowBlur = 5*this.logfacth;
			pen.lineWidth=2*this.logfacth;
			pen.arc(-this.width/2+10*this.wh+radius, 0, radius, (Math.PI/180)*330, (Math.PI/180)*30, true);
			pen.stroke();
			pen.fill();
			pen.closePath();
			pen.beginPath();
			y1 = (radius)*Math.sin(330*Math.PI/180);
			x1 = -this.width/2+10*this.wh+radius+radius*Math.cos((Math.PI/180)*330);
			y2 = (radius)*Math.sin(30*Math.PI/180);
			pen.moveTo(x1, y1);
			pen.lineTo(this.width/2-10*this.wh, y1);
			pen.lineTo(this.width/2-10*this.wh, y2);
			pen.lineTo(x1, y2);
			pen.fillStyle=grd2o;
		}
		pen.stroke();
		pen.closePath();
		pen.fill();
			

		pen.shadowOffsetX = 0;
		pen.shadowOffsetY = 0;
		pen.shadowBlur = 0;
		if(this.align=="vertical"){
			pen.fillStyle=grd;
			pen.fillRect(x1, y_grid - 2*this.hv, x2-x1, radius);
			
		}
		else{
			pen.fillStyle=grdo;
			pen.fillRect(x_grid-radius, y1, radius+2*this.wh, y2-y1);
		}
	}
	var x_grid, y_grid;
	this.drawGrid = function(){
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
				y_grid = this.height/2-10*this.hv-2*radius; 
				y2 = y_grid-(this.height-2*radius-20*this.hv)*i/this.divisions;
				pen.moveTo(15*this.wv, y2);
				if(i%5==0 || this.divisions/5<1){
					pen.save();
					pen.lineWidth=2*this.hv;
					pen.lineTo(25*this.wv, y2);
					pen.fillText(num, 28*this.wv, y2+(5*this.logfactv)*3/font_ratio);
					pen.restore();
				}
				else{
					pen.lineTo(20*this.wv, y2);
				}
			}
			else{
				pen.font='normal'+' '+'bolder'+' '+(10*this.logfacth)*3/font_ratio+'px'+' '+'sans';
				x_grid = -this.width/2+10*this.wh+2*radius;
				x2 = x_grid+(this.width-2*radius-20*this.wh)*i/this.divisions;
				pen.moveTo(x2, 15*this.hh);
				if(i%5==0 || this.divisions/5<1){
					pen.save();
					pen.lineWidth=2*this.wh;
					pen.lineTo(x2, 25*this.hh);
					pen.fillText(num, x2-pen.measureText(num).width/2, 28*this.hh+(10*this.hh)*3/font_ratio);
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
	
	this.fillThermo = function(){
		var mheight = this.height-20*this.hv-2*radius;
		var mwidth = this.width-20*this.wh-2*radius;
		ctx.save();
		if(this.align=="vertical"){
			ctx.translate(0, y_grid-mheight/2);
			ctx.fillStyle=grd;
			var y;
			y = mheight/2-((this.actual_value-this.min_range)*(mheight))/(this.max_range-this.min_range);
	
			ctx.fillRect(-10*this.wv, y, 20*this.wv, (((this.actual_value-this.min_range)*(mheight))/(this.max_range-this.min_range)));
		}else{
			ctx.translate(x_grid+mwidth/2, 0);
			ctx.fillStyle=grdo;
			var x;
			x = -mwidth/2;
			ctx.fillRect(x, -10*this.hh, (((this.actual_value-this.min_range)*(mwidth))/(this.max_range-this.min_range)), 20*this.hh);
		}
		ctx.restore();
		pen.clip();
	 	pen.drawImage(canv, -this.width/2, -this.height/2);
	}

	this.__defineSetter__("width", function(width){
		this._width = width;
		this.canvas.width=width;
		this.container.style.width = width+'px';
		this.html.style.width = width+'px';
		this.wv= width/100;
		this.wh = width/220;
		this.logfactv = Math.log(Math.E*this.wv);
		this.logfacth = Math.log(Math.E*this.hh);
		if(this.align=="vertical")
			radius = Math.round(17.5*this.logfactv);
		else
			radius = Math.round(17.5*this.logfacth);
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
		this.html.style.height = height+'px';
		this.hh= height/100;
		this.hv = height/220;
		this.logfactv = Math.log(Math.E*this.wv);
		this.logfacth = Math.log(Math.E*this.hh);
		console.log(this.align);
		if(this.align=="vertical")
			radius = Math.round(17.5*this.logfactv);
		else
			radius = Math.round(17.5*this.logfacth);
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

			if(align=="vertical")
				radius = Math.round(17.5*this.logfactv);
			else
				radius = Math.round(17.5*this.logfacth);
	
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
	this.color = element.getAttribute("color") || "blue";
	this.align=element.getAttribute("align") || "vertical";
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.align=element.getAttribute("align") || "vertical";
	this.render = function(){
		this.canvas.width=this.canvas.width;
		this.scaleOutputCommonOperations();
		pen.save();
		pen.translate(this.width/2, this.height/2);
		if(!this.hide_grid || this.hide_grid=="false")
			this.drawGrid();
		this.drawThermo();
		canv.width = canv.width;
		ctx.save();
		ctx.translate(this.width/2, this.height/2);
		this.fillThermo();
		pen.restore();
	}

}

