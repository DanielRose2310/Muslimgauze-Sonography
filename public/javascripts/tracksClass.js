import {
    admin
} from "./app.js"
export class Track {
    constructor(_title, _release1title, _release1year, _release1format, _release1catalogue,
        _release2title = "", _release2year = "", _release2format = "", _release2catalogue = "",
        _release3title = "", _release3year = "", _release3format = "", _release3catalogue = "", _id
    ) {
        this.title = _title;
        this.release1title = _release1title;
        this.release1year = _release1year;
        this.release1format = _release1format;
        this.release1catalogue = _release1catalogue;
        this.release2title = _release2title;
        this.release2year = _release2year;
        this.release2format = _release2format;
        this.release2catalogue = _release2catalogue;
        this.release3title = _release3title;
        this.release3year = _release3year;
        this.release3format = _release3format;
        this.release3catalogue = _release3catalogue;
        this.id = _id;
        this.render()
    }

    render() {
        let newTr = $("<tr></tr>")
        $("#id_parent").append(newTr);
        $(newTr).append(`

            <td align="center" class="align-middle">${this.title}</td>
      <td align="center" class="align-middle">${this.release1title}<br>${this.release1year}<br> ${this.release1format}<br>${this.release1catalogue} </td>
      <td align="center" class="align-middle">${this.release2title}<br>${this.release2year}<br> ${this.release2format}<br>${this.release2catalogue} </td>
      <td align="center" class="align-middle">${this.release3title}<br>${this.release3year}<br> ${this.release3format}<br>${this.release3catalogue} </td>            
    `)
        if (admin === true) {
            let editTd = $(`<td align="center" class="align-middle"></td>`)
            $(newTr).prepend(editTd);
            let editBtn = $(`<button  class="btn btn-info"><i class="fas fa-edit"></i></button>`);
            $(editTd).append(editBtn);
            $(editBtn).on("click", () => {
                $(` <div class="editmodal-content">
            <span id="close" class="mr-auto">&times;</span>
            <div class="row"><label class="mx-2">Title:</label><input id="titleedit" value='${this.title}'  style="width:400px"></input></div>
<div class="row my-3">
        <label class="mx-2">Album Title:</label><input style="width:400px"  id="release1titleedit" value='${this.release1title}'></input>
      <label class="mx-2">Album Year:</label><input style="width:80px" type="number" id="release1yearedit" value='${this.release1year}'></input>
    <label class="mx-2">Album Format:</label><input  style="width:80px" id="release1formatedit" value='${this.release1format}'></input> 
    <label class="mx-2">Album Catalogue:</label><input style="width:200px"  id="release1catalogueedit" value='${this.release1catalogue}'></input> 
</div>
<div class="row my-3">
        <label class="mx-2">Album Title:</label><input  style="width:400px"  id="release2titleedit" value='${this.release2title}'></input>
      <label class="mx-2">Album Year:</label><input style="width:80px" type="number" id="release2yearedit" value='${this.release2year}'></input>
    <label class="mx-2">Album Format:</label><input  style="width:80px" id="release2formatedit" value='${this.release2format}'></input> 
    <label class="mx-2">Album Catalogue:</label><input style="width:200px"  id="release2catalogueedit" value='${this.release2catalogue}'></input> 
</div>
    <div class="row my-3">
        <label class="mx-2">Album Title:</label><input  style="width:400px"  id="release3titleedit" value='${this.release3title}'></input>
      <label class="mx-2">Album Year:</label><input style="width:80px" type="number" id="release3yearedit" value='${this.release3year}'></input>
    <label class="mx-2">Album Format:</label><input  style="width:80px" id="release3formatedit" value='${this.release3format}'></input> 
    <label class="mx-2">Album Catalogue:</label><input style="width:200px"  id="release2catalogueedit" value='${this.release3catalogue}'></input> 
</div>
    <button class="btn btn-success my-3" id="submitedit" style="width:100px";>Submit</button> 
            </div>

   `).appendTo($("#editmodal").fadeIn());

                $("#submitedit").on("click", (evt) => {
                    let dataBody = {
                        _id: this.id,
                        title: $("#titleedit").val(),
                        releases: [{
                            albumtitle: $("#release1titleedit").val(),
                            albumyear: $("#release1yearedit").val(),
                            albumformat: $("#release1formatedit").val(),
                            albumcatalogue: $("#release1catalogueedit").val()
                        }, {
                            albumtitle: $("#release2titleedit").val(),
                            albumyear: $("#release2yearedit").val(),
                            albumformat: $("#release2formatedit").val(),
                            albumcatalogue: $("#release2catalogueedit").val()
                        }, {
                            albumtitle: $("#release3titleedit").val(),
                            albumyear: $("#release3yearedit").val(),
                            albumformat: $("#release3formatedit").val(),
                            albumcatalogue: $("#release3catalogueedit").val()
                        }]
                    }
                    console.log(dataBody)
                    let myUrl = "https://muslimgauze-database.herokuapp.com/tracks/edit";
                    fetch(myUrl, {
                            method: "PUT",
                            body: JSON.stringify(dataBody),
                            headers: {
                                'content-type': "application/json"
                            }
                        })
                        .then(resp => resp.json())
                        .then(data => {
                            if (data.ok) {
                                location.reload()
                            } else {
                                alert(data[0].message)
                            }
                        })
                })

                $('#close').on('click', function closeModal() {
                    $(".editmodal").fadeOut();
                    $('.editmodal').empty();
                })
            })

        }

        fetch(`https://muslimgauze-database.herokuapp.com/albums/cataloguesearch/${this.release1title}/`, {
                      headers: {
                          'Content-Type': 'application/json',
                      }
                  })
                  .then(function (response) {
                      return response.json()
                  })
                  .then(function (jsonData) {
                      console.log(jsonData)
                  })

    }
}