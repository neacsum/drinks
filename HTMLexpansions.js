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

function HTMLExpansions(element){
  HTMLExpansions.inherits(Widget);
	Widget.call(this, element);

	this.HTMLExpansionsCommonOperations = function(){
		this.widgetCommonOperations();
	}
}


function Box(element){
	Box.inherits(HTMLExpansions);
	HTMLExpansions.call(this, element);
	this.canvas=document.createElement("div");
	this.appendToContainer(this.canvas);

	this.canvas.instrument=this;

	this.__defineSetter__("width", function(width){
		this._width = width;
		this.container.style.width = this.width+'px';
		this.canvas.style.width = this.width+'px';
		this.html.style.width = this.width+'px';
		this.html.setAttribute("width", this.width);		
	});

	this.__defineGetter__("width", function(){
		return this._width;
	});

	this.width=parseFloat(element.getAttribute("width")) || element.style.width.replace("px","") || null;

	this.__defineSetter__("height", function(height){
		this._height = height;
		this.container.style.height = this.height+'px';
		this.canvas.style.height = this.height+'px';
		this.html.style.height = this.height+'px';
		this.html.setAttribute("height", this.height);		
	});

	this.__defineGetter__("height", function(){
		return this._height;
	});

	this.height=parseFloat(element.getAttribute("height")) || element.style.height.replace("px","") || null;

	this.__defineSetter__("boxstyle", function(boxstyle){
		this._boxstyle = boxstyle;
		if(this.html.getAttribute("boxstyle")!=boxstyle)
			this.html.setAttribute("boxstyle", boxstyle);
		this.canvas.setAttribute("style", boxstyle);
		this.canvas.style.float="left";
	});

	this.__defineGetter__("boxstyle", function(){
		return this._boxstyle;
	});
	this.boxstyle=element.getAttribute("boxstyle");

	this.__defineSetter__("background", function(background){
		this._background = background;
		if(background){
			if(background.indexOf("url")!=-1){
				this.canvas.style.backgroundImage=background;
				this.canvas.style.backgroundColor="transparent";
				this.canvas.style.backgroundRepeat="no-repeat";
				this.canvas.style.backgroundSize="100%";
			}
			else{
				this.canvas.style.backgroundColor=background;
				this.canvas.style.backgroundImage="none";
			}
			this.boxstyle=this.canvas.getAttribute("style");
		}
	});

	this.__defineGetter__("background", function(){
		return this._background;
	});
	this.background=element.getAttribute("background");

	this.__defineGetter__("style", function(){
		return this.canvas.style;
	});
	

	this.__defineSetter__("innerHTML", function(innerHTML){
		this._innerHTML = innerHTML;
		this.canvas.innerHTML = innerHTML;
	});

	this.__defineGetter__("innerHTML", function(){
		return this._innerHTML;
	});
	this.innerHTML = element.getAttribute("innerHTML");

	this.render = function(){
		this.HTMLExpansionsCommonOperations();	
	}
}

