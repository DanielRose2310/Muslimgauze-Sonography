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
          let url = "https://muslimgauze-database.herokuapp.com/users/login/"
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
                      //location.reload();
                  } else if (Array.isArray(data)) {
                      $(".usermessage").show().html(data[0].message).css('color', 'red').delay(2000).fadeOut();
                  } else if ('message' in data) {
                      $(".usermessage").show().html(data.message).css('color', 'red').delay(2000).fadeOut();
                  }
              })
      })

      }