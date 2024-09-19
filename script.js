


$(function () {
  //gotta wait till the DOM is ready, woooooooooooooooo

  /* Establishing Constants */
  const INFO_API_URL = "https://net-elevation.avibagla.workers.dev/get-info"
  const nameInput = $("#name-input");
  const submitButton = $("#submit-button");
  const suggestions = $(".suggestion");


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
    // console.log(elevationInfo);

    return elevationInfo;


  }


  /**Let's create a bunch of little functions to handle each html section */

  function elevationHTML(elevationInfo) {

    const birthDateFormatted = formatDateWithSuffix(elevationInfo.birthDate);
    const deathDateFormatted = formatDateWithSuffix(elevationInfo.deathDate);
    const birthElevationFeet = (elevationInfo.birthElevation * 3.28084).toFixed(2); // Conversion to feet
    const deathElevationFeet = (elevationInfo.deathElevation * 3.28084).toFixed(2);
    const distanceKm = (elevationInfo.distance / 1000).toFixed(2); // Convert meters to kilometers


    const mainHTML = `
      <div class="main-result">
        <h3 class="elevation-main-result">
          <span class="elevation-celeb-name">${elevationInfo.name}'s</span> net elevation was
          <span class="net-elevation-number">${elevationInfo.elevationChange} meters</span> (${(elevationInfo.elevationChange * 3.28084).toFixed(2)} ft)
        </h3>
      </div>
      <div class="map-container">
      <div id="key-map"></div>
      <div class="emoji-credit">
        <a target="_blank" href="https://icons8.com/icon/y5aqtLBZHmCy/headstone">Headstone</a> and <a target="_blank" href="https://icons8.com/icon/101036/baby-bottle">Baby Bottle</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
      
      </div>
    </div>
      <div class="details">
      <div class="result-name">
        <h2>${elevationInfo.name}</h2>
      </div>
      <div class="image-container">
        <img src="${elevationInfo.wikiImage}" alt="Photo of ${elevationInfo.name}">
      </div>
      <div class="stats-text">
        <p>${elevationInfo.name} was born on <span class="special-info"><time datetime="${elevationInfo.birthDate}">${birthDateFormatted}</time></span> in <span class="special-info">${elevationInfo.birthLocation}</span>, which has an elevation of <span class="special-info">${elevationInfo.birthElevation} meters (${birthElevationFeet} feet).</span></p>
        <p>${elevationInfo.name} died on <span class="special-info"><time datetime="${elevationInfo.deathDate}">${deathDateFormatted}</time></span> in <span class="special-info">${elevationInfo.deathLocation}</span>, which has an elevation of <span class="special-info">${elevationInfo.deathElevation} meters (${deathElevationFeet} feet).</span></p>
        <p>That means ${elevationInfo.name} had a net elevation change of <span class="special-info">${elevationInfo.elevationChange} meters (${(elevationInfo.elevationChange * 3.28084).toFixed(2)} ft)</span>, with a distance of <span class="special-info">${distanceKm} km</span>, resulting in a slope of <span class="special-info">${(elevationInfo.elevationChange / (elevationInfo.distance + .0001) * 100).toFixed(2)}%.</span></p>
      </div>
    </div>
  `;
    return mainHTML;
  }


  function handleError(err) {
    //TODO Handle errors like person still alive, place doesn't exist, etc, server error

    console.log(err);

    var myNote = "";

    console.log(err);

    $(".submission-suggestions").addClass("slide-up");
    $(".submission-suggestions").on('transitionend', function () {
      $(this).remove();
    });
    if (err.details === "There is no birthday associated with this wiki search") {
      myNote = "Hey buddy, when we check wikipedia, this search has no birthday... did you look up an inanimate object? This starts to trigger some philsophical questions, that I, as a website, cannot help you with. Well, some websites can - just not this one."
    } else if (err.details === "There is no deathday associated with this wiki search") {
      myNote = "So it appears that this person is still alive. Can't really help you here, can't calculate their net elevation if it's still changing. I guess... I'm sorry they're not dead?"
    } else if (err.details === "Cannot read properties of undefined (reading '0')"){
      myNote = "Okay.... so you either 1) keyboard smashed, 2) mispelled the name you're looking for or 3) put a bunch of numbers in this for no reason. If it's a common mispelling, I'll get around to trying to fix it! Try searching again!";

    } else if(err.details.includes("openstreetmap")){
      myNote = "So, the place that this person died or was born in seems to not exist on Open Street Map. I'll see what I can do.";

    } else {
      myNote = "Okay, so I definitely messed up something on the backend. I'm sorry. I've reported this mistake to Santa Claus, my one true savior, and they (yes Santa uses they/them pronouns) will find the appropriate way to punish me until I fix said error."
    }


    var errorHTML = `
          <div class="error-message">
            <h3>AN ERROR HAS OCCURED</h3>
            <h6>let's see what happened....</h6>
            <p class="error-text">${myNote}</p>
          
          </div>
      `


    console.error(errorHTML);
    $("#results").html(errorHTML)

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

    console.log(info);

    console.log(birthCoords, deathCoords);

    var latlngs = [
      [birthCoords.lat, birthCoords.lon],
      [deathCoords.lat, deathCoords.lon],
    ];
    console.log(latlngs)

    var lineForDistance = L.polyline(latlngs, { color: "#000000", weight: 5, opacity: 0.8 }).addTo(map);

    var birthMarker = L.marker([birthCoords.lat, birthCoords.lon], {icon:birthIcon})
      .bindPopup(`
        
        <div class="popup-content popup-birth">
          <h4 class="popup-title">Birthplace</h4>
          <p><strong>Location:</strong> ${info.birthLocation}</p>
          <p><strong>Elevation:</strong> ${info.birthElevation} meters</p>
        </div>
        
        `)
      .addTo(map);
    var deathMarker = L.marker([deathCoords.lat, deathCoords.lon], {icon:deathIcon})
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
      console.log(elevationInfo);
      if(elevationInfo.error){
        throw elevationInfo;
      };
      // console.log(elevationInfo);
      var resultsHTML = elevationHTML(elevationInfo);
      console.log(resultsHTML);
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

    // console.log(elevationInfo);
    // try {

    // } catch (error) {
    //   console.log(error);
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



  // console.log(suggestions)


  suggestions.click(function (e) {
    // console.log(e);
    console.log($(this).text())
    nameSubmission(e, $(this).text());
  });




})

