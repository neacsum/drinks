function VuMeter(element){

	VuMeter.inherits(ScaleOutput);
	ScaleOutput.call(this, element);
	var pen = this.pen;
	if(this.width==null)	
		this.width = 300;
	if(this.height==null)	
		this.height = 180;
	this.wx = this.width/300;
	this.hx = this.height/180;
	var grd, grd2;
	
	var createGradients = function(){
		grd =  pen.createLinearGradient(-10*this.wx, 0, this.width+10*this.wx, 0);
		grd.addColorStop(0, '#999');
		grd.addColorStop(0.1, '#333');
		grd.addColorStop(0.5, '#999');
		grd.addColorStop(0.9, "#333");
		grd.addColorStop(1, "#999");
		grd2 =  pen.createLinearGradient(-5*this.wx, this.height/2-10*this.hx, 5*this.wx, this.height/2-15*this.hx);
		grd2.addColorStop(0, '#CCCC33');
		grd2.addColorStop(0.3, 'white');
		grd2.addColorStop(0.5, '#CCCC33');
	}.bind(this);
	createGradients();

	this.divisions = element.getAttribute("divisions") || 100.00;;
	this.dx = 100/this.divisions;
	var precision = this.precision;
	this.drawRange = function(){
		if(this.range_from!=null && this.range_to!=null && this.range_from>=this.min_range && this.range_to<=this.max_range){
			pen.save();
			pen.strokeStyle="rgba(255, 0, 0 , 0.5)";
			pen.lineWidth=8*this.wx;
			pen.beginPath();
			var range_min_position = (parseFloat(this.range_from)-this.min_range)*this.divisions/(this.max_range-this.min_range);
			var range_max_position = (parseFloat(this.range_to)-this.min_range)*this.divisions/(this.max_range-this.min_range);		
			pen.arc(0, this.height/2+10*this.hx, this.width/2-10*this.wx, (220+range_min_position)*Math.PI/180, (220+range_max_position)*Math.PI/180, false);
			pen.stroke();
			pen.closePath();
			pen.restore();
		}	
	}

	this.drawGrid = function(){
		var i, inset;
		var num;
		var divfactor = 100/this.divisions>1?1:100/this.divisions;
		pen.font='italic'+' '+'bolder'+' '+((8*this.wx)*(divfactor))+'px'+' '+'sans';
		precision = this.precision;
		for(i = 0; i <= this.divisions; i++){
			var y = Math.round((this.height/2+10*this.hx+Math.sin((220+i*this.dx)*Math.PI/180)*this.width/2)*100)/100;
			var x = Math.round((Math.cos((220+i*this.dx)*Math.PI/180)*this.width/2)*100)/100;
			if(i % 5 == 0 || this.divisions/10<1){
				if(i % 10 == 0 || this.divisions/10<1){
					inset = 0.08 * this.width/2;
					pen.lineWidth=1.5*this.wx;
					num = Math.round((this.min_range+(this.max_range-this.min_range)*i/this.divisions)*precision)/precision;  
					pen.fillStyle='#333';
				} else {
					inset = 0.05 * this.width/2;
		       			pen.lineWidth=1*this.wx;
				}
			} else {
				inset = 0.03 * this.width/2;
		       		pen.lineWidth=0.5*this.wx;
	       		}
			var y1 = Math.round((this.height/2+10*this.hx+Math.sin((220+i*this.dx)*Math.PI/180)*(this.width/2+inset))*100)/100;
			var x1 = Math.round((Math.cos((220+i*this.dx)*Math.PI/180)*(this.width/2+inset))*100)/100;	
			pen.strokeStyle='#333';			
			pen.beginPath();
			pen.moveTo(x, y);
			pen.lineTo(x1, y1);
	 	      	pen.stroke();
			pen.closePath();       	
			if(i % 10 == 0 || this.divisions/10<1)
				pen.fillText(num, x1-pen.measureText(num).width/2, y1-5*this.hx);

		}
	}

	this.drawValue = function(){
		pen.beginPath();
		pen.strokeStyle="rgba(255, 0, 0, 0.7)";
		pen.lineWidth=2*this.wx;
		pen.moveTo(0, this.height/2-10*this.hx);
		var y1 = Math.round((this.height/2+10*this.hx+Math.sin((220+this.prec_position*this.dx)*Math.PI/180)*(this.width/2+5*this.wx))*100)/100;
		var x1 = Math.round((Math.cos((220+this.prec_position*this.dx)*Math.PI/180)*(this.width/2+5*this.wx))*100)/100;	
		pen.lineTo(x1, y1);
		pen.stroke();
		pen.closePath();
	}

	this.__defineSetter__("width", function(width){
		this._width = width;
		this.canvas.width=width;
		this.container.style.width = width+'px';
		this.wx= width/300;
		if(this.height && this.width)
			createGradients();
	});
	
	this.__defineGetter__("width", function(){
		return this._width;
	 });

	this.__defineSetter__("height", function(height){
		this._height = this.width*180/300;
		if(height>this.width*180/300){
			this.canvas.height=height;
			this.container.style.height = height+'px';
		}else{
			this.canvas.height=this._height;
			this.container.style.height = this._height+'px';
		}
		this.hx= this._height/180;
		if(this.height && this.width)
			createGradients();
	});
	
	this.__defineGetter__("height", function(){
		return this._height;
	 });

	this.__defineSetter__("divisions", function(divisions){
		this._divisions = divisions;
		this.dx = 100/this.divisions;
		precision = this.precision;
	});

	this.__defineGetter__("divisions", function(){
		return this._divisions;
	 });


	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.divisions = element.getAttribute("divisions") || 100;

	this.render = function(){
		this.canvas.width = this.canvas.width;
		this.scaleOutputCommonOperations();
		pen.fillStyle=grd;
		pen.fillRect(0, 0, this.width, this.height);
		pen.save();
		pen.shadowOffsetX = -2*this.wx;
		pen.shadowOffsetY = -2*this.hx;
		pen.shadowColor = "#333";
		pen.shadowBlur = 5*this.wx;
		pen.beginPath();
		pen.strokeStyle=grd;
		pen.lineWidth=5*this.wx;
		pen.moveTo(10*this.wx, 10*this.hx);
		pen.lineTo(this.width-10*this.wx, 10*this.hx);
		pen.lineTo(this.width-10*this.wx, this.height-10*this.hx);
		pen.lineTo(10*this.wx, this.height-10*this.hx);
		pen.closePath();	
		pen.fillStyle="white";
		pen.stroke();
		pen.fill();
		pen.restore();
		pen.save();
		pen.translate(this.width/2, this.height/2);
		pen.beginPath();
		pen.arc(0, this.height/2+10*this.hx, this.width/2, 220*Math.PI/180, 320*Math.PI/180, false);
		pen.stroke();
		pen.closePath();
		this.drawRange();
		pen.fillStyle="#222";
		pen.shadowOffsetX = 0;
		pen.shadowOffsetY = 0*this.hx;
		pen.shadowColor = "#555";
		pen.shadowBlur = 3*this.wx;
		pen.font='italic'+'  '+30*this.wx+'px'+' '+'sans';
		if(pen.measureText(this.text).width>2/3*this.radius)
			pen.font='italic'+'  '+(2/3*this.radius)/this.text.length+'px'+' '+'sans';
		pen.fillText(this.text, -pen.measureText(this.text).width/2, this.height/2-this.width/4);
		pen.shadowOffsetX = 0*this.wx;
		pen.shadowOffsetY = 0*this.hx;
		pen.shadowColor = "#333";
		pen.shadowBlur = 2*this.wx;
		if(!this.hide_grid || this.hide_grid=="false")
			this.drawGrid();
		pen.shadowOffsetX = 1*this.wx;
		pen.shadowOffsetY = 1*this.hx;
		pen.shadowColor = "#333";
		pen.shadowBlur = 2*this.wx;
		this.drawValue();
		pen.shadowColor = "transparent";
		pen.fillStyle=grd;
		pen.strokeStyle=grd;
		pen.lineWidth=4*this.wx;
		pen.beginPath();
		pen.arc(0, this.height/2, 20*this.wx, Math.PI, 0, false);
		pen.stroke();
		pen.fill();
		pen.closePath();
		pen.lineWidth=1*this.wx;
		pen.fillStyle=grd2;
		pen.beginPath();
		pen.arc(0, this.height/2-10*this.hx, 5*this.wx, 2*Math.PI, 0, false);
		pen.stroke();
		pen.fill();
		pen.closePath();
		pen.restore();
	}

}
