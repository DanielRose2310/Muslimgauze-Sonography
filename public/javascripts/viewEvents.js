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

              if ($("#titlesearchinput").val()) {

                  fetch(`https://muslimgauze-database.herokuapp.com/tracks/titlesearch/${$("#albumsearchinput").val()}/`, {
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
              if (!localStorage.getItem("shoptoken")) {
                  $('#usermodal').slideDown();
              } else {
                  localStorage.removeItem("shoptoken");
                  localStorage.removeItem("shoptoken");
                  localStorage.removeItem("cart");
                  location.reload();
              }
          })
          $('.cancelloginbtn').on('click', function () {
              $('.usermodal').slideUp();
          })
      }