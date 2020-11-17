      import {
          parseData
      } from './tracksManager.js'
      export const declareViewEvents = () => {
      document.querySelector("#sortmenu").addEventListener("change", () => {
          if ($("#sortmenu").val() === "track") {
              parseData(tracks, "title")
          }

          if ($("#sortmenu").val() === "album") {
              parseData(tracks, "album")
          }
          if ($("#sortmenu").val() === "yearasc") {
              parseData(tracks, "yearasc");
          }
          if ($("#sortmenu").val() === "yeardesc") {
              parseData(tracks, "yeardesc");
          }
      })

      $("#searchtitlebtn").on('click', function () {
          if ($("#titlesearchinput").val()) {
              fetch(`https://muslimgauze-database.herokuapp.com/tracks/titlesearch/${$("#titlesearchinput").val()}/`, {
                      headers: {
                          'Content-Type': 'application/json',
                      }
                  })
                  .then(function (response) {
                      return response.json()
                  })
                  .then(function (jsonData) {
                      parseData(jsonData, "title")
                  })
              $("#titlesearchinput").val('')
              $("#sortmenu").val('start').change();

          }
      })


      $("#searchalbumbtn").on('click', function () {

          if ($("#albumsearchinput").val()) {
              fetch(`https://muslimgauze-database.herokuapp.com/tracks/albumsearch/${$("#albumsearchinput").val()}/`, {
                      headers: {
                          'Content-Type': 'application/json',
                      }
                  })
                  .then(function (response) {
                      return response.json()
                  })
                  .then(function (jsonData) {
                      parseData(jsonData, "title")
                  })
              $("#albumsearchinput").val('')
              $("#sortmenu").val('start').change();


          }
      })

      $('#loginshowbtn').on('click', function () {
          if (!localStorage.getItem("dbtoken")) {
              $('#usermodal').slideDown();
          } else {
              localStorage.removeItem("dbtoken");
              localStorage.removeItem("shoptoken");
              localStorage.removeItem("cart");
              location.reload();
          }
      })
      $('.cancelloginbtn').on('click', function () {
          $('.usermodal').slideUp();
      })

      $("#usersubmitbtn").on('click', function (evt) {

          evt.preventDefault()
          let dataBody = {
              user: $("#id_user_input").val(),
              pass: $("#id_pass_input").val()
          }
          let url = "http://localhost:3000/users/login/"
          fetch(url, {
                  method: "POST",
                  body: JSON.stringify(dataBody),
                  headers: {
                      'content-type': "application/json"
                  }
              })
              .then(resp => resp.json())
              .then(data => {
                  console.log(data)
                  if (data.token) {
                      localStorage.setItem("dbtoken", data.token)
                      $(".usermessage").show().html(`Welcome back ${dataBody.user}!`).css('color', 'green').delay(2500).fadeOut();
                      location.reload();
                  } else if (Array.isArray(data)) {
                      $(".usermessage").show().html(data[0].message).css('color', 'red').delay(2000).fadeOut();
                  } else if ('message' in data) {
                      $(".usermessage").show().html(data.message).css('color', 'red').delay(2000).fadeOut();
                  }
              })
      })
      $("#adminadd").on("click", () => {
        $(` <div class="add-content">
    <span id="closeadd" class="mr-auto">&times;</span>
    <div class="row"><label class="mx-2">Title:</label><input id="titleadd" style="width:400px"></input></div>
<div class="row my-3">
<label class="mx-2">Album Title:</label><input style="width:400px"  id="release1titleadd" '></input>
<label class="mx-2">Album Year:</label><input style="width:80px" type="number" id="release1yearadd" '></input>
<label class="mx-2">Album Format:</label><input  style="width:80px" id="release1formatadd" '></input> 
<label class="mx-2">Album Catalogue:</label><input style="width:200px"  id="release1catalogueadd"'></input> 
</div>
<div class="row my-3">
<label class="mx-2">Album Title:</label><input  style="width:400px"  id="release2titleadd"'></input>
<label class="mx-2">Album Year:</label><input style="width:80px" type="number" id="release2yearadd"'></input>
<label class="mx-2">Album Format:</label><input  style="width:80px" id="release2formatadd"'></input> 
<label class="mx-2">Album Catalogue:</label><input style="width:200px"  id="release2catalogueadd" '></input> 
</div>
<div class="row my-3">
<label class="mx-2">Album Title:</label><input  style="width:400px"  id="release3titleadd" '></input>
<label class="mx-2">Album Year:</label><input style="width:80px" type="number" id="release3yearadd" '></input>
<label class="mx-2">Album Format:</label><input  style="width:80px" id="release3formatadd" '></input> 
<label class="mx-2">Album Catalogue:</label><input style="width:200px"  id="release2catalogueadd"'></input> 
</div>
<button class="btn btn-success my-3" id="submittrack" style="width:100px";>Submit</button> 
    </div>

`).appendTo($("#addmodal").fadeIn());
$('#closeadd').on('click', function() {
    $(".addmodal").fadeOut();
    $('.addmodal').empty();
})
})


      }