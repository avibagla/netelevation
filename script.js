

var compsTest = [
  {
    "name": "Average Human (height)",
    "elevation": 1.75,
  },
  {
    "name": "Statue of Liberty",
    "elevation": 93,
  },
  {
    "name": "Golden Gate Bridge",
    "elevation": 227,
  },
  {
    "name": "Eiffel Tower",
    "elevation": 300,
  },
  {
    "name": "Burj Khalifa",
    "elevation": 828,
  },
  {
    "name": "Mauna Kea",
    "elevation": 4207,
  },
  {
    "name": "Mount Everest",
    "elevation": 8848,
  }
]


var comps = [
  {
    "name": "Nothingness",
    "elevation": 0.0,
    "image": "https://images.pexels.com/photos/17175670/pexels-photo-17175670/free-photo-of-flat-lay-with-blank-writing-sheet-pen-and-crumpled-paper-balls-on-top-of-wooden-office-desk-writer-s-block-or-creativity-crisis-concept-top-down-view.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    "name": "Apple",
    "elevation": 0.1,
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pink_lady_and_cross_section.jpg/1920px-Pink_lady_and_cross_section.jpg"
  },
  {
    "name": "Average Human",
    "elevation": 1.75,
    "image": "https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    "name": "Basketball Hoop",
    "elevation": 3.05,
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Basketball_net.jpg/1920px-Basketball_net.jpg"
  },
  {
    "name": "Double-Decker Bus",
    "elevation": 4.4,
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/LTZ1747-9-20240417-173412.jpg/1920px-LTZ1747-9-20240417-173412.jpg"
  },
  {
    "name": "Telephone Pole",
    "elevation": 10,
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/2a/SIF-Overhead-Wires-1-Cropped.jpg"
  },
  {
    "name": "Leaning Tower of Pisa",
    "elevation": 57,
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Italy_-_Pisa_-_Leaning_Tower.jpg/440px-Italy_-_Pisa_-_Leaning_Tower.jpg"
  },
  {
    "name": "Statue of Liberty",
    "elevation": 93,
    "image":"https://images.pexels.com/photos/356844/pexels-photo-356844.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    "name": "Great Pyramid",
    "elevation": 139,
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/600px-Kheops-Pyramid.jpg"
  },
  {
    "name": "Golden Gate Bridge",
    "elevation": 227,
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Golden_Gate_Bridge_as_seen_from_Battery_East.jpg/1920px-Golden_Gate_Bridge_as_seen_from_Battery_East.jpg"
  },
  {
    "name": "Eiffel Tower",
    "elevation": 300,
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/500px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg"
  },
  {
    "name": "Burj Khalifa",
    "elevation": 828,
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Burj_Khalifa.jpg/1097px-Burj_Khalifa.jpg"
  },
  {
    "name": "Angel Falls (Venezuela)",
    "elevation": 979,
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/e9/SaltoAngel1.jpg"
  },
  {
    "name": "Half Dome",
    "elevation": 1444,
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg/544px-Half_Dome_from_Glacier_Point%2C_Yosemite_NP_-_Diliff.jpg"
  },
  {
    "name": "Mount Washington",
    "elevation": 1917,
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/White_Mountains_12_30_09_81.jpg/544px-White_Mountains_12_30_09_81.jpg"
  },
  {
    "name": "Mauna Kea",
    "elevation": 4207,
    "image": "https://c.pxhere.com/photos/1c/92/hawaii_big_iland_mauna_kea_sunset-1116816.jpg!s"
  },
  {
    "name": "Shahdagh Mountain",
    "elevation": 4243,
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/%C5%9Eahda%C4%9F_Mountain%2C_Qusar%2C_2013.JPG/1920px-%C5%9Eahda%C4%9F_Mountain%2C_Qusar%2C_2013.JPG"
  },
  {
    "name": "Mount Everest",
    "elevation": 8848,
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Mount_Everest_as_seen_from_Drukair2_PLW_edit_Cropped.jpg/576px-Mount_Everest_as_seen_from_Drukair2_PLW_edit_Cropped.jpg"
  }
]


