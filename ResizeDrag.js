var bodyevent;
var flag=false;
var topcontainer=document.getElementById("workarea"); 


var rotatePoint = function(x, y, xm, ym, a){
  	var a = a*Math.PI/180;
		var x2=((x-xm)*Math.cos(a)+(y-ym)*Math.sin(a)+xm);
		var y2=((x-xm)*(-Math.sin(a))+(y-ym)*Math.cos(a)+ym);
	return {x:x2, y:y2};
}

var bodymouseup = function(event){
					var src = event.toElement || event.relatedTarget || event.originalTarget || event.target;
					var check = true;
					if(selected && selected.refer)
						for(var i in selected.refer.cursors){
							if(src==selected.refer.cursors[i].getCursor()){
								check=false;
							}
						}
					if(selected && src!=selected && check && document.getElementById('widgets').compareDocumentPosition(src)!=4){
						if(selected.instrument && selected.instrument.html.compareDocumentPosition(src)==20)
							return;
						removeSelection();
					}};
var bodymousemove = function(event){
				flag=true;
				if(event)
					bodyevent = event;
				};

var topcontainermousemove = function(event){
		if(selected){
			if (!window.getSelection)
				document.selection.empty();
			else{
				window.getSelection().removeAllRanges();
			}
		}
}


function scanChilds(parent){ 
		parent.childsDim = new Array();
		parent.prec_dim = {width:parent.clientWidth, height:parent.clientHeight}
		for(var i in parent.childNodes){
			if(parent.childNodes[i].style){
				parent.childsDim[i]={width:parent.childNodes[i].clientWidth, height:parent.childNodes[i].clientHeight, left:parent.childNodes[i].offsetLeft, top:parent.childNodes[i].offsetTop};
				scanChilds(parent.childNodes[i]);			
			}
		}
	}

