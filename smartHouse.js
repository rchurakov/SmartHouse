"use strict";
//Main Object - Smart House (SH)
//=============================================
function SH(name) {
	this._name = name;
	this._lamps = [];
	this._gates = [];
	this._conds = [];
};
//SmartHouse Methods************************
SH.prototype.getName = function () {
	return this._name;
};

//Add New Device to destination Array methods
SH.prototype.addLamp = function (lmp) {
	this._lamps.push(lmp);
};
 
SH.prototype.addGate = function (gt) {
	this._gates.push(gt);
};

SH.prototype.addCond = function (air) {
	this._conds.push(air);
};

//Processing "Add New Device" Form--------------
SH.prototype.createDev = function (nameNewDev, typeNewDev) {
	var device;
	if (typeNewDev == "_lamps") {
		device = new Lamp(nameNewDev);
	} else if (typeNewDev == "_gates") {
		device = new Gate(nameNewDev);
	} else /*if (typeNewDev == "_conds") */{
		device = new Cond(nameNewDev);
	} return device;
};
//Delete Devices-------------------------------------
SH.prototype.delLamp = function (value) {
	//var pos = this._lamps.indexOf(value);
	//delete this._lamps[pos];// - method is not suitable: object removing from Array, but 'array.length' does not change
	this._lamps.splice(value, 1);
};

SH.prototype.delGate = function (value) {
	//var pos = this._gates.indexOf(value);
	//delete this._gates[pos];// - method is not suitable: object removing from Array, but 'array.length' does not change
	this._gates.splice(value, 1);
};

SH.prototype.delCond = function (value) {
	//var pos = this._conds.indexOf(value);
	//delete this._conds[pos];// - method is not suitable: object removing from Array, but 'array.length' does not change
	this._conds.splice(value, 1);
};
//=============================================

//Class "Device"
//=============================================
function Device(name) {
	this._name = name;
	this._state = false;
};
//Device Methods*******************************
Device.prototype.on = function () {
	this._state = true;
};
Device.prototype.off = function () {
	this._state = false;
};
Device.prototype.getState = function () {
	return this._state;
};
Device.prototype.getName = function () {
	return this._name;
};
//============================================

//SubClass "Lamp"
//===========================================
function Lamp(name) {
	Device.call(this, name);
	this._bright = 100;
};
Lamp.prototype = Object.create(Device.prototype);
Lamp.prototype.constructor = Lamp;
//Lamp Methods*****************************
Lamp.prototype.increaseBright = function () {
	if (this._bright < 100) {
		this._bright++;
   }
};
Lamp.prototype.decreaseBright = function () {
	if (this._bright > 20) {
		this._bright--;
   }
};
Lamp.prototype.getBright = function () {
	return this._bright;
};
//===========================================

//SubClass "Garage Gate"
//===========================================
function Gate(name) {
	Device.call(this, name);
	this._angle = 0;
};
Gate.prototype = Object.create(Device.prototype);
Gate.prototype.constructor = Gate;
//Redefine ON/OFF Methods**********************
Gate.prototype.on = function () {
	this._state = true;
	this._angle = 90;
};
Gate.prototype.off = function () {
	this._state = false;
	this._angle = 0;
};
//Control Angle Gate Methods******************
Gate.prototype.upGate = function () {
	if (this._angle < 90 & this._state === true) {
		this._angle += 10;
   }
};
Gate.prototype.downGate = function () {
	if (this._angle > 10 & this._state === true) {
		this._angle -= 10;
   }
};
Gate.prototype.getAngle = function () {
	return this._angle;
};
//==========================================

//SubClass "Air Conditioning"
//==========================================
function Cond(name) {
	Device.call(this, name);
	this._temp = 22;
	this._mode = ["Auto", "Cool", "Heat", "Fan"];
	this._countMode = 0;
	this._currentMode = "Auto";
};
Cond.prototype = Object.create(Device.prototype);
Cond.prototype.constructor = Cond;
//Control Air Temp***************************
Cond.prototype.upTemp = function () {
	if (this._temp < 35) {
		this._temp++;
   }
};
Cond.prototype.downTemp = function () {
	if (this._temp > 14) {
		this._temp--;
   }
};
Cond.prototype.getTemp = function () {
	return this._temp;
};
//Control Air Cond Modes***********************
Cond.prototype.setMode = function () {
	if (this._countMode < this._mode.length-1) {
		this._countMode++;
	} else {
		this._countMode = 0;
	}
	this._currentMode = this._mode[this._countMode];
};
Cond.prototype.getMode = function () {
	return this._currentMode;
};

