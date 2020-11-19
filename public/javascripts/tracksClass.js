import { admin } from "./app.js";
import { getRelData, trackEdit, trackDel } from "./dbCalls.js";
let editopen = false;

export class Track {
	constructor(
		_title,
		_release1title,
		_release1year,
		_release1format,
		_release1catalogue,
		_release2title = "",
		_release2year = "",
		_release2format = "",
		_release2catalogue = "",
		_release3title = "",
		_release3year = "",
		_release3format = "",
		_release3catalogue = "",
		_id
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
		this.render();
	}

	async render() {
		let album1box;
		let album2box;
		let album3box;
		let rel2href;
		let rel2img;
		let rel3href;
		let rel3img;
		let rel1data = await getRelData(this.release1title);
		let rel1href = rel1data.data[0]?.page;
		let rel1img = rel1data.data[0]?.src;
		if (this.release2title) {
			let rel2data = await getRelData(this.release2title);
			rel2href = rel2data.data[0]?.page;
			rel2img = rel2data.data[0]?.src;
		}

		if (this.release3title) {
			let rel3data = await getRelData(this.release3title);
			rel3href = rel3data.data[0]?.page;
			rel3img = rel3data.data[0]?.src;
		}

		let newTr = $("<tr></tr>");

		let rowtitle = $(
			`<td align="center" class="align-middle"><b>${this.title}</b></td>`
		);
		newTr.append(rowtitle);
		$("#id_parent").append(newTr);
		album1box = $(
			`<td align="center" id="album1box" class="align-middle"><i> ${this.release1title}</i><br>${this.release1year}<br> ${this.release1format}<br>${this.release1catalogue} </td>`
		);
		$(newTr).append(album1box);

		if (this.release2title) {
			album2box = $(
				`<td id="box2" align="center" class="align-middle"><i>${this.release2title}</i><br>${this.release2year}<br> ${this.release2format}<br>${this.release2catalogue} </td>`
			);
			$(newTr).append(album2box);
			$("#reissuecol1").show();
		}
		if (this.release3title) {
			album3box = $(
				`<td id="box3" align="center" class="align-middle"></i>${this.release3title}</i><br>${this.release3year}<br> ${this.release3format}<br>${this.release3catalogue} </td>`
			);
			$(newTr).append(album3box);
			$("#reissuecol2").show();
		}

		if (rel1href) {
			$(album1box).append(
				`<br><a href=${rel1href}>LINK</a><br> <img style="width:100px" src=${rel1img}>`
			);
		}
		if (rel2href) {
			$(album2box).append(
				`<br><a href=${rel2href}>LINK</a> <br><img style="width:100px" src=${rel2img}>`
			);
		}
		if (rel3href) {
			$(album3box).append(
				`<br><a href=${rel3href}>LINK</a><br> <img style="width:100px" src=${rel3img}>`
			);
		}

		if (admin === true) {
			let editTd = $(`<td align="center" class="align-middle"></td>`);
			$(newTr).prepend(editTd);
			let editBtn = $(
				`<button  class="btn btn-info"><i class="fas fa-edit"></i></button>`
			);
			$(editTd).append(editBtn);
			$(editBtn).on("click", () => {
				if (editopen === false) {
					editopen = true;
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
    <label class="mx-2">Album Catalogue:</label><input style="width:200px"  id="release3catalogueedit" value='${this.release3catalogue}'></input> 
</div>
    <button class="btn btn-success my-3" id="submitedit" style="width:100px";>Submit</button> 
    <button class="btn btn-danger my-3" id="deledit" style="width:100px";>Delete Track</button> 
            </div>

   `).appendTo($("#editmodal").fadeIn());
				}

				$("#submitedit").on("click", (evt) => {
					let trackBody = {
						_id: this.id,
						title: $("#titleedit").val(),
						releases: [
							{
								albumtitle: $("#release1titleedit").val(),
								albumyear: $("#release1yearedit").val(),
								albumformat: $("#release1formatedit").val(),
								albumcatalogue: $("#release1catalogueedit").val(),
							},
							{
								albumtitle: $("#release2titleedit").val(),
								albumyear: $("#release2yearedit").val(),
								albumformat: $("#release2formatedit").val(),
								albumcatalogue: $("#release2catalogueedit").val(),
							},
							{
								albumtitle: $("#release3titleedit").val(),
								albumyear: $("#release3yearedit").val(),
								albumformat: $("#release3formatedit").val(),
								albumcatalogue: $("#release3catalogueedit").val(),
							},
						],
					};
					trackEdit(trackBody);
				});
				$("#deledit").on("click", (evt) => {
					$("#deledit")
						.html("Press Again to Confirm")
						.on("click", () => {
							trackDel(this.id);
						});
				});
				$("#close").on("click", function closeModal() {
					editopen = false;
					$(".editmodal").fadeOut();
					$(".editmodal").empty();
				});
			});
	}
	}
}