function resize_item(parent, pos){
	var move;
	var drag=false;
	this.size = parent.cursorSize;
	this.parent = parent;
	var actual_pos;
	var click_pos;
	var top=pos.top;
	var left=pos.left;
	var selectFunc;
	this.onresize="";
	this.resChilds=true;
	var cursor = document.createElement("div");
	cursor.setAttribute("style", "width:"+this.size+"px; height:"+this.size+"px; border:1px solid black; user-select: none; -o-user-select:none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; position:absolute; top:"+pos.y+"px; left:"+pos.x+"px; ");
	cursor.setAttribute("class", "cursor");
	this.parent.appendChild(cursor);
	if(top && left)
		cursor.style.cursor="se-resize";
	if(!top && left)
		cursor.style.cursor="ne-resize";
	if(top && !left)
		cursor.style.cursor="sw-resize";
	if(!top && !left)
		cursor.style.cursor="nw-resize";
	var timer;
	var commonMouseUpOperations = function(event){
		drag=0;
		this.parent.prec_dim = {width:this.parent.clientWidth, height:this.parent.clientHeight};
		attach(document.body, "selectstart", selectFunc);
		scanChilds(this.parent);
		if(timer)
			clearInterval(timer);
	}.bind(this);

	if (!window.getSelection)
		document.selection.empty();
	else
		window.getSelection().removeAllRanges();
	this.parent.prec_dim = {width:this.parent.clientWidth, height:this.parent.clientHeight};
	attach(cursor, "mousedown", function(event){if(event.button==0)clickHandler(event);});
	attach(cursor, "touchstart", function(event){clickHandler(event);});
	attach(cursor, "mouseup", function(event){mouseUp(event);});
	attach(cursor, "touchend", function(event){mouseUp(event);});
	attach(cursor, "selectstart", function(){return false;});
	attach(cursor, "dragstart", function(){return false;});
	attach(cursor, "drag", function(){return false;});
	
	this.endResize = function(){
		mouseUp();
	}

	var mouseUp = function(event){	
		commonMouseUpOperations(event);
	}.bind(this);

	this.setPos = function(x, y){
		cursor.style.left=x+"px";
		cursor.style.top=y+"px";
	}
				
	this.setCursors = function(){
		if(this.parent.cursors){
			var width = selected.instrument.width;
			var height = selected.instrument.height;
			var angle = Math.floor((parseFloat(this.parent.getAttribute("rotate")) || 0)/90)*90;
			switch(angle){
				case 0:
					this.parent.cursors.topleft.setPos(0, 0);
					this.parent.cursors.topright.setPos(width-this.size, 0);
					this.parent.cursors.downleft.setPos(0, height-this.size);
					this.parent.cursors.downright.setPos(width-this.size, height-this.size);
					this.parent.blocker.style.left=(width/2-this.size/4)+"px";
					this.parent.blocker.style.top=(height-this.size/2)+"px";
					break;
				case 90:
					this.parent.cursors.topleft.setPos(0, height-this.size);
					this.parent.cursors.topright.setPos(0, 0);
					this.parent.cursors.downleft.setPos(width-this.size, height-this.size);
					this.parent.cursors.downright.setPos(width-this.size, 0);
					this.parent.blocker.style.left=(width-this.size/2)+"px";
					this.parent.blocker.style.top=(height/2-this.size/4)+"px";
					break;
				case 180:
					this.parent.cursors.topleft.setPos(width-this.size, height-this.size);
					this.parent.cursors.topright.setPos(0, height-this.size);
					this.parent.cursors.downleft.setPos(width-this.size, 0);
					this.parent.cursors.downright.setPos(0, 0);
					this.parent.blocker.style.left=(width/2-this.size/4)+"px";
					this.parent.blocker.style.top=(0)+"px";
					break;
				case 270:
					this.parent.cursors.topleft.setPos(width-this.size, 0);
					this.parent.cursors.topright.setPos(width-this.size, height-this.size);
					this.parent.cursors.downleft.setPos(0, 0);
					this.parent.cursors.downright.setPos(0, height-this.size);
					this.parent.blocker.style.left=(0)+"px";
					this.parent.blocker.style.top=(height/2-this.size/4)+"px";
					break;
				case 360:
					this.parent.cursors.topleft.setPos(0, 0);
					this.parent.cursors.topright.setPos(width-this.size, 0);
					this.parent.cursors.downleft.setPos(0, height-this.size);
					this.parent.cursors.downright.setPos(width-this.size, height-this.size);
					this.parent.blocker.style.left=(width/2-this.size/4)+"px";
					this.parent.blocker.style.top=(height-this.size/2)+"px";					
					break;
				case -90:
					this.parent.cursors.topleft.setPos(width-this.size, 0);
					this.parent.cursors.topright.setPos(width-this.size, height-this.size);
					this.parent.cursors.downleft.setPos(0, 0);
					this.parent.cursors.downright.setPos(0, height-this.size);
					this.parent.blocker.style.left=(0)+"px";
					this.parent.blocker.style.top=(height/2-this.size/4)+"px";
					break;
				case -180:
					this.parent.cursors.topleft.setPos(width-this.size, height-this.size);
					this.parent.cursors.topright.setPos(0, height-this.size);
					this.parent.cursors.downleft.setPos(width-this.size, 0);
					this.parent.cursors.downright.setPos(0, 0);
					this.parent.blocker.style.left=(width/2-this.size/4)+"px";
					this.parent.blocker.style.top=(0)+"px";
					break;
				case -270:
					this.parent.cursors.topleft.setPos(0, height-this.size);
					this.parent.cursors.topright.setPos(0, 0);
					this.parent.cursors.downleft.setPos(width-this.size, height-this.size);
					this.parent.cursors.downright.setPos(width-this.size, 0);
					this.parent.blocker.style.left=(width-this.size/2)+"px";
					this.parent.blocker.style.top=(height/2-this.size/4)+"px";
					break;

			}
		}
	}.bind(this);
	this.getCursor = function(){
		return cursor;
	}

//	setInterval(this.setCursors, 100);
	var fdiv=false;
	this.resizeParentChild = function(el){
		var wx = (el.clientWidth)/(el.prec_dim.width);
		var hx = (el.clientHeight)/(el.prec_dim.height);
		if(!fdiv && all_type[el.nodeName.toLowerCase()])
			fdiv=true;
		for(var i in el.childNodes){
			var child = el.childNodes[i];
			if(child.style){
				if(child.getAttribute("class")=="cursor" || child.getAttribute("class")=="blocker")
					continue;
				if(fdiv && child.nodeName=="DIV" && child.style.position=="relative"){
					child.style.width=el.clientWidth+"px";
					child.style.height=el.clientHeight+"px";
					child.setAttribute("width", el.clientWidth);
					child.setAttribute("height", el.clientHeight);
					fdiv=false;
				}
				else{
					var width = el.childsDim[i].width*wx;
					var height = el.childsDim[i].height*hx;
					if(child.instrument){
						if(child.instrument.radius){
							var minus = child.instrument.minus || 0;
							var radius = (el.clientWidth>el.clientHeight?el.clientHeight/2:el.clientWidth/2)-minus/2;
							child.instrument.radius = radius;
							child.instrument.html.setAttribute("radius", radius);
						}
						else{	
							child.instrument.width = el.clientWidth;
							child.instrument.height = el.clientHeight;
						}
						if(child.instrument.parent){
							child.instrument.x = el.childsDim[i].left*wx;
							child.instrument.y = el.childsDim[i].top*hx;
						}
					}else{
						child.style.width=width+"px";
						child.style.height=height+"px";
						child.setAttribute("width", width);
						child.setAttribute("height", height);
						child.style.left=(el.childsDim[i].left*wx)+"px";
						child.style.top=(el.childsDim[i].top*hx)+"px";
					}
				}
				this.resizeParentChild(child);
			}
		}
		this.setCursors();
	}.bind(this);

	var moveHandler = function(event){
		if(!flag || !bodyevent)
			return;
		var obj = getRelativeCoordinates(bodyevent, this.parent.parentNode);
		actual_pos = {x:obj.x, y:obj.y};
		var lsign=1, tsign=1;
		var angle = Math.floor((parseFloat(this.parent.getAttribute("rotate")) || 0)/90)*90;
		if((left && click_pos.x>actual_pos.x) || (!left && click_pos.x<actual_pos.x))
			lsign=-1;
		if((top && click_pos.y>actual_pos.y) || (!top && click_pos.y<actual_pos.y))
			tsign=-1;
		var width = (this.parent.prec_dim.width-Math.abs(click_pos.x-actual_pos.x)*lsign);
		var height = (this.parent.prec_dim.height-Math.abs(click_pos.y-actual_pos.y)*tsign);
		this.parent.style.width=width+"px";
		this.parent.style.height=height+"px";
		this.parent.setAttribute("width", width);
		this.parent.setAttribute("height", height);
		if(selected.instrument){
			if(selected.instrument.radius){
				var minus = selected.instrument.minus || 0;
				var radius = (this.parent.clientWidth>this.parent.clientHeight?this.parent.clientHeight/2:this.parent.clientWidth/2)-minus/2;
				selected.instrument.radius = radius;
				selected.instrument.html.setAttribute("radius", radius);
			}
			else{	
				selected.instrument.width = width;
				selected.instrument.height = height;
			}
		}
		if(top)
			this.parent.style.top=(actual_pos.y-this.size/2)+"px";			
		if(left)
			this.parent.style.left=(actual_pos.x-this.size/2)+"px";
		if(this.resChilds)
			this.resizeParentChild(this.parent);
		else
			this.setCursors();
		flag=false;
		eval(this.onresize);
	}.bind(this);

	var clickHandler = function(event){
		var obj = getRelativeCoordinates(event, this.parent.parentNode);
		click_pos = {x:obj.x, y:obj.y};
		var angle = (parseFloat(this.parent.getAttribute("rotate")) || 0)*Math.PI/180;
		//click_pos = rotatePoint(click_pos.x, click_pos.y, this.parent.clientWidth/2, this.parent.clientHeight/2, angle);
		drag=1;
		scanChilds(this.parent);
		selectFunc = document.body.onselectstart; 
		attach(document.body, "selectstart", function () { return false; });
		timer = setInterval(moveHandler, 100);
		
	}.bind(this);

}

