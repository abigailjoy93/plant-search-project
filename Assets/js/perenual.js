var root = document.getElementById("root");
var tbl = $("#tbl");
var thead = $("#thead");   
var tbody = $("#tbody");   

var APIBaseGetSpeciesUrl = "https://perenual.com/api/species-list?";   

var APIKey = "sk-z8cO64b9d312351e61631"; // Bill's API Key


// Use APIBaseURL before concatenating search parameters
APIBaseGetSpeciesUrl = APIBaseGetSpeciesUrl + "key=" + APIKey;

// function returns 1 page of plants
function getSpecies_Test() {
    fetch('https://perenual.com/api/species-list?key=sk-z8cO64b9d312351e61631&page=3',                 // *** No `assignment =` on this line
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                
            }
        })
        .then((response) => {
            if (response.status == 200) {   // *** This can be just `if (response.ok) {`
                console.log(response);      // *** This is premature
                return response.json();
            }
            else
            {
                throw `error with status ${response.status}`;
            }
        })
        .then(body => {               // *** This is where you want to log the response
            console.log("*************************");
            console.log(body);        
            return body;
        })                                  
        .catch((exception) => {
            console.log(exception);
        }); 
};


// cite: https://observablehq.com/@xari/paginated_fetch
//   for providing an example of how to iterate multiple
//   pages of results from an API call

    // ToDo: Add search parameters i.e. Sun, Water, Cycle, etc.
    //          to url 
// url = 'https://perenual.com/api/species-list?key=sk-z8cO64b9d312351e61631', 
//    page = 1,
//    previousResponse = []

function getSpecies_paginated_fetch(
    url = APIBaseGetSpeciesUrl, 
    page = 1
  ) {
    return fetch(`${url}&page=${page}`) // Append the page number to the base URL
      .then(response => response.json())
      .then(newResponse => {
        if(page===1) 
        {
            // to do reset table body            
            thead.append(`<tr><th>Scientific Name</th><th>Common Name</th><th>Other Name(s)</th><th>Water</th><th>Sunlight</th><th>Cycle</th></tr>`);
            tbody.append(`<tr><td id="scientific_name"></td><td id="common_name"></td><td id="other_name"></td><td id="watering"></td><td id="sunlight"></td><td id="cycle"></td></tr>`);
            
            // Clear the div that is holding the previous results
        }; 


        // This is where we'll write to the webpage

        for(let i=0;newResponse.data.length > i ;i++)
        {
            // paginate results
            tbody.append("<tr><td>" + newResponse.data[i].scientific_name + "</td><td>" + newResponse.data[i].common_name + "</td><td>" + newResponse.data[i].other_name + "</td><td>" + newResponse.data[i].watering + "</td><td>" + newResponse.data[i].sunlight + "</td><td>" + newResponse.data[i].cycle + "</td>" + "</tr>"); 
            tbl.append(tbody);
        };   

        // todo: remove governor on pages when
        // done testing. remove last && page < ???
        if (page <= newResponse.last_page && page < 4) {
          page++;
          // Making a recursive call to append results from all pages  
          return getSpecies_paginated_fetch(url, page);
        }

        });
  };

// const getSpeciesResponse = getSpecies_paginated_fetch();
// getSpecies_Test()// const getSpeciesResponse = getSpecies_Test2();

getSpecies_paginated_fetch();

// console.debug("--------------------------------------");
// console.debug(getSpeciesResponse);