function TextBox(element){
	TextBox.inherits(HTMLExpansions);
	HTMLExpansions.call(this, element);
	
	this.canvas=document.createElement("input");
	this.appendToContainer(this.canvas);

	this.canvas.instrument=this;

	this.__defineSetter__("width", function(width){
		this._width = width;
		this.container.style.width = this.width+'px';
		this.canvas.style.width = this.width+'px';
		this.html.style.width = this.width+'px';
		this.html.setAttribute("width", this.width);		
	});

	this.__defineGetter__("width", function(){
		return this._width;
	});
	
	this.width=parseFloat(element.getAttribute("width")) || element.style.width.replace("px","") || null;	

	this.__defineSetter__("height", function(height){
		this._height = height;
		this.container.style.height = this.height+'px';
		this.canvas.style.height = this.height+'px';
		this.html.style.height = this.height+'px';
		this.html.setAttribute("height", this.height);		
	});

	this.__defineGetter__("height", function(){
		return this._height;
	});

	this.height=parseFloat(element.getAttribute("height")) || element.style.height.replace("px","") || null;

	this.__defineSetter__("boxstyle", function(boxstyle){
		this._boxstyle = boxstyle;
		this.canvas.setAttribute("style", boxstyle);
		this.canvas.style.float="left";
	});

	this.__defineGetter__("boxstyle", function(){
		return this._boxstyle;
	});
	this.boxstyle=element.getAttribute("boxstyle");

	this.__defineGetter__("style", function(){
		return this.canvas.style;
	});

	this.__defineSetter__("value", function(value){
		this._value = value;
		this.canvas.value = value;
	});

	this.__defineGetter__("value", function(){
		return this._value;
	});

	this.value=element.getAttribute("value");

	this.__defineSetter__("placeholder", function(placeholder){
		this._placeholder = placeholder;
		this.canvas.placeholder = placeholder;
	});

	this.__defineGetter__("placeholder", function(){
		return this._placeholder;
	});

	this.placeholder=element.getAttribute("placeholder");

	this.render = function(){
		this.HTMLExpansionsCommonOperations();	
	}
}

function ComboBox(element){
	ComboBox.inherits(HTMLExpansions);
	HTMLExpansions.call(this, element);
	ComboBox.inherits(Digital);
	Digital.call(this, element);
	
	this.canvas=document.createElement("select");
	this.appendToContainer(this.canvas);

	this.canvas.instrument=this;
	this.canvas.onclick=function(event){ResizeDrag(event);}.bind(this);
	this.loadOptions(this.canvas);

	var mousedown = this.canvas.onmousedown; 
	var removeEvents = function(){
		attach(this.canvas, "mousedown", function(){return false;});
	}.bind(this);

	var addEvents = function(){
		attach(this.canvas, "mousedown", mousedown);
	}.bind(this);

	this.disableEvents = function(){
		removeEvents();
	}

	this.enableEvents = function(){
		addEvents();
	}

	this.__defineSetter__("width", function(width){
		this._width = width;
		this.container.style.width = this.width+'px';
		this.canvas.style.width = this.width+'px';
		this.html.style.width = this.width+'px';
		this.html.setAttribute("width", this.width);		
	});

	this.__defineGetter__("width", function(){
		return this._width;
	});
	
	this.width=parseFloat(element.getAttribute("width")) || element.style.width.replace("px","") || null;	

	this.__defineSetter__("height", function(height){
		this._height = height;
		this.container.style.height = this.height+'px';
		this.canvas.style.height = this.height+'px';
		this.html.style.height = this.height+'px';
		this.html.setAttribute("height", this.height);		
	});

	this.__defineGetter__("height", function(){
		return this._height;
	});

	this.height=parseFloat(element.getAttribute("height")) || element.style.height.replace("px","") || null;

	this.__defineSetter__("boxstyle", function(boxstyle){
		this._boxstyle = boxstyle;
		this.canvas.setAttribute("style", boxstyle);
		this.canvas.style.float="left";
	});

	this.__defineGetter__("boxstyle", function(){
		return this._boxstyle;
	});
	this.boxstyle=element.getAttribute("boxstyle");

	this.__defineGetter__("style", function(){
		return this.canvas.style;
	});

	this.__defineSetter__("value", function(value){
		this._value = value;
		for(var i in this.canvas.options){
			if(this.canvas.options[i].value==value){
				this.canvas.selectedIndex=i;
				this.selectedIndex = i;
			}
		}
	});

	this.__defineGetter__("value", function(){
		return this._value;
	});

	this.value=element.getAttribute("value");

	this.render = function(){
		this.HTMLExpansionsCommonOperations();	
		this.canvas.selectedIndex = this.selectedIndex;
	}
}


