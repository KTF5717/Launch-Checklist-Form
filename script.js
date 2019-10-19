// Write your JavaScript code here!
window.addEventListener("load", function(){
   let form = document.querySelector("form");
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         setMissionTarget(json[Math.floor(Math.random()*5)]);      
      });
   });
   form.addEventListener("submit", function(event){
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
         event.preventDefault();
         return false
      }
      if(isNaN(pilotNameInput.value) == false || isNaN(copilotNameInput.value) == false || isNaN(fuelLevelInput.value) == true || isNaN(cargoMassInput.value) == true){
         alert("Valid inputs required!");
         event.preventDefault();
      }
      
      pilotsReady(pilotNameInput.value);
      copilotsReady(copilotNameInput.value);
      updateLaunchStatus(fuelLevelInput.value, cargoMassInput.value);
      event.preventDefault();
   })
})

function pilotsReady(pilotNameInput){
   let pilotStatus = document.getElementById("pilotStatus");
   pilotStatus.innerHTML = `Pilot Ready: ${pilotNameInput}`
}

function copilotsReady(copilotNameInput){
   let copilotStatus = document.getElementById("copilotStatus");
   copilotStatus.innerHTML = `Co-pilot Ready: ${copilotNameInput}`
}

function updateLaunchStatus(fuelLevelInput, cargoMassInput){
   let fuelLevelValid = true
   let cargoMassValid = true
   if(fuelLevelInput < 10000){
      document.getElementById("faultyItems").style.visibility="visible"
      document.getElementById("fuelStatus").innerHTML="Fuel level is not high enough for launch."
      document.getElementById("launchStatus").innerHTML="Shuttle not ready for launch"
      document.getElementById("launchStatus").style.color="red"  
      fuelLevelValid = false   
   } 
   else{
      document.getElementById("fuelStatus").innerHTML="Fuel level high enough for launch"
   }
   if(cargoMassInput > 10000){
      document.getElementById("faultyItems").style.visibility="visible"
      document.getElementById("cargoStatus").innerHTML="Cargo is too heavy."
      document.getElementById("launchStatus").innerHTML="Shuttle not ready for launch"
      document.getElementById("launchStatus").style.color="red" 
      cargoMassValid = false 
   }
   else{
      document.getElementById("cargoStatus").innerHTML="Cargo mass low enough for launch"
   }
   if(fuelLevelValid && cargoMassValid){
      document.getElementById("launchStatus").innerHTML="Shuttle is ready for launch"
      document.getElementById("launchStatus").style.color="green"
      document.getElementById("faultyItems").style.visibility="hidden" 
   }
}

function setMissionTarget(planet){
   document.getElementById("missionTarget").innerHTML=`<h2>Mission Destination</h2>
   <ol>
      <li>Name: ${planet.name}</li>
      <li>Diameter: ${planet.diameter}</li>
      <li>Star: ${planet.star}</li>
      <li>Distance from Earth: ${planet.distance}</li>
      <li>Number of Moons: ${planet.moons}</li>
   </ol>
   <img src="${planet.image}">`
}
/* This block of code shows how to format the HTML once you fetch some planetary JSON!

<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
