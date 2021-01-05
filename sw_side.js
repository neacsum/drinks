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

function SideSwitch(element){

	SideSwitch.inherits(MoveInput);
	MoveInput.call(this, element);

	this.make_binary ();
	var pen = this.pen;
	if(this.width==null)
		this.width = 100;
	if(this.height==null)
		this.height = 50;
	this.hx = this.height/50;
	this.wx = this.width/100;

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
			this.x_root=2*this.wx;
			this.off();
		}
		if(this.x_root>=this.width/2){
			this.x_root=this.width-4*this.wx;
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
			this.x_root = this.width-4*this.wx-this.width/4;
		else
			this.x_root = 2*this.wx+this.width/4;
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

	this.up_func = switchValue;
	this.value = element.getAttribute("value")!=null?parseFloat(element.getAttribute("value")):(parseFloat(element.getAttribute("min_range")) || 0);
	this.render = function(){
		this.instrumentCommonOperations ();		
		pen.save();
		pen.translate(this.width/2, this.height/2);
		pen.restore();
		pen.beginPath();
		pen.lineWidth=3*this.wx;
		pen.strokeStyle=grd3;
		pen.roundRect(2*this.wx, 2*this.hx, this.width-4*this.wx, this.height-4*this.hx, 10*this.wx);
		pen.fillStyle=grd2;
		pen.stroke();
		pen.fill();
		pen.lineWidth=1*this.wx;
		pen.save();
		pen.translate(-this.width/4, 0);
		if(this.x_root<this.width/4)
			this.x_root=2*this.wx+this.width/4;
		if(this.x_root>3*this.width/4)
			this.x_root=this.width-4*this.wx-this.width/4;
		pen.fillStyle=grd;
		pen.roundRect(this.x_root, 1*this.hx, this.width/2, this.height-3*this.hx, 5*this.wx);
		pen.shadowOffsetX = 0;
		pen.shadowOffsetY = 0;
		pen.shadowColor = '#777';
		pen.shadowBlur = 5*this.wx;
		pen.strokeStyle="#333";
		pen.stroke();
		pen.fill();
		pen.restore();
		pen.save();
		pen.translate(this.x_root, this.height/2);
		pen.fillStyle=grd4;
		pen.shadowOffsetX = 0;
		pen.shadowOffsetY = 0;
		pen.shadowColor = "#555";
		pen.shadowBlur = 1*this.wx;
		pen.beginPath();
		pen.moveTo(-2*this.wx, -5*this.hx);
		pen.lineTo(-12*this.wx, 0);
		pen.lineTo(-2*this.wx, 5*this.hx);
		pen.closePath();
		pen.stroke();
		pen.fill();
		pen.beginPath();
		pen.moveTo(2*this.wx, -5*this.hx);
		pen.lineTo(12*this.wx, 0);
		pen.lineTo(2*this.wx, 5*this.hx);
		pen.closePath();
		pen.stroke();
		pen.fill();
		pen.restore();
	}
}