//View&Control
//=============================================
function SHView(smartHouse) {
	this._smartHouse = smartHouse;
};

SHView.prototype.render = function () {
	var root = document.getElementById("root");
	
	var shContainer = document.createElement("div");
	shContainer.className = "smartHouse";
	root.appendChild(shContainer);
	
	shContainer.innerHTML = "<div>Smart House Control</div><hr><div>" + this._smartHouse.getName() + "</div>";
	//Render Lamps+++++++++++++++++++++++++++++++++++++++++++++++++
	var lampArr = document.createElement("div");
	lampArr.id = "lamps";
	lampArr.innerText = "Lamps";
	shContainer.appendChild(lampArr);
	//For One Lamp-----------------------------------------
	function rerenderLamps(value, index) {
		var oneLamp = document.createElement("div");
		oneLamp.className = "bulb";
		lampArr.appendChild(oneLamp);
		var currLamp = this._smartHouse._lamps[index];
		
		var nameLamp = document.createElement("div");
		nameLamp.innerHTML = "Model: " + (currLamp.getName());
		nameLamp.className = "idlamp";
		oneLamp.appendChild(nameLamp);
		
		var stateLamp = document.createElement("div");
		stateLamp.innerHTML = "State: " + (currLamp.getState() ? "On" : "Off");
		stateLamp.className = currLamp.getState() ? "on" : "off";
		oneLamp.appendChild(stateLamp);
		
		var brightLamp = document.createElement("div");
		brightLamp.innerHTML = "Brightness: " + (currLamp.getBright()) + "<hr>";
		brightLamp.className = "brightlamp";
		oneLamp.appendChild(brightLamp);
		//BUTTONS#######################################
		var onBtn = document.createElement("button");
		onBtn.className = "statebtn";
		onBtn.innerText = "ON";
		onBtn.addEventListener(
			"click",
			function () {
				currLamp.on();
				stateLamp.innerHTML = "State: " + (currLamp.getState() ? "On" : "Off");
				stateLamp.className = "on";
			}.bind(this)
		);
		oneLamp.appendChild(onBtn);
		
		var offBtn = document.createElement("button");
		offBtn.className = "statebtn";
		offBtn.innerText = "OFF";
		offBtn.addEventListener(
			"click",
			function () {
				currLamp.off();
				stateLamp.innerHTML = "State: " + (currLamp.getState() ? "On" : "Off");
				stateLamp.className = "off";
			}.bind(this)
		);
		oneLamp.appendChild(offBtn);
		
		var incrBrightBtn = document.createElement("button");
		incrBrightBtn.className = "chpropbtn";
		incrBrightBtn.innerText = "+";
		incrBrightBtn.addEventListener(
			"click",
			function () {
				currLamp.increaseBright();
				brightLamp.innerHTML = "Brightness: " + (currLamp.getBright()) + "<hr>";
			}.bind(this)
		);
		oneLamp.appendChild(incrBrightBtn);
		
		var decrBrightBtn = document.createElement("button");
		decrBrightBtn.className = "chpropbtn";
		decrBrightBtn.innerText = "-";
		decrBrightBtn.addEventListener(
			"click",
			function () {
				currLamp.decreaseBright();
				brightLamp.innerHTML = "Brightness: " + (currLamp.getBright()) + "<hr>";
			}.bind(this)
		);
		oneLamp.appendChild(decrBrightBtn);
		//###DELETE BUTTON###
		var delLampBtn = document.createElement("button");
		delLampBtn.className = "delbtn";
		delLampBtn.innerText = "X";//'&#215;';
		delLampBtn.addEventListener(
			"click",
			function () {
				this._smartHouse.delLamp(index);
				lampArr.innerHTML = "Lamps";
				this._smartHouse._lamps.forEach(rerenderLamps.bind(this));
			}.bind(this)
		);
		oneLamp.appendChild(delLampBtn);
	};
	this._smartHouse._lamps.forEach(rerenderLamps.bind(this));
	//---------------------------------------------------------------------
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	//Render Gates+++++++++++++++++++++++++++++++++++++++++++++++++
	var gateArr = document.createElement("div");
	gateArr.id = "gates";
	gateArr.innerText = "Gates";
	shContainer.appendChild(gateArr);
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	//For One Gate-----------------------------------------
	function rerenderGates(value, index) {
		var oneGate = document.createElement("div");
		oneGate.className = "gate";
		gateArr.appendChild(oneGate);
		var currGate = this._smartHouse._gates[index];
		
		var nameGate = document.createElement("div");
		nameGate.innerHTML = "Model: " + (currGate.getName());
		nameGate.className = "idgate";
		oneGate.appendChild(nameGate);
		
		var stateGate = document.createElement("div");
		stateGate.innerHTML = "State: " + (currGate.getState() ? "Open" : "Close");
		stateGate.className = currGate.getState() ? "on" : "off";
		oneGate.appendChild(stateGate);
		
		var angleGate = document.createElement("div");
		angleGate.innerHTML = "Angle: " + (currGate.getAngle()) + "<hr>";
		angleGate.className = "anglegate";
		oneGate.appendChild(angleGate);
		
		//BUTTONS#######################################
		var onGateBtn = document.createElement("button");
		onGateBtn.className = "statebtn";
		onGateBtn.innerText = "OPEN";
		onGateBtn.addEventListener(
			"click",
			function () {
				currGate.on();
				stateGate.innerHTML = "State: " + (currGate.getState() ? "Open" : "Close");
				angleGate.innerHTML = "Angle: " + (currGate.getAngle()) + "<hr>";
				stateGate.className = "on";
			}.bind(this)
		);
		oneGate.appendChild(onGateBtn);
		
		var offGateBtn = document.createElement("button");
		offGateBtn.className = "statebtn";
		offGateBtn.innerText = "CLOSE";
		offGateBtn.addEventListener(
			"click",
			function () {
				currGate.off();
				stateGate.innerHTML = "State: " + (currGate.getState() ? "Open" : "Close");
				angleGate.innerHTML = "Angle: " + (currGate.getAngle()) + "<hr>";
				stateGate.className = "off";
			}.bind(this)
		);
		oneGate.appendChild(offGateBtn);
		
		var incrAngleBtn = document.createElement("button");
		incrAngleBtn.className = "chpropbtn";
		incrAngleBtn.innerText = "+";
		incrAngleBtn.addEventListener(
			"click",
			function () {
				currGate.upGate();
				angleGate.innerHTML = "Angle: " + (currGate.getAngle()) + "<hr>";
			}.bind(this)
		);
		oneGate.appendChild(incrAngleBtn);
		
		var decrAngleBtn = document.createElement("button");
		decrAngleBtn.className = "chpropbtn";
		decrAngleBtn.innerText = "-";
		decrAngleBtn.addEventListener(
			"click",
			function () {
				currGate.downGate();
				angleGate.innerHTML = "Angle: " + (currGate.getAngle()) + "<hr>";
			}.bind(this)
		);
		oneGate.appendChild(decrAngleBtn);
		//###DELETE BUTTON###
		var delGateBtn = document.createElement("button");
		delGateBtn.className = "delbtn";
		delGateBtn.innerText = "X";//'&#215;';
		delGateBtn.addEventListener(
			"click",
			function () {
				this._smartHouse.delGate(index);
				gateArr.innerHTML = "Gates";
				this._smartHouse._gates.forEach(rerenderGates.bind(this));
			}.bind(this)
		);
		oneGate.appendChild(delGateBtn);
	};
	this._smartHouse._gates.forEach(rerenderGates.bind(this));
	//---------------------------------------------------------
	
	//Render Air Conds+++++++++++++++++++++++++++++++++++++++++++
	var condArr = document.createElement("div");
	condArr.id = "conditions";
	condArr.innerText = "Air Conds";
	shContainer.appendChild(condArr);
	//For One Air Cond-----------------------------------------
	function rerenderConds(value, index) {
		var oneCond = document.createElement("div");
		oneCond.className = "air";
		condArr.appendChild(oneCond);
		var currCond = this._smartHouse._conds[index];
		
		var nameCond = document.createElement("div");
		nameCond.innerHTML = "Model: " + (currCond.getName());
		nameCond.className = "idcond";
		oneCond.appendChild(nameCond);
		
		var stateCond = document.createElement("div");
		stateCond.innerHTML = "State: " + (currCond.getState() ? "On" : "Off");
		stateCond.className = currCond.getState() ? "on" : "off";
		oneCond.appendChild(stateCond);
		
		var modeCond = document.createElement("div");
		modeCond.innerHTML = "Mode: " + currCond.getMode();
		modeCond.className = "modecond";
		oneCond.appendChild(modeCond);
		
		var tempCond = document.createElement("div");
		tempCond.innerHTML = "Temp: " + (currCond.getTemp()) + "&#176C" + "<hr>";
		tempCond.className = "tempcond";
		oneCond.appendChild(tempCond);
		
		//BUTTONS#######################################
		var onCondBtn = document.createElement("button");
		onCondBtn.className = "statebtn";
		onCondBtn.innerText = "ON";
		onCondBtn.addEventListener(
			"click",
			function () {
				currCond.on();
				stateCond.innerHTML = "State: " + (currCond.getState() ? "On" : "Off");
				stateCond.className = "on";
			}.bind(this)
		);
		oneCond.appendChild(onCondBtn);
		
		var offCondBtn = document.createElement("button");
		offCondBtn.className = "statebtn";
		offCondBtn.innerText = "OFF";
		offCondBtn.addEventListener(
			"click",
			function () {
				currCond.off();
				stateCond.innerHTML = "State: " + (currCond.getState() ? "On" : "Off");
				stateCond.className = "off";
			}.bind(this)
		);
		oneCond.appendChild(offCondBtn);
		
		var incrTempBtn = document.createElement("button");
		incrTempBtn.className = "chpropbtn";
		incrTempBtn.innerText = "+";
		incrTempBtn.addEventListener(
			"click",
			function () {
				currCond.upTemp();
				tempCond.innerHTML = "Temp: " + (currCond.getTemp()) + "&#176C" + "<hr>";
			}.bind(this)
		);
		oneCond.appendChild(incrTempBtn);
		
		var decrTempBtn = document.createElement("button");
		decrTempBtn.className = "chpropbtn";
		decrTempBtn.innerText = "-";
		decrTempBtn.addEventListener(
			"click",
			function () {
				currCond.downTemp();
				tempCond.innerHTML = "Temp: " + (currCond.getTemp()) + "&#176;C" + "<hr>";
			}.bind(this)
		);
		oneCond.appendChild(decrTempBtn);
		
		var modeCondBtn = document.createElement("button");
		modeCondBtn.className = "chmodebtn";
		modeCondBtn.innerText = "M";
		modeCondBtn.addEventListener(
			"click",
			function () {
				currCond.setMode();
				modeCond.innerHTML = "Mode: " + (currCond.getMode());
			}.bind(this)
		);
		oneCond.appendChild(modeCondBtn);
		//###DELETE BUTTON###
		var delCondBtn = document.createElement("button");
		delCondBtn.className = "delbtn";
		delCondBtn.innerText = "X";//'&#215;';
		delCondBtn.addEventListener(
			"click",
			function () {
				this._smartHouse.delCond(index);
				condArr.innerHTML = "Air Conds";
				this._smartHouse._conds.forEach(rerenderConds.bind(this));
			}.bind(this)
		);
		oneCond.appendChild(delCondBtn);
	};
	this._smartHouse._conds.forEach(rerenderConds.bind(this));
	//----------------------------------------------------------
	//++++++++++++++++++++++++++++++++++++++++++++++++
	
	//Processing "Add New Device" Form+++++++++++++++++++++
	var createDevBtn = document.getElementById("createdevbtn");
	createDevBtn.addEventListener(
		"click",
		function () {
			var nameNewDev = document.getElementById("namedevice").value;
			var typeNewDev = document.getElementById("typedevice").value;
			var device = this._smartHouse.createDev(nameNewDev, typeNewDev);
			if (device instanceof Lamp) {
				this._smartHouse.addLamp(device);
				lampArr.innerHTML = "Lamps";
				this._smartHouse._lamps.forEach(rerenderLamps.bind(this));
			} else if (device instanceof Gate) {
				this._smartHouse.addGate(device);
				gateArr.innerHTML = "Gates";
				this._smartHouse._gates.forEach(rerenderGates.bind(this));
			} else /*if (device instanceof Cond)*/ {
				this._smartHouse.addCond(device);
				condArr.innerHTML = "Air Conds";
				this._smartHouse._conds.forEach(rerenderConds.bind(this));
			}
		}.bind(this)
	);
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}
//===============================================================

var sh1 = new SH("Vacation House #1");
//var l1 = new Lamp("Ledberg #1");
//var l2 = new Lamp("Paulmann #1");
//var g1 = new Gate("Hormann #1");
//var c1 = new Cond("Daikin #1");

//sh1.addLamp(l1);
//sh1.addLamp(l2);
//sh1.addGate(g1);
//sh1.addCond(c1);

var viewSH1 = new SHView(sh1);
viewSH1.render();
