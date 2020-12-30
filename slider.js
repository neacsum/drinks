/**************************************************************************************************************
* Copyright (c) 2012, Goincompany.com
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of the DRINKS Toolkit nor the
*       names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY Goincompany.com ``AS IS'' AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL Goincompany.com BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

 To get sources and documentation, please visit:

  	http://www.goincompany.com/drinks.php

***************************************************************************************************************/
function Slider(element){
	
	Slider.inherits(MoveInput);
	MoveInput.call(this, element);

	var pen = this.pen;
	this.cursor = element.getAttribute("cursor") || "pointer";
	var precision = this.precision; 
	this.align = element.getAttribute("align") || "horizontal";
	this.topdown = element.getAttribute("topdown")=="true" || false;
	if(this.align=="vertical"){
		if(this.width==null)
			this.width = 80;
		if(this.height==null)
			this.height = 300;
	}else{
		if(this.height==null)
			this.height = 80;
		if(this.width==null)
			this.width = 300;
	}
	this.wv = this.width/80, this.hv = this.height/300;
	this.wh = this.width/300, this.hh = this.height/80;
	this.logfactv = Math.log(Math.E*this.wv);
	this.logfacth = Math.log(Math.E*this.hh);

	var grd, grd2;
	var flag=false;
	var createGradients = function(){
		if(this.align=="vertical"){
			grd = pen.createLinearGradient(0, 0, 0, 10*this.hv);
			grd.addColorStop(0, '#fff');
			grd.addColorStop(1, '#aaa');
			grd2 = pen.createLinearGradient(-2*this.wv, this.height/2, 2*this.hv, this.height/2);
			grd2.addColorStop(0, '#666');
			grd2.addColorStop(1, '#ddd');
		}else{
			grd = pen.createLinearGradient(0, 0, 10*this.wh, 0);
			grd.addColorStop(0, '#fff');
			grd.addColorStop(1, '#aaa');
			grd2 = pen.createLinearGradient(this.width/2, -2*this.hh, this.width/2, 2*this.hh);
			grd2.addColorStop(0, '#666');
			grd2.addColorStop(1, '#ddd');
		}
	}.bind(this);
	createGradients();

	this.__defineSetter__("height", function(height){
		if(this.align=="vertical"){
			var old_height = this.height; 
			this._height = height;
			this.canvas.height = height;
			this.container.style.height = height+'px';
			this.hv = height/200;
			this.hh = height/80;
			if(this.height)
				createGradients();
			if(old_height && !flag)
				this.y_root = (height *this.y_root)/old_height;
			flag = false; 
		}
		else{
			this._height = 80;
			this.canvas.height = height;
			this.container.style.height = height+'px';
			this.hh= 1;
		}
		this.logfacth = Math.log(Math.E*this.hh);
	});	
	this.__defineGetter__("height", function(){
		return this._height;
	 });

	this.__defineSetter__("width", function(width){
		if(this.align=="vertical"){
			this._width = 80;
			this.canvas.width = width;
			this.container.style.width = width+'px';
			this.wv= 1;
		}
		else{
			var old_width = this.width; 
			this._width = width;
			this.canvas.width = width;
			this.container.style.width = width+'px';
			this.wv= width/80;
			this.wh = width/200;
			if(this.width)
				createGradients();
			if(old_width && !flag)
				this.x_root = (width *this.x_root)/old_width;
			flag = false; 
		}
		this.logfactv = Math.log(Math.E*this.wv);
	});	
	this.__defineGetter__("width", function(){
		return this._width;
	 });

	this.width = this.canvas.width;
	this.height = this.canvas.height;
	if(this.align=="vertical"){	
		this.canvas.width = element.getAttribute("width") || 80;
		this.container.style.width = this.canvas.width+'px';
	}
	else{
		this.canvas.height = element.getAttribute("height") || 80;
		this.container.style.height = this.canvas.height+'px';
	}

	this.__defineSetter__("align", function(align){
		this._align = align;
		if((align=="vertical" && this.width>this.height) || (align=="horizontal" && this.height>this.width)){
			flag=true;
			var h = this.height;
			this.height = this.width;
			this.width = h;	
			if(this.height && this.width)
				createGradients();
			this.value=this.value;
		}
	});	
	this.__defineGetter__("align", function(){
		return this._align;
	 });

	this.align = element.getAttribute("align") || "horizontal";

	this.drawSlider = function(){
		pen.fillStyle=grd2;
		if(this.align=="vertical")
			pen.fillRect(-5*this.wv, 10*this.hv, 5*this.wv, this.height-20*this.hv);
		else
			pen.fillRect(10*this.wh, -5*this.hh, this.width-20*this.wh, 5*this.hh);
	}
	
	this.drawCursor = function(){
		pen.beginPath();
		if(this.cursor=="pointer"){
			pen.save();
			var curs;
			if(this.align=="vertical"){
				if(this.height>200)
					curs = 8;
				else
					curs = 8*this.hv;
		
				pen.translate(0, this.y_root+5*this.hv);
				pen.moveTo(0, -curs);
				pen.lineTo(-10, -curs);
				pen.lineTo(-10, curs);
				pen.lineTo(0, curs);
				pen.lineTo(5, 0);
			}
			else{
				if(this.width>200)
					curs = 8;
				else
					curs = 8*this.wh;
				pen.translate(this.x_root+5*this.wh, 0);
				pen.moveTo(-curs, 0);
				pen.lineTo(-curs, -10);
				pen.lineTo(curs, -10);
				pen.lineTo(curs, 0);
				pen.lineTo(0, 5);
			}
			pen.restore();
		}
		else if(this.cursor=="square"){
			if(this.align=="vertical")
				pen.rect(-10*this.wv, this.y_root, 15*this.wv, 10*this.hv);
			else
				pen.rect(this.x_root, -10*this.hh, 10*this.wh, 15*this.hh);
		}
		else if(this.cursor=="round"){
			if(this.align=="vertical"){
				pen.arc(-2.5*this.hv, this.y_root+5*this.hv, 5*this.hv, 0, 2*Math.PI, false);
			}
			else{
				pen.arc(this.x_root+5*this.wh, -2.5*this.wh, 5*this.wh, 0, 2*Math.PI, false);
			}
		}
		pen.closePath();
		if(this.align=="vertical"){
			pen.translate(0, this.y_root);
		}
		else
			pen.translate(this.x_root, 0);
		pen.shadowOffsetX = 0;
		pen.shadowOffsetY = 0;
		pen.shadowBlur = 1;
		pen.fillStyle=grd;
		pen.stroke();
		pen.fill();
	}

}