function doElsCollide(el1, el2){
    var scrollLeft = document.body.scrollLeft;
    var scrollTop = document.body.scrollTop;
    var box1 = el1.getBoundingClientRect();
    var lx1 = box1.left + scrollLeft;
    var ty1 = box1.top + scrollTop;
    var box2 = el2.getBoundingClientRect();
    var lx2 = box2.left + scrollLeft;
    var ty2 = box2.top + scrollTop;
    el1.offsetBottom = ty1 + el1.offsetHeight;
    el1.offsetRight = lx1 + el1.offsetWidth;
    el2.offsetBottom = ty2 + el2.offsetHeight;
    el2.offsetRight = lx2 + el2.offsetWidth;
    return !((el1.offsetBottom < ty2) ||
             (ty1 > el2.offsetBottom) ||
             (el1.offsetRight < lx2) ||
             (lx1 > el2.offsetRight))
};

function isEmpty(inschild){
	var empty = true;
	for(var prop in inschild) {
		if(inschild.hasOwnProperty(prop))
		 	empty = false;
	}
	return empty;
}

function draggable_item(element){
	var move;
	var drag=false;
	var selectFunc;
	var actual_pos;
	var inschild = {};
	this.onmove="";

	var onmousedown = element.onmousedown;
	var ontouchstart = element.ontouchstart;
	var onmouseup = element.onmouseup;
	var ontouchend = element.ontouchend;
	var onselectstart = element.onselectstart;
	var ondragstart = element.ondragstart;
	var ondrag = element.ondrag;
	var onmouseout = element.onmouseout;
	var mousedown = function(event){if(event.button==0)clickHandler(event);};
	var mouseup = function(event){mouseUp(event);};
	var touchstart = function(event){clickHandler(event);};
	var touchend = function(event){mouseUp(event);};
	var selectstart = function(){return false;};
	var dragstart = function(){return false;};
	var dragf = function(){return false};
	var timer;	
	var click_pos;

	var addEvents = function(){
		element.msd = mousedown;
		attach(element, "mousedown", mousedown);
		attach(element, "touchstart", touchstart);
		attach(element, "mouseup", mouseup);
		attach(element, "touchend", touchend);
		attach(element, "selectstart", selectstart);
		attach(element, "dragstart", dragstart);
		attach(element, "drag", dragf);
	}
	addEvents();

	var removeEvents = function(){
		detach(element, "mousedown", mousedown);
		detach(element, "touchstart", touchstart);
		detach(element, "mouseup", mouseup);
		detach(element, "touchend", touchend);
		detach(element, "selectstart", selectstart);
		detach(element, "dragstart", dragstart);
		detach(element, "drag", dragf);
	}

	this.endDrag = function(){
		mouseUp();		
		removeEvents();
	}

	var mouseUp = function(event){	
		if(drag){
			drag=0;
			document.onselectstart = selectFunc;
			element.style.zIndex="0";
			clearInterval(timer);
			for(var i in element.cursors)
				 element.cursors[i].getCursor().style.zIndex="10";

			if(!isEmpty(inschild)){
				var parent = inschild.parent.html?inschild.parent.html:inschild.parent;
				var obj = getRelativeCoordinates(event, parent);
				inschild.child.setAttribute("x", obj.x-click_pos.x);
				inschild.child.setAttribute("y", obj.y-click_pos.y);
				var pos = {x:(obj.x -click_pos.x),y:(obj.y -click_pos.y)};
				if(selected.instrument.parent!=null && selected.instrument.parent!=topcontainer){
					var angle = (parseFloat(selected.instrument.parent.rotate) || 0);
					pos = rotatePoint(pos.x, pos.y, selected.instrument.parent.width/2, selected.instrument.parent.height/2, angle);
				}
				element.style.left = (pos.x)+"px";
				element.style.top = (pos.y)+"px";
				if(document.getElementById('style'))
					document.getElementById('style').value=element.getAttribute('style');
				if(Drinks.getElementById(inschild.child.id).parent!=inschild.parent){
					if(inschild.parent==topcontainer)
						Drinks.getElementById(inschild.child.id).parent=topcontainer;
					inschild.parent.appendChild(inschild.child);
					selected = Drinks.getElementById(inschild.child.id).canvas;
					selected.refer = Drinks.getElementById(inschild.child.id).html;
				}
				for(var i in inschild.child.cursors)
					inschild.child.appendChild(inschild.child.cursors[i].getCursor());
				eval(selected.refer.getAttribute("onbecomechild"));
				parent.style.border="none";	
			}
		}
	}.bind(this);

	var over;
	var iterateChild = function(inn){
		for(var k in inn){
			if(!inn[k].style)
				continue;
			var item = inn[k].html?inn[k].html:inn[k]; 
			var instr = earr[inn[k].id]; 
			if(element!=item && doElsCollide(element, item)){		
				if(over==element)
					break;
				over = item;
				inschild = {child:element, parent:instr?instr:inn[k]};
				var childs = instr?instr.inner:item.childNodes;
				iterateChild(childs);
			}
		}
	}
	var moveHandler = function(event){
		if(!flag || !bodyevent)
			return;
		var obj = getRelativeCoordinates(bodyevent, element.parentNode);
		var parentW, parentH;
		parentW = topcontainer.scrollWidth;	
		parentH = topcontainer.scrollheight;	
		actual_pos = {x:obj.x, y:obj.y};
		var pos = {x:(actual_pos.x -click_pos.x),y:(actual_pos.y -click_pos.y)};
		if(selected.instrument.parent!=null && selected.instrument.parent!=topcontainer){
			var angle = (parseFloat(selected.instrument.parent.rotate) || 0);
			pos = rotatePoint(pos.x, pos.y, selected.instrument.parent.width/2, selected.instrument.parent.height/2, angle);
		}
		element.style.left = (pos.x)+"px";
		element.style.top = (pos.y)+"px";
		if(selected){
			inschild={};
			if(over)
				over.style.border="none";	
			over = null;
			iterateChild(new Array(topcontainer));
			
			if(over)
				over.style.border="2px solid red";	
		}
		selected.style.cursor="move";
		eval(this.onmove);
		flag=false;
	}.bind(this);

	var clickHandler = function(event){
		var src = (event.toElement || event.relatedTarget || event.originalTarget || event.target);
		if(src.getAttribute("class")=="cursor"){
			return;
		}
		click_pos = getRelativeCoordinates(event, element);
		var angle = (parseFloat(element.getAttribute("rotate")) || 0);
		click_pos = rotatePoint(click_pos.x, click_pos.y, element.clientWidth/2, element.clientHeight/2, angle);		
		drag=1;
		element.style.zIndex="9999";
		for(var i in element.cursors)
			 element.cursors[i].getCursor().style.zIndex="9999";
		selectFunc = document.onselectstart; 
		document.onselectstart = function () { return false; };
		timer = setInterval(moveHandler, 100);
	};
}
var selected=null;
function removeSelection(block){
	var once=false;
	if(selected && selected.refer){
		for(var i in selected.refer.cursors){
			if(!once){
				selected.refer.drag.endDrag();
				once = true;			
			}
			selected.refer.cursors[i].endResize();
			selected.refer.removeChild(selected.refer.cursors[i].getCursor());
			delete selected.refer.cursors[i];
		}
		if(selected.instrument.html.compareDocumentPosition(selected.refer.blocker)==20)
			selected.refer.removeChild(selected.refer.blocker);
		delete selected.refer.cursors;
		delete selected.refer.drag;
		if(selected.instrument && selected.instrument.enableEvents)
			selected.instrument.enableEvents();

		selected.resizable=false;
		eval(selected.refer.getAttribute("onleaveresize"));
		selected=null;
		bodyevent=null;

	}
}
attach(topcontainer, "mouseup", bodymouseup);
attach(document.body, "mousemove", bodymousemove);
attach(topcontainer, "mousemove", topcontainermousemove);
attach(document.body, "touchmove", bodymousemove);
attach(topcontainer, "touchmove", topcontainermousemove);

