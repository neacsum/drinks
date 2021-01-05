function SevenSegmentsDisplay(element){

	SevenSegmentsDisplay.inherits(NumericOutput);
	NumericOutput.call(this, element);
	var numbers = {"0":"0111111","1":"0100001", "2":"1110110", "3":"1110011", "4":"1101001", "5":"1011011","6":"1011111", "7":"0110001","8":"1111111","9":"1111011"};
	var pen = this.pen;
	if(this.width==null)
		this.width = 100*this.cipher;		
	if(this.height==null)
		this.height = 50*this.cipher;
	var comma = null;
	var negative = false;
	var width = (this.width-20*this.width/150)/this.cipher;
	var height = this.height/this.cipher;
	var hx = height/75;
	var wx = width/100;
	var ht = this.height/30;
	var cx = width*1/3;

	var grd;
	var createGradients = function(){
		grd = pen.createLinearGradient(0, 0, 0, this.height);
		grd.addColorStop(0, '#bbb');
		grd.addColorStop(0.5, '#eee');
		grd.addColorStop(1, '#bbb');	
	}.bind(this);
	createGradients();

	this.__defineSetter__("width", function(w){
		this._width = w;
		this.canvas.width = w;
		this.container.style.width = w+'px';
		width = (w-20*this.width/150)/this.cipher;
		wx = width/100;
		cx = width*1/3;
	});

	this.__defineGetter__("width", function(){
		return this._width;
	});

	this.__defineSetter__("height", function(h){
		this._height = h;
		this.canvas.height = h;
		this.container.style.height = h+'px';
		height = h/this.cipher;
		hx = height/75; 
		ht = height/30;
		if(this.height)
			createGradients();
		});

	this.__defineGetter__("height", function(){
		return this._height;
	});

	this.__defineSetter__("color", function(color){
		if(color!="auto")
			this._color = color;
		else
			this._color = '#333';
	});	

	this.__defineGetter__("color", function(){
		return this._color;
	});

	this.__defineSetter__("bgcolor", function(bgcolor){
		if(bgcolor!="auto")
			this._bgcolor = bgcolor;
		else
			this._bgcolor = grd;
	});

	this.__defineGetter__("bgcolor", function(){
		return this._bgcolor;
	});

	this.__defineSetter__("cipher", function(cipher){
		this._cipher = cipher;
		width = (this.width-20*this.width/150)/cipher;
		height = this.height/cipher;
		wx = width/100;
		hx = height/75; 
		cx = width*1/3;
	});

	this.__defineGetter__("cipher", function(){
		return this._cipher;
	});

	this.bgcolor = element.getAttribute("bgcolor") || grd;
	this.color = element.getAttribute("color") || "#333";
	this.cipher=parseInt(element.getAttribute('cipher')) || 2;

	var lightLed =function(num, index){
		if(numbers[num][index]==1){
			pen.fillStyle=this.color;
		}
		else
			pen.fillStyle="transparent";
	}.bind(this);

	this.width = this.canvas.width;
	this.height = this.canvas.height;
	var writeCipher = function(num, c){

		var cip = 40*this.width/150+width*c;
		pen.save();		
		pen.translate(cip/2, this.height/2);
		if((c-1)/2==comma-1){
			pen.beginPath();
			pen.fillStyle=this.color;
			pen.arc(width/2, width/10+cx, height/10, (Math.PI/180)*0, (Math.PI/180)*360, false);
			pen.fill();		
			pen.closePath();
		}				
		pen.beginPath();
		lightLed(num, 0);
		pen.moveTo(-width/4+(2*wx), 0);
		pen.lineTo(-width/6+(2*wx), -ht);
		pen.lineTo(width/6+(2*wx), -ht);
		pen.lineTo(width/4+(2*wx), 0);
		pen.lineTo(width/6+(2*wx), ht);
		pen.lineTo(-width/6+(2*wx), ht);
		pen.lineTo(-width/4+(2*wx), 0);
		pen.fill();
		pen.closePath();
		pen.beginPath();
		lightLed(num,1);
		pen.moveTo(width/4, (-2*hx));
		pen.lineTo(width/6+(2*wx), (-2*hx)-ht);
		pen.lineTo(width/6+(4*wx), (-2*hx)-ht-cx);
		pen.lineTo(width/4+(4*wx), (-2*hx)-2*ht-cx);
		pen.lineTo(width/4+(2*wx), (-2*hx));
		pen.fill();
		pen.closePath();
		pen.beginPath();
		lightLed(num, 2);
		pen.moveTo(width/4+(4*wx), (-4*hx)-2*ht-cx);
		pen.lineTo(width/6+(4*wx), (-4*hx)-ht-cx);
		pen.lineTo(-width/6+(4*wx), (-4*hx)-ht-cx);
		pen.lineTo(-width/4+(4*wx), (-6*hx)-2*ht-cx);
		pen.lineTo(width/4+(4*wx), (-6*hx)-2*ht-cx);
		pen.fill();
		pen.closePath();
		pen.beginPath();
		lightLed(num, 3);
		pen.moveTo(-width/4+(4*wx), (-2*hx)-2*ht-cx);
		pen.lineTo(-width/6+(4*wx), (-2*hx)-ht-cx);
		pen.lineTo(-width/6+(2*wx), (-2*hx)-ht);
		pen.lineTo(-width/4+(2*wx), (-2*hx));
		pen.lineTo(-width/4+(4*wx), (-2*hx)-2*ht-cx);
		pen.fill();
		pen.closePath();
		pen.beginPath();
		lightLed(num, 4);
		pen.moveTo(-width/4, (2*hx)+2*ht+cx);
		pen.lineTo(-width/6, (2*hx)+ht+cx);
		pen.lineTo(-width/6+(2*wx), (2*hx)+ht);
		pen.lineTo(-width/4+(2*wx), (2*hx));
		pen.lineTo(-width/4, (2*hx)+2*ht+cx);
		pen.fill();
		pen.closePath();
		pen.beginPath();
		lightLed(num, 5);
		pen.moveTo(width/4, (6*hx)+2*ht+cx);
		pen.lineTo(width/6, (4*hx)+ht+cx);
		pen.lineTo(-width/6, (4*hx)+ht+cx);
		pen.lineTo(-width/4, (6*hx)+2*ht+cx);
		pen.lineTo(width/4, (6*hx)+2*ht+cx);
		pen.fill();
		pen.closePath();
		pen.beginPath();
		lightLed(num, 6);
		pen.moveTo(width/4, (2*hx));
		pen.lineTo(width/6+(2*wx), (2*hx)+ht);
		pen.lineTo(width/6, (2*hx)+ht+cx);
		pen.lineTo(width/4, (2*hx)+2*ht+cx);
		pen.lineTo(width/4+(2*wx), (2*hx));
		pen.fill();
		pen.closePath();


 		pen.restore();		
		
	}.bind(this);

	this.render = function(){
		this.canvas.width = this.canvas.width;
		this.numericOutputCommonOperations();
		pen.fillStyle=this.bgcolor;
		pen.fillRect(0, 0, this.width, this.height);
		pen.lineWidth=1*this.width/60;
		pen.strokeStyle="gray";
		pen.strokeRect(0, 0, this.width, this.height);
		var o = this.splitComma();
		var s = o["string"];
		comma = o["comma"]; 
		negative = o["negative"];
		if(negative){
			pen.strokeStyle="#333";
			pen.beginPath();
			pen.moveTo(10*this.width/150, this.height/2);
			pen.lineTo(20*this.width/150, this.height/2);
			pen.closePath();
			pen.stroke();	
		}
		for(var i=0; i<s.length; i++){
			writeCipher(s[i], 2*i+1);
		}
	}
}
