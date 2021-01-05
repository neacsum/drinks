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
function Gauge(element){

	Gauge.inherits(ScaleOutput);
	ScaleOutput.call(this, element);
	//radius of the element
	var pen = this.pen;
	this.radius = element.getAttribute("radius") || 100;
	this.rx = this.radius/100;
	this.height = this.radius*2;

	var main_grd, grd, grd_text, grd2, grd3;
	var createGradients = function(){
		main_grd = pen.createLinearGradient(-(this.radius-18*this.rx)/2, -(this.radius-18*this.rx)/2, (this.radius-18*this.rx)/2, 0);
		main_grd.addColorStop(0, '#bbb');
		main_grd.addColorStop(0.5, '#eee');
		main_grd.addColorStop(1, '#bbb');
		grd2 = pen.createRadialGradient(0, 0, this.radius-18*this.rx, 0, 0, this.radius-8*this.rx);
		grd2.addColorStop(0, '#eee');
		grd2.addColorStop(0.1, '#bbb');
		grd2.addColorStop(1, '#eee');
		grd3 = pen.createRadialGradient(0, 0, this.radius-18*this.rx, 0, 0, this.radius-3*this.rx);
		grd3.addColorStop(0, '#bbb');
		grd3.addColorStop(0.1, '#555');
		grd3.addColorStop(1, '#bbb');
		grd = pen.createRadialGradient(-(3*this.rx),-(7.5*this.rx), 0, (3*this.rx), (7.5*this.rx), 50*this.rx);
		grd.addColorStop(0, '#aaa');
		grd.addColorStop(0.4, 'black');
		grd_text = pen.createLinearGradient(-pen.measureText(this.text).width, -pen.measureText(this.text).width, pen.measureText(this.text).width, 0);
		grd_text.addColorStop(0, '#333');
		grd_text.addColorStop(0.5, '#777');
		grd_text.addColorStop(1, '#333');
	}.bind(this);
	createGradients();
	this.divisions = element.getAttribute("divisions") || 100;
	this.dx = 270/this.divisions;
	var precision = this.precision;
	this.color = element.getAttribute("color") || "red";
	

	this.drawRange = function(){
		if(this.range_from!=null && this.range_to!=null && this.range_from>=this.min_range && this.range_to<=this.max_range){
			pen.save();
			pen.strokeStyle="rgba(255, 0, 0 , 0.5)";
			pen.lineWidth=10*this.rx;
			pen.beginPath();
			var range_min_position = (parseFloat(this.range_from)-this.min_range)*this.divisions/(this.max_range-this.min_range);
			var range_max_position = (parseFloat(this.range_to)-this.min_range)*this.divisions/(this.max_range-this.min_range);
			pen.arc(0, 0, 42*this.rx, (3*Math.PI/4)+range_min_position * (this.dx)*Math.PI / 180, (3*Math.PI/4)+range_max_position * (this.dx)*Math.PI / 180, false);
			pen.stroke();
			pen.closePath();
			pen.restore();
		}	
	}

	this.drawGrid = function(){
		var i, inset;
		var num;
		var divfactor = 100/this.divisions>1?1:100/this.divisions;
		pen.font='italic'+' '+'bolder'+' '+(this.radius/(10)*(divfactor))+'px'+' '+'sans';
		precision = this.precision;
		for(var i = 0; i <= this.divisions; i++){
			var cosfact = Math.cos((-Math.PI/4)+i*this.dx*Math.PI / 180);
			var sinfact = Math.sin((-Math.PI/4)+i*this.dx*Math.PI / 180);
			if(i%5==0 || this.divisions/10<1){
				if(i%10==0 || this.divisions/10<1){
				        inset = 10 * this.rx;
					pen.lineWidth=1.5 * this.rx * divfactor;
					pen.fillStyle=this.color;
					num = Math.round((this.min_range+(this.max_range-this.min_range)*i/this.divisions)*precision)/precision; 
					pen.fillText(num,-(4*(this.radius-18*this.rx)/5-pen.measureText(num).width/4) * cosfact - pen.measureText(num).width/2, -(4*(this.radius-18*this.rx)/5) * sinfact + ((this.radius-18*this.rx)/(20*this.dx)*divfactor));
				} else {
					inset = 8 * this.rx;
		       			pen.lineWidth= 1 * this.rx * divfactor;
				}
			} else {
		        	inset = 5 * this.rx;
		       		pen.lineWidth=0.5 * this.rx * divfactor;
	       		}

			pen.strokeStyle='black';			
			pen.beginPath();
			pen.moveTo(((this.radius-18*this.rx) - inset) * cosfact, -((this.radius-18*this.rx) - inset) * sinfact);
			pen.lineTo((this.radius-18*this.rx) * cosfact, -(this.radius-18*this.rx) * sinfact);
	 	      	pen.stroke();
			pen.closePath();       	
		}
	}

	this.drawValue = function(){
		var x1 = Math.cos ((-Math.PI*7/20)+this.prec_position * this.dx * Math.PI / 180);
		var y1 = Math.sin ((-Math.PI*7/20)+this.prec_position * this.dx * Math.PI / 180);
		var x2 = Math.cos ((-Math.PI*3/20)+this.prec_position * this.dx *Math.PI / 180);
		var y2 = Math.sin ((-Math.PI*3/20)+this.prec_position * this.dx *Math.PI / 180);
		var grd_val = pen.createLinearGradient(-((this.radius-18*this.rx)/2) * x1, -((this.radius-18*this.rx)/2) * y1,-((this.radius-18*this.rx)/2) * x2, -((this.radius-18*this.rx)/2) * y2);
		pen.shadowOffsetX = 2*this.rx;
		pen.shadowOffsetY = 2*this.rx;
		pen.shadowColor = "#999";
		pen.shadowBlur = 3*this.rx;
		grd_val.addColorStop(0, 'white');
		grd_val.addColorStop(1, this.color);
		pen.fillStyle=grd_val;
		pen.strokeStyle="#777";
		pen.moveTo(-12*this.rx*x1, -12*this.rx* y1);		
		pen.lineTo(-(72*this.rx) * Math.cos ((-Math.PI/4)+this.prec_position * (this.dx)*Math.PI / 180),-(72*this.rx) * Math.sin ((-Math.PI/4)+this.prec_position * (this.dx)*Math.PI / 180));
		pen.lineTo(-12*this.rx*x2, -12*this.rx* y2);
		pen.stroke();
		pen.fill();	
		pen.closePath();
		pen.fillStyle=grd;
		pen.beginPath();
		pen.arc(0, 0, 12*this.rx, (Math.PI/180)*0, (Math.PI/180)*360, false);
		pen.closePath();
		pen.fill();
	}

	this.__defineSetter__("radius", function(radius){
		this._radius = radius;
		this.rx = radius/100;
		this.height = radius*2;
		this.width = radius*2;
		if(this.radius)
			createGradients();
	});

	this.__defineGetter__("radius", function(){
		return this._radius;
	 });

	this.__defineSetter__("divisions", function(divisions){
		this._divisions = divisions;
		this.dx = 270/this.divisions;
		precision = this.precision;
	});

	this.__defineGetter__("divisions", function(){
		return this._divisions;
	 });

	this.radius=parseInt(element.getAttribute("radius")) || 100;
	this.divisions = element.getAttribute("divisions") || 100;

	
	this.render = function(){
		this.scaleOutputCommonOperations();
		pen.save();
		pen.translate(this.radius, this.radius);
		pen.beginPath();
		pen.fillStyle=grd3;
		pen.shadowOffsetX = 0;
		pen.shadowOffsetY = 0;
		pen.shadowColor = "#999";
		pen.shadowBlur = 3*this.rx;
		pen.strokeStyle="#aaa";
		pen.arc(0, 0, this.radius-2*this.rx, (Math.PI/180)*360, (Math.PI/180)*0, false);
		pen.closePath();
		pen.stroke();
		pen.fill();
		pen.shadowColor = "transparent";
		pen.beginPath();
		pen.fillStyle=grd2;
		pen.strokeStyle="#777";
		pen.arc(0, 0, this.radius-9*this.rx, (Math.PI/180)*360, (Math.PI/180)*0, false);
		pen.closePath();
		pen.fill();
		pen.stroke();
		pen.strokeStyle=grd2;
		pen.beginPath();
		pen.fillStyle=main_grd;
		pen.arc(0, 0, this.radius-18*this.rx, (Math.PI/180)*360, (Math.PI/180)*0, false);
		pen.closePath();
		pen.fill();
		pen.stroke();
		if(!this.hide_grid || this.hide_grid=="false")
			this.drawGrid();
		this.drawRange();
		pen.fillStyle=grd_text;
		pen.font='italic'+'  '+20*this.rx+'px'+' '+'sans';
		if(pen.measureText(this.text).width>2/3*(this.radius-18*this.rx))
			pen.font='italic'+'  '+(3/2*(this.radius-18*this.rx))/this.text.length+'px'+' '+'sans';
		pen.fillText(this.text, -pen.measureText(this.text).width/2, -(this.radius-18*this.rx)/3);
		pen.beginPath();
		pen.strokeStyle='rgba(255, 0, 0, 0.7)';
		pen.lineWidth=1;
		pen.fillStyle="red";
		this.drawValue();
		pen.restore();
	}
}