function Button(element){
	Button.inherits(HTMLExpansions);
	HTMLExpansions.call(this, element);
	
	this.canvas=document.createElement("input");
	this.canvas.setAttribute("type", "button");
	this.appendToContainer(this.canvas);

	this.canvas.instrument=this;

	var mousedown = this.canvas.onmousedown; 
	var removeEvents = function(){
		attach(this.canvas, "mousedown", function(){return false;});
	}.bind(this);

	var addEvents = function(){
		attach(this.canvas, "mousedown", mousedown);
	}.bind(this);

	this.disableEvents = function(){
		removeEvents();
	}

	this.enableEvents = function(){
		addEvents();
	}

	this.__defineSetter__("width", function(width){
		this._width = width;
		this.container.style.width = this.width+'px';
		this.canvas.style.width = this.width+'px';
		this.html.style.width = this.width+'px';
		this.html.setAttribute("width", this.width);		
	});

	this.__defineGetter__("width", function(){
		return this._width;
	});
	
	this.width=parseFloat(element.getAttribute("width")) || element.style.width.replace("px","") || null;	

	this.__defineSetter__("height", function(height){
		this._height = height;
		this.container.style.height = this.height+'px';
		this.canvas.style.height = this.height+'px';
		this.html.style.height = this.height+'px';
		this.html.setAttribute("height", this.height);		
	});

	this.__defineGetter__("height", function(){
		return this._height;
	});

	this.height=parseFloat(element.getAttribute("height")) || element.style.height.replace("px","") || null;

	this.__defineSetter__("boxstyle", function(boxstyle){
		this._boxstyle = boxstyle;
		this.canvas.setAttribute("style", boxstyle);
		this.canvas.style.float="left";
	});

	this.__defineGetter__("boxstyle", function(){
		return this._boxstyle;
	});
	this.boxstyle=element.getAttribute("boxstyle");

	this.__defineGetter__("style", function(){
		return this.canvas.style;
	});

	this.__defineSetter__("value", function(value){
		this._value = value;
		this.canvas.value = value;
	});

	this.__defineGetter__("value", function(){
		return this._value;
	});

	this.value=element.getAttribute("value");

	this.render = function(){
		this.HTMLExpansionsCommonOperations();	
	}
}

//popip e dialog
function Popip(element){
	this.popit_pos = 0;
	Popip.inherits(HTMLExpansions);
	HTMLExpansions.call(this, element);
	
	this.canvas=document.createElement("DIV");
	this.appendToContainer(this.canvas);

	this.canvas.instrument=this;

	this.__defineSetter__("width", function(width){
		this._width = width;
		this.container.style.width = this.width+'px';
		this.canvas.style.width = this.width+'px';
		this.html.style.width = this.width+'px';
		this.html.setAttribute("width", this.width);		
	});

	this.__defineGetter__("width", function(){
		return this._width;
	});
	
	this.width=parseFloat(element.getAttribute("width")) || element.style.width.replace("px","") || null;	

	this.__defineSetter__("height", function(height){
		this._height = height;
		this.container.style.height = this.height+'px';
		this.canvas.style.height = this.height+'px';
		this.html.style.height = this.height+'px';
		this.html.setAttribute("height", this.height);		
	});

	this.__defineGetter__("height", function(){
		return this._height;
	});

	this.height=parseFloat(element.getAttribute("height")) || element.style.height.replace("px","") || null;

	this.__defineGetter__("style", function(){
		return this.canvas.style;
	});

	this.__defineSetter__("value", function(value){
		this._value = value;
		this.canvas.value = value;
	});

	this.__defineGetter__("value", function(){
		return this._value;
	});

	this.value=element.getAttribute("value");

	this.show = function(msg, el){
		if(msg == '' && el.style.opacity == '0'){el.style.top='-100px'; popit_pos -= 60; return;}
	
		if(el.style.opacity == '0' || el.style.opacity == ''){
			el.style.opacity='1';
			el.style.top=(100+popit_pos)+'px';
			popit_pos += 60;
			setTimeout(this.show, 5000, '', el);
		} else {
			el.style.opacity='0';
			setTimeout(this.show, 1000, '', el);
		}
	
		el.innerHTML = msg;
	}

	this.render = function(){
		this.HTMLExpansionsCommonOperations();
	}
}
