


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
    console.log(elevationInfo);

    return elevationInfo;


  }


  /**Let's create a bunch of little functions to handle each html section */

  function elevationHTML(elevationInfo) {
    console.log(elevationInfo)

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
      <div class="details">
      <h2 class="result-name">${elevationInfo.name}</h2>
      <div class="image-container">
        <img src="${elevationInfo.wikiImage}" alt="Photo of ${elevationInfo.name}">
      </div>
      <div class="stats-text">
        <p>${elevationInfo.name} was born on <span class="special-info"><time datetime="${elevationInfo.birthDate}">${birthDateFormatted}</time></span> in <span class="special-info">${elevationInfo.birthLocation}</span>, which has an elevation of <span class="special-info">${elevationInfo.birthElevation} meters (${birthElevationFeet} feet).</span></p>
        <p>${elevationInfo.name} died on <span class="special-info"><time datetime="${elevationInfo.deathDate}">${deathDateFormatted}</time></span> in <span class="special-info">${elevationInfo.deathLocation}</span>, which has an elevation of <span class="special-info">${elevationInfo.deathElevation} meters (${deathElevationFeet} feet).</span></p>
        <p>That means ${elevationInfo.name} had a net elevation change of <span class="special-info">${elevationInfo.elevationChange} meters (${(elevationInfo.elevationChange * 3.28084).toFixed(2)} ft)</span>, with a distance of <span class="special-info">${distanceKm} km</span>, resulting in a slope of <span class="special-info">${(elevationInfo.elevationChange / (elevationInfo.distance+.0001) * 100).toFixed(2)}%.</span></p>
      </div>
    </div>
  `;
    return mainHTML;
  }


  function handleError(err) {
    //TODO Handle errors like person still alive, place doesn't exist, etc, server error
  }


  /*Map Information */

  var addMapData = function (info) {
    var map = L.map("map").setView([40.687, -73.98], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    var latlngs = [
      [info.birth.lat, info.birth.long],
      [info.death.lat, info.death.long],
    ];

    var polyline = L.polyline(latlngs, { color: "#000000", weight: 10, opacity: 0.3 }).addTo(map);
    map.fitBounds(polyline.getBounds());
  };

  /**This is where ALL the work happens */
  async function nameSubmission(e, name) {
    e.preventDefault();

    nameInput.val("loading...");
    nameInput.prop("disabled", true);
    var elevationInfo;

    try {
      elevationInfo = await getPersonData(name);
      console.log(elevationInfo);
      var resultsHTML = elevationHTML(elevationInfo);
      console.log(resultsHTML);
      $("#results").html(resultsHTML);
      
      nameInput.prop("disabled", false);
      nameInput.val("");




    } catch (error) {

      console.log(error);
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

  submitButton.click(nameSubmission);



  // console.log(suggestions)


  suggestions.click(function(e) {
    // console.log(e);
    console.log($(this).text())
    nameSubmission(e, $(this).text());
  });




})

