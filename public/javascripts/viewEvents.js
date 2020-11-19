import { parseTracksData, tracks } from "./tracksManager.js";
import { tracksData, trackAdd, doLogin } from "./dbCalls.js";
export const declareViewEvents = () => {
	let addopen;
	let tracksfiltered;
	document.querySelector("#sortmenu").addEventListener("change", () => {
		if ($("#sortmenu").val() === "track") {
			parseTracksData(tracks, "title");
		}
		if ($("#sortmenu").val() === "album") {
			parseTracksData(tracks, "album");
		}
		if ($("#sortmenu").val() === "yearasc") {
			parseTracksData(tracks, "yearasc");
		}
		if ($("#sortmenu").val() === "yeardesc") {
			parseTracksData(tracks, "yeardesc");
		}
	});
	$("#searchtitlebtn").on("click", function () {
		if ($("#titlesearchinput").val()) {
			tracksfiltered = tracksData.filter((item) => {
				return item.title
					.toLowerCase()
					.includes($("#titlesearchinput").val().toLowerCase());
			});
			parseTracksData(tracksfiltered, "title");
		}
	});
	$("#searchalbumbtn").on("click", function () {
		if ($("#albumsearchinput").val()) {
			tracksfiltered = tracksData.filter((item) => {
				return item.releases[0].albumtitle
					.toLowerCase()
					.includes($("#albumsearchinput").val().toLowerCase());
			});
			parseTracksData(tracksfiltered, "title");
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
		if ($("#id_user_input").val() && $("#id_pass_input").val()) {
			evt.preventDefault();
			let dataBody = {
				user: $("#id_user_input").val(),
				pass: $("#id_pass_input").val(),
			};
			doLogin(dataBody);
		}
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
