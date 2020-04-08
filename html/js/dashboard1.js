// Get API
const covoidAPI = 'https://covid-19-data.p.rapidapi.com/country/all?format=undefined'; // This is the API we use for the Gov UK API

// HTML Variables 
var totalCases = document.getElementById("totalCases");
var totalDeaths = document.getElementById("totalDeaths");
var totalRecovered = document.getElementById("totalRecovered");
var totalCritical = document.getElementById("totalCritical");
var top5DeathRate = document.getElementById("top5Deaths");

///////////////////
/// Access Data ///
///////////////////

// Cases 
var confirmedCases; // Confirmed number of coronavirus cases
var confirmedCasesTotal; // Total number of cases added together

// Deaths
var confirmedDeaths; // Confirmed number of coronavirus deaths
var confirmedDeathsTotal; // Total number of deaths added together

// Recovered
var confirmedRecovered; // Confirmed number of coronavirus recovered patients
var confirmedRecoveredTotal; // Total number of recovered patients added together

// Critical
var confirmedCritical; // Confirmed number of coronavirus critical patients
var confirmedCriticalTotal; // Total number of critical patients added together

// All Data
var allCountryData;

// Top 5 Countries With Deaths
var top5Deaths;

// Extract header json
var col = [];

// Fetch API
fetch(covoidAPI, {
	"method": "GET",
	"headers": {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "19d11ca5e0msh79283c33ca75520p1c9619jsn279e97674bf8"
        }})
    .then(blob => blob.json()) // Fetch the information from the JSON
    .then(data => covoidFunction(data)) // Call the function after the fetch

    // Function to be called after the fetch
    function covoidFunction(data) {
        allCountryData = data;

         // Confirmed Cases/Deaths/Recovered/Critical
         confirmedCases = allCountryData.map(post => post.confirmed);
         confirmedDeaths = allCountryData.map(post => post.deaths);
         confirmedRecovered = allCountryData.map(post => post.recovered);
         confirmedCritical = allCountryData.map(post => post.critical);

         // Add up all cases together
         confirmedCasesTotal = confirmedCases.reduce(add,0); 
         confirmedDeathsTotal = confirmedDeaths.reduce(add,0); 
         confirmedRecoveredTotal = confirmedRecovered.reduce(add,0); 
         confirmedCriticalTotal = confirmedCritical.reduce(add,0); 

         // Function for the add cases ^
         function add(accumulator, a) {
             return accumulator + a;
         }

        // Sort Deaths by highest/lowest
        allCountryData.sort(function(a, b){
            return a.deaths-b.deaths
        });  
        
         // Show only top 5 countrys by death rate
         top5Deaths = allCountryData.slice(Math.max(allCountryData.length - 5, 1)).reverse();
         
         // So we can take the name out of the array
         topCountryDeaths = top5Deaths.map(post => post.country);
         
         // Appened Variable to HTML Divs
         totalCases.innerHTML = confirmedCasesTotal;
         totalDeaths.innerHTML = confirmedDeathsTotal;
         totalRecovered.innerHTML = confirmedRecoveredTotal;
         totalCritical.innerHTML = confirmedCriticalTotal;
         //top5DeathRate.innerHTML = topCountryDeaths; 
        
         // Extract header json
         for (var i = 0; i < top5Deaths.length; i++) {
            for (var key in top5Deaths[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                    console.log (key);
                }
            }
        }

      // Create table.
      var table = document.createElement("table");
      table.classList.add('table');

      // Create the header from the data extrated above.

      var tr = table.insertRow(-1); // Table row

      for (var i = 0; i < col.length; i++) {
          var th = document.createElement("th");  // Table Header
          th.innerHTML = col[i];
          tr.appendChild(th);
      }

      // Add json data
      for (var i = 0; i < top5Deaths.length; i++) {

          tr = table.insertRow(-1);

          for (var j = 0; j < col.length; j++) {
              var tabCell = tr.insertCell(-1);
              tabCell.innerHTML = top5Deaths[i][col[j]];
          }
      }

      // Create table and append to the html element.
      var divContainer = document.getElementById("showData");
      divContainer.innerHTML = "";
      divContainer.appendChild(table);


      // Create Pie Chart using Chart.js
      dataMapDeath = top5Deaths.map(post => post.deaths);
      dataLabelDeath = top5Deaths.map(post => post.country);
      dataLabelRecoveries = top5Deaths.map(post => post.recovered);


      var table2 = table
      var data = {dataLabelDeath, dataMapDeath}
      
      // Pie Chart 1
      var canvasP = document.getElementById("pieChart")
      var ctxP = canvasP.getContext('2d')
      var myPieChart = new Chart(ctxP, {
        type: 'pie',
        data: {
          labels: data.dataLabelDeath,
          datasets: [{
            data: data.dataMapDeath,
            backgroundColor: ["#64B5F6", "#FFD54F", "#2196F3", "#FFC107", "#1976D2"],
            hoverBackgroundColor: ["#B2EBF2", "#FFCCBC", "#4DD0E1", "#FF8A65", "#00BCD4"]
          }]
        },
        options: {
          legend: {
            display: true,
            position: "right",
            padding: 20,
            fontSize: 20,
          }
        }
      })

// pie chart 2
var table3 = table;
      var data2 = {dataLabelDeath, dataLabelRecoveries}
    
      var canvasP = document.getElementById("pieChart2")
      var ctxP = canvasP.getContext('2d')
      var myPieChart = new Chart(ctxP, {
        type: 'pie',
        data: {
          labels: data2.dataLabelDeath,
          datasets: [{
            data: data2.dataLabelRecoveries,
            backgroundColor: ["#64B5F6", "#FFD54F", "#2196F3", "#FFC107", "#1976D2"],
            hoverBackgroundColor: ["#B2EBF2", "#FFCCBC", "#4DD0E1", "#FF8A65", "#00BCD4"]
          }]
        },
        options: {
          legend: {
            display: true,
            position: "right",
            padding: 20,
            fontSize: 20,
          }
        }
      })

  }


  
  
    


