// Define UI elements
let ui = {
    timer: document.getElementById('timer'),
    robotState: document.getElementById('robot-state'),
    camera1: document.getElementById('camera1'),
    gearText: document.getElementById('gear-state'),
    autoSelect: document.getElementById('auto-select'),
    climberState: document.getElementById('climb-state'),
    assistState: document.getElementById('assist-state'),
    armState: document.getElementById('arm-state'),
    rectUp: document.getElementById('rectUp'),
    rectDown: document.getElementById('rectDown')
};

// Update camera every second. This is necessary because if the camera disconnects during the match, it will not automatically reconnect
setInterval(() => {
    // TEST IMAGES:
     //ui.camera1.style.backgroundImage = 'url("https://i.ytimg.com/vi/ekthcIHDt3I/maxresdefault.jpg")';
    ui.camera1.style.backgroundImage = 'url("http://10.26.19.22:1181/stream.mjpg")';
}, 500);


// Update match timer
NetworkTables.addKeyListener('/robot/time', (key, value) => {
    ui.timer.textContent = value < 0 ? '0:00' : Math.floor(value / 60) + ':' + (value % 60 < 10 ? '0' : '') + value % 60;
});

// Error handler
addEventListener('error',(ev)=>{
    ipc.send('windowError',{mesg:ev.message,file:ev.filename,lineNumber:ev.lineno})
});

//Event Listeners:

NetworkTables.addKeyListener('/SmartDashboard/High Gear', (key, value) => { //FINAL NETWORKTABLE VALUE
    if(value == true) {
        ui.gearText.innerHTML = 'HIGH';
        ui.gearText.classList.add(on);
        ui.gearText.classList.remove(off);
    } else {
        ui.gearText.innerHTML = 'LOW';
        ui.gearText.classList.add(off);
        ui.gearText.classList.remove(on);
    }
});
NetworkTables.addKeyListener('/SmartDashboard/Driver Assist', (key, value) => { //FINAL NETWORKTABLE VALUE
    if(value == true) {
        ui.assistState.innerHTML = 'CONNECTED';
        ui.assistState.classList.add(on);
        ui.assistState.classList.remove(off);
    } else {
        ui.assistState.innerHTML = 'DISCONNECTED';
        ui.assistState.classList.add(off);
        ui.assistState.classList.remove(on);
    }
});
NetworkTables.addKeyListener('/SmartDashboard/Auto Climb', (key, value) => { //FINAL NETWORKTABLE VALUE
    if(value == true) {
        ui.climberState.innerHTML = 'ACTIVE';
        ui.climberState.classList.add(on);
        ui.climberState.classList.remove(off);
    } else {
        ui.climberState.innerHTML = 'INACTIVE';
        ui.climberState.classList.add(off);
        ui.climberState.classList.remove(on);
    }
});
NetworkTables.addKeyListener('/SmartDashboard/Arm Up', (key, value) => { //FINAL NETWORKTABLE VALUE
    if(value == true) {
        ui.armState.innerHTML = 'UP';
        ui.armState.classList.add(on);
        ui.armState.classList.remove(off);

        ui.rectUp.setAttribute("opacity", "1.0");
        ui.rectDown.setAttribute("opacity", "0.15");

    } else {
        ui.armState.innerHTML = 'DOWN';
        ui.armState.classList.add(off);
        ui.armState.classList.remove(on);

        ui.rectUp.setAttribute("opacity", "0.15");
        ui.rectDown.setAttribute("opacity", "1.0");
    }
});


// UNTESTED:
// Load list of prewritten autonomous modes
NetworkTables.addKeyListener('/SmartDashboard/AutoSelect', (key, values) => { //FINAL NETWORKTABLE VALUE
    // Clear previous list
    // while (ui.input.autoSelect.firstChild) {
    //     ui.input.autoSelect.removeChild(ui.input.autoSelect.firstChild);
    // }
    // Make an option for each autonomous mode and put it in the selector
    // for (let i = 0; i < value.length; i++) {
    //     var option = document.createElement('option');
    //     option.appendChild(document.createTextNode(value[i]));
    //     ui.input.autoSelect.appendChild(option);
    // }
    // // Set value to the already-selected mode. If there is none, nothing will happen.
    // ui.input.autoSelect.value = NetworkTables.getValue('/SmartDashboard/currentlySelectedMode');

    while(ui.autoSelect.options.length > 0){
    	ui.autoSelect.remove(0);
    }
  for (let i = 0; i < values.length; i++) {
        var option = document.createElement('option');
        option.text = values[i].getName();
        option.value = values[i];
        ui.autoSelect.add(option,null);
    }
    // Set value to the already-selected mode. If there is none, nothing will happen.
    //ui.input.autoSelect.value = NetworkTables.getValue('/SmartDashboard/currentlySelectedMode');
});