function ResizeDrag(event, canvas){
	if(!canvas){
		event.stopPropagation();
		var cursors={};
		var res = event.toElement || event.relatedTarget || event.originalTarget || event.target;
	}else{
		res = canvas;
	}
	if(res.instrument.html.getAttribute("resizable")!="true"){
		return;
	}
	if(!res.resizable){
		res.resizable=true;
		removeSelection();
		selected = res;
		res = res.instrument.html; 
		selected.refer = res;
		res.style.position="absolute";
		var ss = res.clientWidth>res.clientHeight?(res.clientHeight/10):(res.clientWidth/10);
		res.cursorSize = ss;
		var angle = Math.floor((parseFloat(res.getAttribute("rotate")) || 0)/90)*90;
		var width = selected.instrument.width;
		var height = selected.instrument.height;
		var tl, tr, dl, dr, bl;
		switch(angle){
			case 0:
				tl = {x:0, y:0};
				tr = {x:width-ss, y:0};
				dl = {x:0, y:height-ss};
				dr = {x:width-ss, y:height-ss};
				bl = {x:width/2-ss/4, y:height-ss/2};
				break;
			case 90:
				tl = {x:0, y:height-ss};
				tr = {x:0, y:0};
				dl = {x:width-ss, y:height-ss};
				dr = {x:width-ss, y:0};
				bl = {x:width-ss/2, y:height/2-ss/4};
				break;
			case 180:
				tl = {x:width-ss, y:height-ss};
				tr = {x:0, y:height-ss};
				dl = {x:width-ss, y:0};
				dr = {x:0, y:0};
				bl = {x:width/2-ss/4, y:0};
				break;
			case 270:
				tl = {x:width-ss, y:0};
				tr = {x:width-ss, y:height-ss};
				dl = {x:0, y:0};
				dr = {x:0, y:height-ss};
				bl = {x:0, y:height/2-ss/4};
				break;
			case 360:
				tl = {x:0, y:0};
				tr = {x:width-ss, y:0};
				dl = {x:0, y:height-ss};
				dr = {x:width-ss, y:height-ss};
				bl = {x:width/2-ss/4, y:height-ss/2};
				break;
			case -270:
				tl = {x:0, y:height-ss};
				tr = {x:0, y:0};
				dl = {x:width-ss, y:height-ss};
				dr = {x:width-ss, y:0};
				bl = {x:width-ss/2, y:height/2-ss/4};
				break;
			case -180:
				tl = {x:width-ss, y:height-ss};
				tr = {x:0, y:height-ss};
				dl = {x:width-ss, y:0};
				dr = {x:0, y:0};
				bl = {x:width/2-ss/4, y:0};
				break;
			case -90:
				tl = {x:width-ss, y:0};
				tr = {x:width-ss, y:height-ss};
				dl = {x:0, y:0};
				dr = {x:0, y:height-ss};
				bl = {x:0, y:height/2-ss/4};
				break;
		}
		var tlcursor = new resize_item(res, {x:tl.x, y:tl.y, top:true, left:true});
		var trcursor = new resize_item(res, {x:tr.x, y:tr.y, top:true, left:false});
		var dlcursor = new resize_item(res, {x:dl.x, y:dl.y, top:false, left:true});
		var drcursor = new resize_item(res, {x:dr.x, y:dr.y, top:false, left:false});
		cursors = {topleft:tlcursor, topright:trcursor, downleft:dlcursor, downright:drcursor};
		for(var i in cursors)
			cursors[i].onresize = res.getAttribute("onresize");
		res.cursors = cursors;
		var blocker = document.createElement('div');
		blocker.setAttribute("style", "cursor:pointer; position:absolute; top:"+bl.y+"px; left:"+bl.x+"px; width:"+ss/2+"px; height:"+ss/2+"px; border:1px solid black;");
		blocker.style.background="#fff url(lock.png) no-repeat left top";
		blocker.setAttribute("class", "blocker");
		blocker.style.backgroundSize="100% 100%";
		blocker.onclick=function(){
			if(res.cursors.topleft.resChilds){
				for(var i in res.cursors)
					res.cursors[i].resChilds=false;
				blocker.style.background="#fff url(unlock.png) no-repeat left top";
				blocker.style.backgroundSize="100% 100%";
				}
			else{
				for(var i in res.cursors)
					res.cursors[i].resChilds=true;
				blocker.style.background="#fff url(lock.png) no-repeat left top";
				blocker.style.backgroundSize="100% 100%";
			}
		};
		res.appendChild(blocker);
		res.blocker = blocker;
		res.drag = new draggable_item(res);
		res.drag.onmove = res.getAttribute("onmove");
		if(res.getAttribute("onenterresize"))
			eval(res.getAttribute("onenterresize"));
	}

}
