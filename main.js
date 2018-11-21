function getDefaultSave() {
    return {
        number: new Decimal(1.0),
        growthRate: new Decimal(1.5),
        clickTimer: new Decimal(3.0),
        microEss: new Decimal(0),
        ooms: new Decimal(0),
        microPrestiges: new Decimal(0),
        breakNumerals: false,
        playtime: 0,
        clicks: 0,
        user: {lastTick: 0,
                playtime: 0}
    }
}

var user = getDefaultSave();

function update(set,get) {
	document.getElementById(set).innerHTML=get;
}

function onClick() {
	if(clickTimer==0) {
		number*=growthRate;
		update("numberDisp", number);
		clickTimer=3.0;
	}
	else return;
}

function save(){
	localStorage.setItem("save",JSON.stringify(user));
}
function load(){
	var save = JSON.parse(localStorage.getItem("save"));
	if(localStorage.getItem("save") !== null) {
		user = convertSave(save,getDefaultSave());
		updateSave()
	}
	document.getElementById("notation").innerHTML = "Notation: " + user.options.notation
	return user;
}
function convertSave(obj,obj2) {
	if(typeof obj === "object" && obj !== null && typeof obj2 === "object" && obj2 !== null) {
		for(var i in obj) {
			obj2[i] = convertSave(obj[i],obj2[i]);
		}
		return obj2;
	} else {
		return obj;
	}
}

function clickTimerReduce(time) {
    if(clickTimer<33) clickTimer=0;
    else clickTimer-=time;
    update("timerButton", clickTimer);
}

function gameLoop() {
    var newTime = new Date().getTime();
    var diff = (newTime - user.lastTick) / 1000;
	update("testArea", newTime);
    user.lastTick = newTime;
    user.playtime += diff;
    clickTimerReduce(diff);
}

function hardReset() {
    if (confirm("Are you sure you want to delete your save?")) {
        clear()
    }
}

function clear() {
    localStorage.removeItem("save");
    user = getDefaultSave()
}

function startInterval(){
    load();
    setInterval(gameLoop, 33);
    setInterval(save, 5000);
}
	
setInterval(gameLoop, 33);