function AnalogSlider(element){ 
	AnalogSlider.inherits(Slider);
	Slider.call(this, element);
	var pen = this.pen;
	this.divisions = element.getAttribute("divisions") || 50.00;
	var precision = this.precision; 
	this.decx = 5*this.width/200;
	this.decy = 5*this.height/200;

	this.__defineSetter__("value", function(value){
		if(!this.f){
			this.f=true;
			this._value = value;
			if(!this.topdown || this.topdown=="false"){
				if(this.align=="vertical")
					this._y_root = this.height-10*this.hv-Math.round(((this._value-this.min_range)*(this.height-20*this.hv)/(this.max_range-this.min_range))+5*this.hv);
				else	
					this._x_root = Math.round(((this._value-this.min_range)*(this.width-20*this.wh)/(this.max_range-this.min_range))+5*this.wh);
			}else{
				if(this.align=="vertical")
					this._y_root = Math.round(((this._value-this.min_range)*(this.height-20*this.hv)/(this.max_range-this.min_range))+5*this.hv);
				else	
					this._x_root = this.width-10*this.wh-Math.round(((this._value-this.min_range)*(this.width-20*this.wh)/(this.max_range-this.min_range))+5*this.wh);
			}
			this.f=false;
		}
	});	

	this.__defineGetter__("value", function(){
			return this._value;
	 });
	this.__defineSetter__("x_root", function(x_root){
		if(!this.f){
			this.f=true;
			if(x_root<5*this.wh)
				x_root=5*this.wh;
			if(x_root>this.width-15*this.wh)
				x_root=this.width-15*this.wh;
			this._x_root = x_root;
			var precision = this.precision; 
			if(this.align=="horizontal"){
				if(this.topdown==true || this.topdown=="true")
					this._value=Math.round((this.max_range-((this.min_range+((this._x_root-5*this.wh)*(this.max_range-this.min_range))/(this.width-20*this.wh))))*precision)/(precision);
				else
					this._value=Math.round((this.min_range+((this._x_root-5*this.wh)*(this.max_range-this.min_range))/(this.width-20*this.wh))*precision)/(precision);
			}
			this.f=false;
		}
	});	

	this.__defineGetter__("x_root", function(){
			return this._x_root;
	 });
	this.__defineGetter__("y_root", function(){
			return this._y_root;
	});

	this.__defineSetter__("y_root", function(y_root){
		if(!this.f){
			this.f=true;
			if(y_root<5*this.hv)
				y_root=5*this.hv;
			if(y_root>this.height-15*this.hv)
				y_root=this.height-15*this.hv;
			this._y_root = y_root;
			if(this.align=="vertical"){
				if(!this.topdown || this.topdown=="false")
					this._value=Math.round((this.max_range-((this.min_range+((this.y_root-5*this.hv)*(this.max_range-this.min_range))/(this.height-20*this.hv))))*precision)/(precision);
				else
					this._value=Math.round((this.min_range+((this.y_root-5*this.hv)*(this.max_range-this.min_range))/(this.height-20*this.hv))*precision)/(precision);
			}
			this.f=false;
		}
	});	

	this.__defineSetter__("topdown", function(topdown){
		this._topdown = topdown;
		this.value = this.value;
	});

	this.__defineGetter__("topdown", function(){
		return this._topdown;
	});
	
	var drawGrid = function(){
		var x2, y2;		
		if(this.align=="vertical")
			pen.translate(-10*this.wv, this.height/2);
		else			
			pen.translate(this.width/2, -10*this.hh);
		precision = this.precision;
		for(var i=0; i<=this.divisions; i++){
			var num = Math.round((this.min_range+(this.max_range-this.min_range)*i/this.divisions)*precision)/precision; 
			pen.beginPath();
			pen.fillStyle="#333";
			var len = this.max_range.toString().length>=this.min_range.toString().length?this.max_range.toString().length:this.min_range.toString().length;
			if(precision>10)
				len = precision.toString().length+1;
			var font_ratio = len>3?len:3;
			var dx = this.divisions>40?40/this.divisions:3/4;
			if(this.align=="vertical"){
				pen.font='normal'+' '+'bolder'+' '+(10*this.logfacth)*2/font_ratio*dx+'px'+' '+'sans';
				y2 = (-this.height/2+10*this.hv)+(this.height-20*this.hv)*i/this.divisions;
				if(!this.topdown || this.topdown=="false")
					y2 = -y2;
				pen.moveTo(15*this.wv, y2);
				if(i%5==0 || this.divisions/5<1){
					pen.save();
					pen.lineTo(25*this.wv, y2);
					pen.fillText(num, 28*this.wv, y2+(this.width*(1/32)));
					pen.restore();
				}
				else{
					pen.lineTo(20*this.wv, y2);
				}
				pen.stroke();
			}
			else{
				pen.font='normal'+' '+'bolder'+' '+(10*this.logfactv)*2/font_ratio*dx+'px'+' '+'sans';
				x2 = (-this.width/2+10*this.wh)+(this.width-20*this.wh)*i/this.divisions;
				if(this.topdown==true || this.topdown=="true")
					x2 = -x2;
				pen.moveTo(x2, 15*this.hh);
				if(i%5==0 || this.divisions/5<1){
					pen.save();
					pen.lineTo(x2, 25*this.hh);
					pen.fillText(num, x2-pen.measureText(num).width/2, 28*this.hh+(this.height*(1/8)));
					pen.restore();
				}
				else{
					pen.lineTo(x2, 20*this.hh);
				}
				pen.stroke();
			}
		}
		if(this.align=="vertical")
			pen.translate(10*this.wv, -this.height/2);
		else
			pen.translate(-this.width/2, 10*this.hh);
	}.bind(this);
	
	this.value = parseFloat(element.getAttribute("value")) || this.min_range || 0;

	this.render = function(){
		this.canvas.width = this.canvas.width;
		pen.save();
		if(this.align=="vertical"){
			pen.translate(this.canvas.width/2, 0);
			pen.shadowOffsetX = 1*this.wv;
			pen.shadowOffsetY = 1*this.hv;
			pen.shadowBlur = 2*this.hv;
		}
		else{
			pen.translate(0, this.canvas.height/2);
			pen.shadowOffsetX = 1*this.wh;
			pen.shadowOffsetY = 1*this.hh;
			pen.shadowBlur = 2*this.wh;
		}
		pen.shadowColor = "#999";
		this.drawSlider();
		if(!this.hide_grid || this.hide_grid=="false"){
			drawGrid();
		}
		this.drawCursor();
		pen.restore();
	}
}