function findClosestComparisonItems(netElevation) {
  // Sort comparison points by elevation in ascending order

  netElevation = Math.abs(netElevation);

  comps.sort((a, b) => a.elevation - b.elevation);

  let lowerItem = comps[0];
  let higherItem = comps[comps.length - 1];


  // Iterate through the sorted comparison points

  
  for (let i = 0; i < comps.length; i++) {
    if (comps[i].elevation <= netElevation) {
      lowerItem = comps[i]; // Update lower item
    } else if (comps[i].elevation > netElevation) {
      higherItem = comps[i]; // Set the first higher item and break
      break;
    }
  }

  

  return { lowerItem, higherItem };
}




$(function () {
  //gotta wait till the DOM is ready, woooooooooooooooo

  /* Establishing Constants */
  const INFO_API_URL = "https://net-elevation.avibagla.workers.dev/get-info"
  const nameInput = $("#name-input");
  const submitButton = $("#submit-button");
  var suggestions = $(".suggestion");


  function formatDateWithSuffix(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date); // Full month name
    const year = date.getFullYear();

    // Function to get the correct ordinal suffix
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th'; // Covers 11th-13th
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

    return `${month} ${dayWithSuffix}, ${year}`;
  }

  async function getPersonData(name) {

    var response = await fetch(encodeURI(INFO_API_URL + "?name=" + name));
    const elevationInfo = await response.json();
    return elevationInfo;

  }


  var d3graphAdd = function (elevationInfo, lowerItem, higherItem) {

    const data = [
      lowerItem,
      { name: elevationInfo.name, elevation: Math.abs(elevationInfo.elevationChange) },
      higherItem
    ];

    const barColors = ['var(--bright-pink)', 'var(--ghost-white)', 'var(--true-blue)']

    

    const width = 380;
    const height = 400;
    const svg = d3.select("#comp-graph")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const margin = { top: 30, right: 30, bottom: 40, left: 40 };
    const contentWidth = width - margin.left - margin.right;
    const contentHeight = height - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([0, contentWidth])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.elevation)])
      .range([contentHeight, 0]);

    const chart = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Clear any existing x-axis to prevent duplication
    chart.selectAll("g.x-axis").remove();

    // Append the x-axis
    chart.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${contentHeight})`)
      .call(d3.axisBottom(x));

    // Append the y-axis
    chart.append("g")
      .call(d3.axisLeft(y));


    // Add bars with the background images
    chart.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.elevation))
      .attr("width", x.bandwidth())
      .attr("height", d => contentHeight - y(d.elevation))
      .attr("fill", (d, i) => barColors[i % barColors.length]);  // Use the pattern as fill


    // Add value labels (above the bars)
    chart.selectAll(".value-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "value-label")
      .text(d => `${d.elevation}m`)
      .attr("x", d => x(d.name) + x.bandwidth() / 2)
      .attr("y", d => y(d.elevation) - 10)
      .attr("text-anchor", "middle")
      .attr("font-family", '"orbital"')
      .attr("font-weight", "900")
      .attr("fill", "var(--ghost-white)");
  };

    



  /**Let's create a bunch of little functions to handle each html section */



  function elevationHTML(elevationInfo) {


    function timeDiffCalc(date1, date2) {
      let d1 = new Date(date1);
      let d2 = new Date(date2);
      let differenceInMs = d2 - d1;

      return differenceInMs

    }

    const birthDateFormatted = formatDateWithSuffix(elevationInfo.birthDate);
    const deathDateFormatted = formatDateWithSuffix(elevationInfo.deathDate);
    const birthElevationFeet = (elevationInfo.birthElevation * 3.28084).toFixed(2); // Conversion to feet
    const deathElevationFeet = (elevationInfo.deathElevation * 3.28084).toFixed(2);
    const distanceKm = (elevationInfo.distance / 1000).toFixed(2); // Convert meters to kilometers
    const { lowerItem, higherItem } = findClosestComparisonItems(elevationInfo.elevationChange);
    const timeDiff = timeDiffCalc(elevationInfo.birthDate, elevationInfo.deathDate);

    const rateChange = (Math.abs(elevationInfo.elevationChange) / (timeDiff / (1000 * 60 * 60 * 24 * 365))).toFixed(2);

    const mainImage = elevationInfo.wikiImage ? elevationInfo.wikiImage : "./images/notfound.png"



    const mainHTML = `
      <div class="main-result">
              <h3 class="elevation-main-result">
                  <span class="elevation-celeb-name">${elevationInfo.title}'s</span> net elevation was
                  <span class="net-elevation-number">${elevationInfo.elevationChange} meters</span>
                  (${(elevationInfo.elevationChange * 3.28084).toFixed(2)} ft)
              </h3>
          </div>

           <div class="comparison-section">
            <div class="result-name">
                  <h4>Landmark Comparisons</42>
              </div>

              <div id="comp-graph"></div>

              <div class="comparison-images-section">

                  <div class="image-row">
                      <div class="comparison-image"
                          style="background-image: url('${lowerItem.image}');">
                      </div>
                      <div class="comparison-image"
                          style="background-image: url('${mainImage}');">
                      </div>
                      <div class="comparison-image"
                          style="background-image: url('${higherItem.image}');">
                      </div>
                  </div>


              </div>
          </div>
          <div class="map-container">
              <div id="key-map"></div>
              <div class="emoji-credit">
                  <a target="_blank" href="https://icons8.com/icon/1643/headstone">Headstone</a> and <a target="_blank"
                      href="https://icons8.com/icon/7550/babys-room">Baby </a> icon by <a target="_blank"
                      href="https://icons8.com">Icons8</a>

              </div>


          </div>

         



          <div class="details">
              <div class="result-name">
                  <h2>${elevationInfo.title}</h2>
              </div>
              <div class="image-container">
                  <img src="${mainImage}" alt="Photo of ${elevationInfo.title}">
              </div>
              <div class="stats-text">
                  <p>${elevationInfo.title} was born on <span class="special-info"><time
                              datetime="${elevationInfo.birthDate}">${birthDateFormatted}</time></span> in <span
                          class="special-info">${elevationInfo.birthLocation}</span>, which has an elevation of <span
                          class="special-info">${elevationInfo.birthElevation} meters (${birthElevationFeet} feet).</span></p>
                  <p>${elevationInfo.title} died on <span class="special-info"><time
                              datetime="${elevationInfo.deathDate}">${deathDateFormatted}</time></span> in <span
                          class="special-info">${elevationInfo.deathLocation}</span>, which has an elevation of <span
                          class="special-info">${elevationInfo.deathElevation} meters (${deathElevationFeet} feet).</span></p>
                  <p>That means ${elevationInfo.title} had a net elevation change of <span
                          class="special-info">${elevationInfo.elevationChange} meters (${(elevationInfo.elevationChange *
        3.28084).toFixed(2)} ft)</span>, with a distance of <span class="special-info">${distanceKm} km
                          (${(distanceKm * 0.6213712).toFixed(2)} mi)</span>, resulting in a slope of <span
                          class="special-info">${(elevationInfo.elevationChange / (elevationInfo.distance + .0001) *
        100).toFixed(2)}%.</span></p>
                <p>As a result, ${elevationInfo.title} <span class="special-info">${elevationInfo.elevationChange < 0 ? " descended" : "ascended"}</span> at a rate of <span class="special-info">${rateChange}m per year</span></p>

              </div>
          </div>
  `;

    setTimeout(() => {
      d3graphAdd(elevationInfo, lowerItem, higherItem);

    }, 100);
    return mainHTML;



  }

  


  // d3graphAdd(elevationInfo, lowerItem, higherItem);


  // var testImages = function () {
  //   var testPerson = {
  //     name: "Abraham Lincoln",
  //     title: "Abraham Lincoln",
  //     birthDate: "1809-02-12",
  //     deathDate: "1865-04-15",
  //     birthLocation: "Abraham Lincoln Birthplace National Historical Park",
  //     birthElevation: 228,
  //     deathLocation: "Washington, DC, US",
  //     deathElevation: 4,
  //     wikiURL: "https://en.wikipedia.org/wiki/Abraham_Lincoln",
  //     wikiImage: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg",
  //     elevationChange: -224,
  //     distance: 274561.9974954496
  //   }

  //   var start = 17;

  //   d3graphAdd(testPerson, comps[start], comps[start + 1]);

  //   var imageHTML = `
  //   <div class="comparison-images-section">

  //                 <div class="image-row">
  //                     <div class="comparison-image"
  //                         style="background-image: url('${comps[start].image}');">
  //                     </div>
  //                     <div class="comparison-image"
  //                         style="background-image: url('${testPerson.wikiImage}');">
  //                     </div>
  //                     <div class="comparison-image"
  //                         style="background-image: url('${comps[start+1].image}');">
  //                     </div>
  //                 </div>
  //                 `
  //   $(".comparison-images-section").html("");

  //   $(".comparison-images-section").html(imageHTML);

  // }

  function handleError(err) {
    //TODO Handle errors like person still alive, place doesn't exist, etc, server error

    

    var myNote = "";
    var myTitle = ""

    

    $(".submission-suggestions").addClass("slide-up");
    $(".submission-suggestions").on('transitionend', function () {
      $(this).remove();
    });

    console.log(err)

    if (err.details === "No birthday associated with this wiki search") {
      myTitle = "Inanimate Object?";
      myNote = "Hey buddy, when we check Wikipedia, this search has no birthday... did you look up an inanimate object? This starts to trigger some philsophical questions, that I, as a website, cannot help you with. Well, some websites can - just not this one."
    } else if (err.details === "No deathday associated with this wiki search") {
      myTitle = "Still Alive?";
      myNote = "So it appears that this person is still alive. Can't really help you here, unable to calculate their net elevation if it's still changing. I guess... I'm sorry they're not dead?"
    } else if (err.details === "Cannot read properties of undefined (reading '0')") {
      myTitle = "Button Masher?";
      myNote = "Okay.... so you either 1) keyboard smashed, 2) misspelled the name you're looking for or 3) put a bunch of numbers in this for no reason or 4) searched someone not on Wikipedia. If it's a common misspelling, I'll get around to trying to fix it! Try searching again!";

    } else if (err.details.includes("openstreetmap")) {
      myTitle = "Open Street Map";
      myNote = "So, the place that this person died or was born in seems to not exist on Open Street Map. I'll see what I can do.";

    } else {
      myTitle = "Probably Avi's Fault";
      myNote = "Okay, so I definitely messed up something on the backend. I'm sorry. I've reported this mistake to Santa Claus, my one true savior, and they (yes Santa uses they/them pronouns) will find the appropriate way to punish me until I fix said error."
    }


    var errorHTML = `
          <div class="error-message">
            <h3>ERROR: ${myTitle}</h3>
            <h6>god, errors suck</h6>
            <p class="error-text">${myNote}</p>

     
              <h5 class="suggestion-title error-title">Try one that does work:</h5>
              <div class="suggestion-row">
                <button class="suggestion" aria-label="submission suggestions">Abraham Lincoln</button>
                <button class="suggestion" aria-label="submission suggestions">Amy Winehouse</button>
                <button class="suggestion" aria-label="submission suggestions">Albert Einstein</button>

              </div>
              <div class="suggestion-row">
                <button class="suggestion" aria-label="submission suggestions">Marilyn Monroe</button>
                <button class="suggestion" aria-label="submission suggestions">James Earl Jones</button>
                <button class="suggestion" aria-label="submission suggestions">George Carlin</button>
              </div>
          
          </div>
      `



    $("#results").html(errorHTML);


    suggestions = $(".suggestion");


    suggestions.click(function (e) {
      // 
      
      nameSubmission(e, $(this).text());
    });

  }


  /*Map Information */
  var map;

  const birthIcon = L.icon({
    iconUrl: './images/birthicon.png', // URL to your custom icon for birth
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
  });

  const deathIcon = L.icon({
    iconUrl: './images/deathicon.png', // URL to your custom icon for death
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon
    popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
  });

  var addMapData = function (info) {
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',

    }).addTo(map);

    var birthCoords = JSON.parse(info.birthCoords);
    var deathCoords = JSON.parse(info.deathCoords);

    if (typeof (deathCoords) == "string") { deathCoords = JSON.parse(deathCoords); }
    if (typeof (birthCoords) == "string") { birthCoords = JSON.parse(birthCoords); }


    

    var latlngs = [
      [birthCoords.lat, birthCoords.lon],
      [deathCoords.lat, deathCoords.lon],
    ];


    var lineForDistance = L.polyline(latlngs, { color: "var(--true-blue)", weight: 5, opacity: 0.8 }).addTo(map);

    var birthMarker = L.marker([birthCoords.lat, birthCoords.lon], { icon: birthIcon })
      .bindPopup(`
        
        <div class="popup-content popup-birth">
          <h4 class="popup-title">Birthplace</h4>
          <p><strong>Location:</strong> ${info.birthLocation}</p>
          <p><strong>Elevation:</strong> ${info.birthElevation} meters</p>
        </div>
        
        `)
      .addTo(map);
    var deathMarker = L.marker([deathCoords.lat, deathCoords.lon], { icon: deathIcon })
      .bindPopup(`
        <div class="popup-content popup-death">
          <h4 class="popup-title">Deathplace</h4>
          <p><strong>Location:</strong> ${info.deathLocation}</p>
          <p><strong>Elevation:</strong> ${info.deathElevation} meters</p>
        </div>
        `)
      .addTo(map);

    map.fitBounds(lineForDistance.getBounds());

  };




  /**This is where ALL the work happens */
  async function nameSubmission(e, name) {
    if (!map) {
      map = L.map("key-map", {
        center: [48.3984968, 9.9912458],
        zoom: 6,
        scrollWheelZoom: false, // Disable zooming with the scroll wheel
        doubleClickZoom: false, // Disable zooming on double click
        touchZoom: false, // Disable zooming with touch gestures
        zoomControl: false // Optionally hide zoom control buttons
      }).setView([40.687, -73.98], 13);
    }

    // if (e) { e.preventDefault(); }

    if (name == "") { return }
    nameInput.val("loading...");
    nameInput.prop("disabled", true);
    var elevationInfo;

    try {
      elevationInfo = await getPersonData(name);
      
      if (elevationInfo.error) {
        throw elevationInfo;
      };
      // 
      var resultsHTML = elevationHTML(elevationInfo);
      $("#results").html(resultsHTML)

      nameInput.prop("disabled", false);
      nameInput.val("");

      $(".submission-suggestions").addClass("slide-up");
      $(".submission-suggestions").on('transitionend', function () {
        $(this).remove();
      });


      setTimeout(() => {
        map = L.map("key-map").setView([40.687, -73.98], 13);
        addMapData(elevationInfo);  // Run addMapData after the DOM is updated
      }, 1);



    } catch (error) {

      handleError(error);

      nameInput.prop("disabled", false);
      nameInput.val("");

    }

    // 
    // try {

    // } catch (error) {
    //   
    // }

  }


  nameInput.on("keypress", (e) => {
    if (e.keyCode === 13) {
      var value = nameInput.val();
      nameSubmission(e, value);
    }
  });

  submitButton.click(function () {
    nameSubmission(null, nameInput.val())
  });



  // 


  suggestions.click(function (e) {
    // 
    
    nameSubmission(e, $(this).text());
  });






})

