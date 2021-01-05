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

function ToggleSwitch(element){

	ToggleSwitch.inherits(BinaryInput);
	BinaryInput.call(this, element);

	var pen = this.pen;
	if(this.width==null)
		this.width = 60;
	if(this.height==null)
		this.height = 60;
	this.hx = this.height/60;
	this.wx = this.width/60;		
	var main_grd, grd, grd2, grd3, grd4, grd5;
	var createGradients = function(){
		main_grd = pen.createLinearGradient(-this.width/6, -this.height/4, -this.width/6, this.height/4);
		main_grd.addColorStop(0, '#bbb');
		main_grd.addColorStop(0.5, '#eee');
		main_grd.addColorStop(1, '#bbb');
		grd = pen.createLinearGradient(-10*this.wx, 0, 15*this.wx, 0);
		grd.addColorStop(0, '#eee');
		grd.addColorStop(0.5, '#999');
		grd.addColorStop(1, '#444');
		grd2 = pen.createRadialGradient(-5*this.wx, -5*this.hx, 5*this.wx, 0, 0, 15*this.hx);
		grd2.addColorStop(0, '#ccc');
		grd2.addColorStop(0.9, '#777');
		grd3 = pen.createLinearGradient(-10*this.wx, 0, 15*this.wx, 0);
		grd3.addColorStop(0, '#eee');
		grd3.addColorStop(0.5, '#999');
		grd3.addColorStop(1, '#444');
		grd4 = pen.createRadialGradient(-5*this.wx, 3*this.hx, 5*this.hx, 0, 0, 15*this.hx);
		grd4.addColorStop(0, '#ccc');
		grd4.addColorStop(1, '#999');
		grd5 = pen.createLinearGradient(-10*this.wx, 0, 15*this.wx, 0);
		grd5.addColorStop(0, '#bbb');
		grd5.addColorStop(0.3, '#eee');
		grd5.addColorStop(1, '#222');
	}.bind(this);
	createGradients();

	var clickHandler = function(event){
		this.toggle();
	}.bind(this);


	if(this.canvas){
		var mousedown = function(event){if(event.button==0)clickHandler(event);};
		this.addEvents = function(){
			this.canvas.style.cursor = 'pointer';	
			attach(this.canvas, "mousedown", mousedown);
		}
		this.addEvents();
		this.removeEvents = function(){
			this.canvas.style.cursor="auto";
			detach(this.canvas, "mousedown", mousedown);
		}
	}

	var c1, c2, c3;
	var load = function(){
		c1 = document.createElement("canvas");
		c1.width = this.width;
		c1.height = this.height;
		var ctx1 = c1.getContext("2d");
		ctx1.translate(this.width/2, this.height/2);
		ctx1.fillStyle=grd;
		ctx1.strokeStyle="#777";
		ctx1.beginPath();
		ctx1.arc(0, 0, 5*this.hx, 0, Math.PI, true);
		ctx1.lineTo(-7*this.wx, Math.sin(Math.PI/180*135)*(20*this.hx)+5*this.hx);
		ctx1.arc(0, Math.sin(Math.PI/180*135)*(20*this.hx)+5*this.hx, 7*this.hx, 180*Math.PI/180, 0*Math.PI/180, true);
		ctx1.lineTo(7*this.wx, Math.sin(Math.PI/180*135)*(20*this.hx)+5*this.hx);
		ctx1.stroke();
		ctx1.closePath();
		ctx1.fill();
		ctx1.save();
		ctx1.translate(0, (parseFloat(Math.sin(Math.PI/180*135)*(20*this.hx))+parseFloat(5*this.hx)))
		ctx1.beginPath();
		ctx1.strokeStyle=grd3;
		ctx1.fillStyle=grd2;
		ctx1.arc(0, 0, 7*this.hx, 2*Math.PI, 0*Math.PI/180, true);
		ctx1.fill();
		ctx1.closePath();
		ctx1.restore();
		c2 = document.createElement("canvas");
		c2.width = this.width;
		c2.height = this.height;
		var ctx2 = c2.getContext("2d");
		ctx2.translate(this.width/2, this.height/2);
		ctx2.fillStyle=grd;
		ctx2.strokeStyle="#777";
		ctx2.beginPath();
		ctx2.arc(0, 0, 5*this.hx, 0*Math.PI/180, 180*Math.PI/180, false);
		ctx2.lineTo(-7*this.wx, Math.sin(Math.PI/180*225)*(30*this.hx)+5*this.hx+Math.sin(Math.PI/180*150)*(7*this.hx));
		ctx2.arc(0, Math.sin(Math.PI/180*225)*(30*this.hx)+5*this.hx, 7*this.hx, 180*Math.PI/180, 0*Math.PI/180, false);
		ctx2.closePath();
		ctx2.stroke();   	
		ctx2.fill();
		ctx2.beginPath();
		ctx2.fillStyle=grd4;
		ctx2.save();
		ctx2.translate(0, Math.sin(Math.PI/180*225)*(30*this.hx)+5*this.hx)
		ctx2.arc(0, 0, 7*this.hx, 0, 2*Math.PI/180, true);
		ctx2.fill();
		ctx2.closePath();
		ctx2.restore();
		c3 = document.createElement("canvas");
		c3.width = this.width;
		c3.height = this.height;
		var ctx3 = c3.getContext("2d");
		ctx3.translate(this.width/2, this.height/2);
		ctx3.beginPath();
		ctx3.fillStyle=grd5;
		ctx3.shadowOffsetX = 0;
		ctx3.shadowOffsetY = 0;
		ctx3.shadowColor = '#333';
		ctx3.shadowBlur = 2*this.hx;
		ctx3.arc(0, 0, 10*this.hx, 0, 2*Math.PI, false);
		ctx3.closePath();
		ctx3.fill();	
	}.bind(this);

	this.__defineSetter__("width", function(width){
		this._width = width;
		this.canvas.width=width;
		this.container.style.width = width+'px';
		this.wx = width/60;
		if(this.height && this.width){
			createGradients();
			load();
		}
	});
	
	this.__defineGetter__("width", function(){
		return this._width;
	 });

	this.__defineSetter__("height", function(height){
		this._height = this.width;
		if(height>this.width){
			this.canvas.height=height;
			this.container.style.height = height+'px';
		}else{
			this.canvas.height=this._height;
			this.container.style.height = this._height+'px';
		}
		this.hx = this._height/60;
		if(this.height && this.width){
			createGradients();
			load();
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
		
		pen.translate(this.width/2, this.height/2);
		pen.drawImage(c3, -this.width/2, -this.height/2);
		if(this.value==0){
			pen.drawImage(c1, -this.width/2, -this.height/2);
		}
		else{
			pen.drawImage(c2, -this.width/2, -this.height/2);
		}
		pen.restore();
	}
}