function DigitalSlider(element){ 

	DigitalSlider.inherits(Slider);
	Slider.call(this, element);
	this.selected = 0;
	var pen = this.pen;
	this.decx = 5*this.width/200;
	this.decy = 5*this.height/200;
	var coord_options=new Array();
	this.values = new Array ();

	this.loadOptions(element);
	Object.defineProperty (this, 'value', {
		set: (value) => {
			if(!this.f){
				this.f=true;
				if(this.values[value] || this.values[value]==0){
					this._value = value;
					if(this.align=="vertical")
						this.y_root = coord_options[this.values[value]]-5*this.hv;
					else				
						this.x_root = coord_options[this.values[value]]-5*this.wh;
					this.selectedIndex = this.values[value];	
				}
				this.f=false;
			}
	
		},
		get: () => {return this._value}
	});
	Object.defineProperty (this, 'selectedIndex', {
		set: (idx) => {
			this._selectedIndex = idx;	
			this.value = this.options[idx].value;
		},
		get: () => {return this._selectedIndex}		
	})

	var inc, next;
	if(this.align=="vertical"){
		inc = (this.height-20*this.hv)/(this.options.length-1);
		if(!this.topdown || this.topdown=="false")
			next= 10*this.hv;
		else
			next= this.height-10*this.hv;
	}
	else{
		inc = (this.width-20*this.wh)/(this.options.length-1);
		if(!this.topdown || this.topdown=="false")
			next = 10*this.wh;
		else
			next = this.width-10*this.wh;
	}
	pen.save();	

	for(var i in this.options){
		if(!this.topdown || this.topdown=="false"){
			if(i!=0)
				next +=inc;
		}
		else{
			if(i!=0)
				next -=inc;
		}
		coord_options[i] = next;
		this.values[this.options[i].value]=i;
	}
	pen.restore();	

	this.selectedIndex = this.selected;

	this.value = this.prec_value = element.getAttribute("value") || this.options[this.selectedIndex].value; 

	var drawGrid = function(){
		pen.save();	
		if(this.align=="vertical")
			pen.translate(-10*this.wv, 0);
		else
			pen.translate(0, -10*this.hh);
		pen.fillStyle="#333";
		pen.strokeStyle="#333";
		pen.font = 'normal bolder '
			+ ((this.align=='vertical')?this.width : this.height)*(1/8)+'px sans'
		if(this.align=="vertical"){
			for(var i in this.options){
				pen.beginPath();
				pen.moveTo(15*this.wv, coord_options[i]);
				pen.lineTo(25*this.wv, coord_options[i]);
				pen.closePath();
				pen.stroke();
				pen.fillText(this.options[i].inner,  28*this.wv, coord_options[i]+(this.width*(1/32)));
			}
		}else{
			pen.font='normal'+' '+'bolder'+' '+(this.height*(1/8))+'px'+' '+'sans';
			for(var i in this.options){
				pen.beginPath();
				pen.moveTo(coord_options[i], 15*this.hh);
				pen.lineTo(coord_options[i], 25*this.hh);
				pen.closePath();
				pen.stroke();
				pen.fillText(this.options[i].inner, coord_options[i]-pen.measureText(this.options[i].inner).width/2, 28*this.hh+(this.height*(1/8)));
			}
		}
		pen.restore();	
	}.bind(this);

	var index;
	var switchValue = function(){
		if(this.align=="vertical"){
			if(!this.topdown || this.topdown=="false")
				index = Math.round(((this.y_root+5*this.hv)-coord_options[0])/(inc));
			else
				index = Math.round((this.height-(this.y_root+5*this.hv)-coord_options[coord_options.length-1])/(inc));
			this.y_root = coord_options[index]-5*this.hv;
		}
		else{
			if(!this.topdown || this.topdown=="false")
				index = Math.round(((this.x_root+5*this.wh)-coord_options[0])/(inc));
			else
				index = Math.round((this.width-(this.x_root+5*this.wh)-coord_options[coord_options.length-1])/(inc));
			this.x_root = coord_options[index]-5*this.wh;
		}
		this.value = this.options[index].value;
	}.bind(this);

	this.up_func = switchValue;
	var move = false;
	this.move_func = function(){
		move = true;
	};

	this.render = function(){
		this.canvas.width = this.canvas.width;
		pen.save();
		if(this.align=="vertical"){
			pen.translate(this.width/2, 0);
			pen.shadowOffsetX = 1*this.wv;
			pen.shadowOffsetY = 1*this.hv;
			pen.shadowBlur = 2*this.hv;
		}else{	
			pen.translate(0, this.height/2);
			pen.shadowOffsetX = 1*this.wh;
			pen.shadowOffsetY = 1*this.hh;
			pen.shadowBlur = 2*this.wh;
		}
		pen.shadowColor = "#999";
		this.drawSlider();
		drawGrid();
		this.drawCursor();

		pen.restore();
	}

}
