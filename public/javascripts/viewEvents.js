import { parseTracksData, tracks } from "./tracksManager.js";
import { tracksData, doLogin } from "./dbCalls.js";

export const declareViewEvents = () => {
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
			console.log(dataBody);
			doLogin(dataBody);
		}
	});
};
