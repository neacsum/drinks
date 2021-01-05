
function ArcLed(element){
	ArcLed.inherits(Instrument);
	Instrument.call(this, element);
	
	if (this.width == null) 
		this.width = 70;
	if (this.height == null)
	 this.height = 70;
	var wx = this.width/70;
	var hx = this.height/70;

	var parent_id = element.id || "";
	var style = element.getAttribute("style") || "";	
	var onchange = element.getAttribute("onchange") || "";
	var rotate = element.getAttribute("rotate") || "270";
	var color = element.getAttribute("color") || "lawngreen";
	
	var swel = drinks.createElement("switch");	
	swel.setAttribute("id", parent_id+'sw');
	swel.setAttribute("type", "arc");
	swel.setAttribute("style", style);
	swel.setAttribute("onchange", onchange);
	swel.setAttribute("rotate", "270");
	swel.setAttribute("width", this.width);
	swel.setAttribute("height", this.height);
	this.appendChild(swel);
	var led = drinks.createElement("led");	
	led.setAttribute("id", parent_id+"led");
	led.setAttribute("color", color);
	led.setAttribute("type", "triangle");
	led.setAttribute("width", (20*this.width/70).toString());
	led.setAttribute("height", (20*this.height/70).toString());
	led.setAttribute("x", (45*wx).toString());
	led.setAttribute("y", (25*wx));
	led.setAttribute("rotate", "90");
	led.setAttribute("link", "true");
	this.inner[0].appendChild(led);
	
	this.on = function(){
		this.inner[0].value=1;
	}

	this.off = function(){
		this.inner[0].value=0;
	}

	this.render = function(){
		this.instrumentCommonOperations();
		
	}
}
