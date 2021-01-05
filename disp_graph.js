function Graph(element){

	Graph.inherits(ScaleOutput);
	ScaleOutput.call(this, element);
	var canvas = new Array(3);
	canvas[0] = this.canvas;
	canvas[0].setAttribute("id", "first");
	canvas[0].style.display="block";
	canvas[1] = document.createElement("canvas");
	canvas[1].setAttribute("style", canvas[0].getAttribute("style"));
	canvas[1].setAttribute("id", "second");
	canvas[1].width = canvas[0].width;
	canvas[1].height = canvas[0].height;
	canvas[1].style.display="none";
	canvas[2] = document.createElement("canvas");
	canvas[2].setAttribute("style", canvas[0].getAttribute("style"));
	canvas[2].setAttribute("id", "third");
	canvas[2].width = canvas[0].width;
	canvas[2].height = canvas[0].height;
	canvas[2].style.display="block";
	canvas[2].style.zIndex="3";
	canvas[2].style.position="absolute";
	
	var pen = new Array(3);
	pen[0] = this.pen;
	pen[1] = canvas[1].getContext('2d');
	pen[2] = canvas[2].getContext('2d');

	this.container.appendChild(canvas[1]);
	this.container.appendChild(canvas[2]);

	var main_grd;
	var cindex=0;		
 	var on = 0;
	var standby = false;
	var resolution=1;
	if(this.width==null)
		this.width = 450;
	if(this.height==null)
		this.height = 300;

	this.createGradients = () => {
		main_grd = pen[cindex].createLinearGradient(-this.width, this.height/2, this.width, this.height/2);
		main_grd.addColorStop(0, '#bbb');
		main_grd.addColorStop(0.5, '#eee');
		main_grd.addColorStop(1, '#bbb');
	};

	this.drawGrid = () => {
		canvas[0].style.backgroundColor = this.bgcolor;
		canvas[1].style.backgroundColor = this.bgcolor;
		pen[2].strokeStyle = "black";
		pen[2].save();
		pen[2].fillStyle = main_grd;
		pen[2].fillRect(0, 0, 40*this.wx, this.height);
		pen[2].fillRect(0, 0, this.width, 10*this.hx);
		pen[2].fillRect(0, this.height-(10*this.hx), this.width, (10*this.hx));
		pen[2].fillRect(this.width-(40*this.wx), 0, 40*this.wx, this.height);
	
		pen[2].restore();

		pen[2].strokeStyle = "#555";
		pen[2].strokeRect(0, 0, this.width, this.height);
		var y2=0;
		var x2=0;
		for(var i=1; i<10; i++){
			pen[2].beginPath();
			if(i!=5 && !this.hide_divisions)
				pen[2].dashedLineTo(40*this.wx+i*(this.width-80*this.wx)/10, 10*this.hx, 40*this.wx+i*(this.width-80*this.wx)/10, this.height-10*this.hx);
			else if(i==5){
				if(!this.hide_axis){
					pen[2].moveTo(40*this.wx+i*(this.width-80*this.wx)/10, 10*this.hx);
					pen[2].lineTo(40*this.wx+i*(this.width-80*this.wx)/10, this.height-10*this.hx);
				}
			}
			pen[2].stroke();
			pen[2].closePath();
			pen[2].beginPath();
		}
		for(var i=1; i<8; i++){
			if(i!=4 && !this.hide_divisions)
				pen[2].dashedLineTo(40*this.wx, 10*this.hx+i*(this.height-20*this.hx)/8, this.width-40*this.wx, 10*this.hx+i*(this.height-20*this.hx)/8);
			else if(i==4){
				if(!this.hide_axis){
					pen[2].moveTo(40*this.wx, 10*this.hx+i*(this.height-20*this.hx)/8);
					pen[2].lineTo(this.width-40*this.wx, 10*this.hx+i*(this.height-20*this.hx)/8);
				}
			}
			pen[2].stroke();
			pen[2].closePath();
		}
		if(!this.hide_axis){		
			for(var i=1; i<40; i++){
				pen[2].beginPath();
				y2 = (this.height-(10*this.hx))-(this.height-(20*this.hx))*i/40;
				pen[2].moveTo(this.width/2-3*this.wx, y2);
				pen[2].lineTo(this.width/2+3*this.wx, y2);
				pen[2].closePath();
				pen[2].stroke();
				pen[2].beginPath();
				x2 = (this.width-(40*this.wx))-(this.width-(80*this.wx))*i/40;
				pen[2].moveTo(x2, this.height/2-3*this.hx);
				pen[2].lineTo(x2, this.height/2+3*this.hx);
				pen[2].closePath();
				pen[2].stroke();
			}
		}
		if(!this.hide_grid || this.hide_grid=="false"){
			var maxx = this.max_range.toString().length;
			var minn = this.min_range.toString().length;
			var font = ((maxx>5 || minn>5)?(8-((maxx>minn?maxx:minn)-4))*this.wx:8*this.wx);
			pen[2].font='normal'+' '+'bolder'+' '+font+'px'+' '+'sans';
			var precision = this.precision;
			for(var i=0; i<=this.divisions; i++){
				pen[2].beginPath();
				y2 = (this.height-(10*this.hx))-(this.height-(20*this.hx))*i/this.divisions;
				pen[2].moveTo(35*this.wx, y2);
				num = Math.round((this.min_range+(this.max_range-this.min_range)*i/this.divisions)*precision)/precision; 
				if(i%5==0){
					pen[2].save();
					pen[2].fillStyle="#333";
					pen[2].lineTo(26*this.wx, y2);
					pen[2].fillText(num, 25*this.wx-5*(num.toString().length>4?4:num.toString().length), y2+font/2);
					pen[2].restore();
	
				}
				else{
					pen[2].lineTo(30*this.wx, y2);
				}
				pen[2].closePath();
		
				pen[2].stroke();
			}
		}	
	};	

	Object.defineProperties (this, {
		'max_range': {
			set: (max_r) => {
				this._max_range = max_r;
				if(!first)
					drawGrid();		
			},
			get: () => {return this._max_range}
		},
		'min_range': {
			set: (min_r) => {
				this._min_range = min_r;
				if(!first)
					drawGrid();		
			},
			get: () => {return this._min_range}
		},
		'width': {
			set: (width) => {
				this._width = width;
				canvas[0].width=width;
				this.container.style.width = width+'px';
				this.wx = width/460;
				start = 40*this.wx;
				canvas[1].width = width;		
				canvas[2].width = width;
				this.createGradients();		
				this.drawGrid();
				for(var i in this.channel){
					var div = this.channel[i].divfactor;
					if(this.channel[i].point.length)
						this.channel[i].divfactor = (this.width-80*this.wx)/(10*this.channel[i].point.length);
					this.channel[i].sweep = div/this.channel[i].sweep;
				}
			},
			get: () => {return this._width}
		},
		'height': {
			set: (height) => {
				this._height = height;
				canvas[0].height=height;
				this.container.style.height = height+'px';
				this.hx = height/300;
				starty = 10*this.hx;
				canvas[1].height = height;
				canvas[2].height = height;
				this.createGradients();		
				this.drawGrid();		
			},
			get: () => {return this._height}
		}
	})

	this.wx = this.width/460;
	this.hx = this.width/300;
	var start = 40*this.wx;
	var starty = 10*this.hx;
	var c=0;
	var v=false;
	this.channel = new Array();
	this.divisions = element.getAttribute("hide_divisions") || 30;
	this.hide_divisions = element.getAttribute("hide_divisions")=="true" || false;
	this.hide_axis = element.getAttribute("hide_axis")=="true" || false;
	this.scale = element.getAttribute("scale") || "range";
	this.bgcolor = element.getAttribute("bgcolor") || "black";
	var power_on_load = element.getAttribute("power_onload")=="true" || false;
	this.setMode = function(m){
		switch(m){
			case "ch1":
				mode = 0;
				break;
			case "ch2":
				mode = 1;
				break;
			case "dual":
				mode = 2;
				break;
			case "x/y":
				mode = 3;
				break;
		}
		this.clearScreen();
		canvas[1-cindex].style.display="none";
		canvas[cindex].style.display="block";
	}

	this.on = function(){
		on = 1;
	}
	
	this.off = function(){
		on = 0;
		k=0;
		for(var i in this.channel){
			this.channel[i].reset();
				this.channel[i].end = false;
				this.channel[i].index=0;
		}	
		canvas[0].width = canvas[0].width;
		canvas[0].style.backgroundColor = '#000';
		canvas[1].width = canvas[1].width;
		canvas[1].style.backgroundColor = '#000';
		canvas[1-cindex].style.display="none";
		canvas[cindex].style.display="block";
	}

	this.isOn = function(){
		return on==1;
	}

	this.isOff = function(){
		return on==0;
	}


	this.clearScreen = function(){
		canvas[cindex].width = canvas[cindex].width;
		canvas[cindex].style.backgroundColor = this.bgcolor;
	}

	function Channel(id, obs, item){
		Object.defineProperties (this, {
			'amplitude': {
				set: (amp) => {
					this._amplitude = amp;
					v=true;
					obs.clearScreen();	
				},
				get: () => {return this._amplitude}
			},
			'amp4div': {
				set: (amp) =>{
					this._amp4div = amp;
					if(obs.scale=="divisions")
						this._amplitude = -(1/(8*amp));
					v=true;
					obs.clearScreen();		
				},
				get: () => {return this._amp4div}
			},
			'sweep': {
				set: (s) =>{
					this._sweep = (1/s)*((this.divfactor));
					v=true;
					obs.clearScreen();		
				},
				get: () => {return this._sweep}
			},
			'x_position': {
				set: (x) => {
					this._x_position = x;
					v=true;
					obs.clearScreen();		
				},
				get: () => {return this._x_position}
			},
			'y_position': {
				set: (y) => {
					this._y_position = y;
					v=true;
					obs.clearScreen();		
				},
				get: () => {return this._y_position}
			}
		});

		this.divfactor = 1;
		this.sweep = parseFloat(item.getAttribute("sweep")) || 1;
		
		this.reset = function(){
			this.refresh = start;
			this.end = true;
		}

		this.getPeakToPeak = function(){
			return peak*2;
		}

		this.getPeak = function(){
			return peak;
		}
		
		this.getAverage = function(){
			return average;
		}

		this.setPoints = function(p){
			peak = null;
			for(var i in p){
				if(p[i]>peak || !peak)
					peak = p[i];
				temp_average+=parseFloat(p[i]);
				this.point[i] = p[i];
			}
			var prec = obs.precision;
			average = Math.round(temp_average/p.length*prec)/prec;
			var div = this.divfactor;
			this.divfactor = (obs.width-80*obs.wx)/(10*this.point.length);
			this.sweep = div/this.sweep;

		}

		var peak = null;
		var average = 0;
		var temp_average = 0;
		this.frequency = parseFloat(item.getAttribute("frequency")) || 1;
		this.amplitude = parseFloat(item.getAttribute("amplitude")) || 1;
		this.amp4div = parseFloat(item.getAttribute("amp4div")) || 1;
		this.index = 0;
		this.y_position = parseFloat(item.getAttribute("y_position")) || 0;
		this.x_position = parseFloat(item.getAttribute("x_position")) || 0;
		this.point = new Array();
		this.prec_value=0;
		this.end=false;
		this.refresh = start; 
		this.color = item.getAttribute("color") || "lawngreen";
		this.href = item.getAttribute("href") || null;
		this.oncompletescreen = item.getAttribute("oncompletescreen") || "";
		this.ajax = new Ajax();
	}

	var z = 0;
	for(var i=0; i<element.childNodes.length; i++){
		if(element.childNodes[i].nodeName.toLowerCase()=="channel" && z<2){
			element.childNodes[i].style.display='none';
			this.channel[z] = new Channel(z, this, element.childNodes[i]);
			if(element.childNodes[i].innerHTML!='')
				this.channel[z].setPoints(JSON.parse(element.childNodes[i].innerHTML));
			z++;
		}
	}

	var first=true;
	var time = this.refresh;
	var k=0;
	var mode=0;
	var temp_mode = element.getAttribute("mode") || "ch1";
	switch(temp_mode){
		case "ch1":
			mode = 0;
			break;
		case "ch2":
			mode = 1;
			break;
		case "dual":
			mode = 2;
			break;
		case "x/y":
			mode = 3;
			break;
	}

	this.createGradients();
	
	var drawWaveXY = function(){
		if(on==0)
				return;
			pen[cindex].strokeStyle = this.channel[0].color;
			this.prec_value=this.channel[0].point[this.channel[0].index];
			this.value = this.channel[1].point[this.channel[1].index];
			if(k>420*this.wx){
				eval(this.channel[0].oncompletescreen);
				this.channel[0].reset();
				eval(this.channel[1].oncompletescreen);
				this.channel[1].reset();
			}
			var hvalue, xvalue;
			if(this.scale=="range"){
				hvalue =starty+this.channel[1].y_position+((this.max_range - (this.channel[1].point[this.channel[1].index]*this.channel[1].amplitude))*(this.height-(20*this.hx)))/(this.max_range-this.min_range);
				xvalue= start+this.channel[0].x_position+((this.max_range - (this.channel[0].point[this.channel[0].index]*this.channel[0].amplitude))*(this.height-(20*this.hx)))/(this.max_range-this.min_range);
			}
			else if(this.scale=="divisions"){
				hvalue =starty+(this.height-20*this.hx)/2+this.channel[1].y_position+(((this.channel[1].point[this.channel[1].index]*this.channel[1].amplitude))*(this.height-(20*this.hx)));
				xvalue= start+(this.width-80*this.wx)/2+this.channel[0].x_position+(((this.channel[0].point[this.channel[0].index]*this.channel[0].amplitude))*(this.height-(20*this.hx)));
			}			
	
			if(hvalue > (12*this.hx) && hvalue < (this.height-(23*this.hx))){
				pen[cindex].beginPath();
				pen[cindex].arc(xvalue, hvalue, 1, 0*Math.PI/180, 360 * Math.PI/180, false);
				pen[cindex].closePath();
				pen[cindex].stroke();
				pen[cindex].beginPath();
				pen[cindex].save();
				pen[cindex].lineWidth=2;
				if(this.scale=="range")
					pen[cindex].moveTo(start+this.channel[0].x_position+((this.max_range - (this.channel[0].point[this.channel[0].index-1]*this.channel[0].amplitude))*(this.height-(20*this.hx)))/(this.max_range-this.min_range), starty+this.channel[1].y_position+((this.max_range - (this.channel[1].prec_value*this.channel[1].amplitude))*(this.height-(20*this.hx)))/(this.max_range-this.min_range));
				else if(this.scale=="divisions")
					pen[cindex].moveTo(start+(this.width-80*this.wx)/2+this.channel[0].x_position+(((this.channel[0].point[this.channel[0].index-1]*this.channel[0].amplitude))*(this.height-(20*this.hx))), starty+(this.height-20*this.hx)/2+this.channel[1].y_position+(((this.channel[1].prec_value*this.channel[1].amplitude))*(this.height-(20*this.hx))));
	
				pen[cindex].lineTo(xvalue, hvalue);				
				pen[cindex].stroke();
				pen[cindex].closePath();
				pen[cindex].restore();
				this.channel[0].prec_value=this.channel[0].point[this.channel[0].index];
				this.channel[1].prec_value=this.channel[1].point[this.channel[1].index];
			}

			if(this.channel[0].point.length && this.channel[1].point.length){	
				this.channel[0].index=(this.channel[0].index+resolution)%this.channel[0].point.length;
				this.channel[1].index=(this.channel[1].index+resolution)%this.channel[1].point.length;
			}
			
	}.bind(this);
	var test="";
	var once = false;
	var drawWave = function(ch){
			if(on==0 || this.channel[ch].point[this.channel[ch].index]==undefined)
				return;
			this.prec_value=this.value;
			this.value = this.channel[ch].point[this.channel[ch].index];
			pen[cindex].strokeStyle = this.channel[ch].color;
			this.channel[ch].refresh = this.channel[ch].x_position+start+(this.channel[ch].sweep/this.channel[ch].frequency)*k;
			if(this.channel[ch].refresh>=420*this.wx){
				once = true;
				eval(this.channel[ch].oncompletescreen);
				this.channel[ch].reset();
			}
			var hvalue; 
			if(this.scale=="range")
				hvalue =starty+this.channel[ch].y_position+((this.max_range - (this.channel[ch].point[this.channel[ch].index]*this.channel[ch].amplitude))*(this.height-20*this.hx))/(this.max_range-this.min_range);
			else if(this.scale=="divisions")
				hvalue =starty+(this.height-20*this.hx)/2+this.channel[ch].y_position+(((this.channel[ch].point[this.channel[ch].index]*this.channel[ch].amplitude))*(this.height-20*this.hx));
			if(hvalue > (12*this.hx) && hvalue < (this.height-(12*this.hx)) && this.channel[ch].refresh>start && this.channel[ch].refresh<410*this.wx){
				pen[cindex].beginPath();
				pen[cindex].arc(this.channel[ch].refresh, hvalue, 1, 0*Math.PI/180, 360 * Math.PI/180, false);
				pen[cindex].closePath();
				pen[cindex].stroke();
				pen[cindex].beginPath();
				pen[cindex].save();
				pen[cindex].lineWidth=2;

				if((this.channel[ch].index-resolution)>0){
					if(this.scale=="range")
							pen[cindex].moveTo(this.channel[ch].x_position+start+((this.channel[ch].sweep/this.channel[ch].frequency)*(k-resolution)), starty+this.channel[ch].y_position+((this.max_range - (this.channel[ch].point[this.channel[ch].index-resolution]*this.channel[ch].amplitude))*(this.height-(20*this.hx)))/(this.max_range-this.min_range));
					else if(this.scale=="divisions")
							pen[cindex].moveTo(this.channel[ch].x_position+start+((this.channel[ch].sweep/this.channel[ch].frequency)*(k-resolution)), starty+(this.height-20*this.hx)/2+this.channel[ch].y_position+(((this.channel[ch].point[this.channel[ch].index-resolution]*this.channel[ch].amplitude))*(this.height-(20*this.hx))));
					pen[cindex].lineTo(this.channel[ch].x_position+start+(this.channel[ch].sweep/this.channel[ch].frequency)*k, hvalue);				
				}					
				pen[cindex].stroke();
				pen[cindex].closePath();
				pen[cindex].restore();
			}
			if(this.channel[ch].point.length)
				this.channel[ch].index=(this.channel[ch].index+resolution)%this.channel[ch].point.length;
	}.bind(this);

	this.max_range = parseFloat(element.getAttribute("max_range")) || 5;
	this.min_range = parseFloat(element.getAttribute("min_range")) || -5;
	this.value=this.prec_value=this.min_range || 0;
	this.width = this.canvas.width;
	this.height = this.canvas.height;


	var draw = function(){
		var check=true;
		this.scaleOutputCommonOperations();
		switch(mode){
			case 0:
				drawWave(0);
				check = this.channel[0].end;			
				break;
			case 1:
				drawWave(1);
				check = this.channel[1].end;			
				break;
			case 2:
				for(var i=0; i<this.channel.length; i++){
					drawWave(i);
					check = check && this.channel[i].end;
				}
				break;
			case 3:
				drawWaveXY();
				check = check && this.channel[0].end && this.channel[1].end;
				break;
		}
		if(check){
			k=0;
			cindex = 1 - cindex;
			v=false;
			this.clearScreen();
			canvas[cindex].style.display="none";
			canvas[1-cindex].style.display="block";
			for(var i=0; i<this.channel.length; i++){
				this.channel[i].end = false;
				this.channel[i].index=0;
			}
		}
		else
			k+=(resolution);
		
		if(on==1)
			setTimeout(draw, 10);		

	}.bind(this);

	
	this.render = function(){
		if(power_on_load)
			this.on();
		if(first==false && time>=this.refresh){
			if(this.channel[0] && this.channel[0].href!=null){
					this.channel[0].ajax.addCall("if(ajaxobj.responseText != '') "+element.id+".channel[0].setPoints(JSON.parse(ajaxobj.responseText));");
					this.channel[0].ajax.load(this.channel[0].href, null);
			}
			if(this.channel[1] && this.channel[1].href!=null){
					this.channel[1].ajax.addCall("if(ajaxobj.responseText != '') "+element.id+".channel[1].setPoints(JSON.parse(ajaxobj.responseText));");
					this.channel[1].ajax.load(this.channel[1].href, null);
			}
			time=0;
		}		
		if(!first && on){
			time+=0.1;
		}	
		if(on==1){
			first=false;
			draw();
		}

	
	}
}
