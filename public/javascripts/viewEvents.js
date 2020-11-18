import { parseData, tracks } from "./tracksManager.js";
import { dbSearchTitle, dbSearchAlbum, trackAdd } from "./dbCalls.js";
export const declareViewEvents = () => {
	let addopen;

	document.querySelector("#sortmenu").addEventListener("change", () => {
		if ($("#sortmenu").val() === "track") {
			parseData(tracks, "title");
		}
		if ($("#sortmenu").val() === "album") {
			parseData(tracks, "album");
		}
		if ($("#sortmenu").val() === "yearasc") {
			parseData(tracks, "yearasc");
		}
		if ($("#sortmenu").val() === "yeardesc") {
			parseData(tracks, "yeardesc");
		}
	});

	$("#searchtitlebtn").on("click", function () {
		if ($("#titlesearchinput").val()) {
			dbSearchTitle($("#titlesearchinput").val());
		}
	});

	$("#searchalbumbtn").on("click", function () {
		if ($("#albumsearchinput").val()) {
			dbSearchAlbum($("#albumsearchinput").val());
		}
	});

	$("#loginshowbtn").on("click", function () {
		if (!localStorage.getItem("dbtoken")) {
			$("#usermodal").slideDown();
		} else {
			localStorage.removeItem("dbtoken");
			localStorage.removeItem("shoptoken");
			localStorage.removeItem("cart");
			location.reload();
		}
	});
	$(".cancelloginbtn").on("click", function () {
		$(".usermodal").slideUp();
	});

	$("#usersubmitbtn").on("click", function (evt) {
		evt.preventDefault();
		let dataBody = {
			user: $("#id_user_input").val(),
			pass: $("#id_pass_input").val(),
		};
		let url = "http://localhost:3000/users/login/";
		fetch(url, {
			method: "POST",
			body: JSON.stringify(dataBody),
			headers: {
				"content-type": "application/json",
			},
		})
			.then((resp) => resp.json())
			.then((data) => {
				if (data.token) {
					localStorage.setItem("dbtoken", data.token);
					$(".usermessage")
						.show()
						.html(`Welcome back ${dataBody.user}!`)
						.css("color", "green")
						.delay(2500)
						.fadeOut();
					location.reload();
				} else if (Array.isArray(data)) {
					$(".usermessage")
						.show()
						.html(data[0].message)
						.css("color", "red")
						.delay(2000)
						.fadeOut();
				} else if ("message" in data) {
					$(".usermessage")
						.show()
						.html(data.message)
						.css("color", "red")
						.delay(2000)
						.fadeOut();
				}
			});
	});
	$("#adminadd").on("click", () => {
		if (addopen == false) {
			addopen = true;

			$(` <div class="addmodal-content">
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
    </div></div>

`).appendTo($("#addmodal").fadeIn());

			$("#submittrack").on("click", (evt) => {
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
				trackAdd(trackBody);
			});

			$("#closeadd").on("click", function () {
				addopen = false;
				$(".addmodal").fadeOut();
				$(".addmodal").empty();
			});
		}
	});
};
