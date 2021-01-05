function GaugeAdv(element){
	GaugeAdv.inherits(Instrument);
	Instrument.call(this, element);
	var radius = element.getAttribute("radius") || 100;
	var rx = radius/100;
	this.width = radius*2;
	this.height = radius*2;

	var style = element.getAttribute("style") || ""; 
	var led_color = element.getAttribute("led_color") || ""; 
	var max_range = element.getAttribute("max_range") || 100; 
	var min_range = element.getAttribute("min_range") || 0; 
	var range_from = element.getAttribute("range_from") || "";
	var range_to = element.getAttribute("range_to") || "";
	var parent_id = element.getAttribute("id") || "";
	var cipher = element.getAttribute("cipher") || "";
	var significative = element.getAttribute("significative") || "";
	var onalert = element.getAttribute("onalert") || "this.inner[1].on();";
	var onleavealert = element.getAttribute("onleavealert") || "this.inner[1].off();";
	var text = element.getAttribute("text") || "";
	var resizable = element.getAttribute("resizable") || "false";
	if(resizable=="true" || resizable==true)
		element.setAttribute('ondblclick', 'ResizeDrag(null, earr[\''+parent_id+'\'].canvas)'); 
	var gau = drinks.createElement("display", {"id": parent_id+"gau", "min_range":min_range, "max_range":max_range, "range_from":range_from, "range_to":range_to, "style":style, "value":this.value, "radius":radius, "text":text});
	this.appendChild(gau);

	var disp = drinks.createElement("display", {"id": parent_id+"dis", "type":"digital", "width":40*rx, "height":20*rx, "x":81*rx, "y":138*rx, "link":"true", "cipher": cipher, "significative":significative, "min_range":min_range, "max_range":max_range,});
	this.inner[0].appendChild(disp);
	
	var ledd = drinks.createElement("led", {"id":parent_id+"led", "radius":5*rx, "x":97*rx, "y":165*rx, "color":led_color});
	this.inner[0].appendChild(ledd);
	
	this.inner[0].onalert=onalert;
	this.inner[0].onleavealert=onleavealert;

	this.render = function(){
		this.instrumentCommonOperations();
	}
}
