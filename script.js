


$(function () {
  //gotta wait till the DOM is ready, woooooooooooooooo

  /* Establishing Constants */
  const INFO_API_URL = "https://net-elevation.avibagla.workers.dev/get-info"
  const nameInput = $("#name-input");
  const submitButton = $("#submit-button");
  const suggestions = $(".suggestion");



  async function getPersonData(name) {

    var response = await fetch(encodeURI(INFO_API_URL + "?name=" + name));
    const elevationInfo = await response.json();
    console.log(elevationInfo);

    return elevationInfo;


  }


  function nameSubmission(e, name) {
    e.preventDefault();

    nameInput.val("loading...");
    nameInput.prop("disabled", true);

    try {
      var elevationInfo = getPersonData(name);
      console.log(elevationInfo);

      nameInput.prop("disabled", false);
      nameInput.val("");


    } catch (error) {

      console.log(error);

      nameInput.prop("disabled", false);
      nameInput.val("");

    }






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

