import {
	parseTracksData,
	tracks
} from "./tracksManager.js";
import {
	tracksData,
	doLogin
} from "./dbCalls.js";

export const declareViewEvents = () => {

	$('#adminaddtrack').on('click', function () {
		let url="/addtrack"
		$.ajaxSetup({headers: {
			Authorization: `Bearer ${localStorage.getItem('dbtoken')}`
		}})
		$.ajax({
			url: url,
			type: 'GET',
			xhrFields: {
				withCredentials: true
			},
			contentType: 'application/json',
			dataType: "html",
			headers: {
				"Authorization": localStorage.getItem('dbtoken')
			},
			success: function (data) {
				console.log(data)
				$("body").html(data);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
			},

			async: true
		})
	});
	$('#adminaddalbum').on('click', function () {
		let url="/addalbum"
		$.ajaxSetup({headers: {
			Authorization: `Bearer ${localStorage.getItem('dbtoken')}`
		}})
		$.ajax({
			url: url,
			type: 'GET',
			xhrFields: {
				withCredentials: true
			},
			contentType: 'application/json',
			dataType: "html",
			headers: {
				"Authorization": localStorage.getItem('dbtoken')
			},
			success: function (data) {
				$("body").html(data);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
			},
			async: true
		})
	});

	let scrollbtn = document.querySelector('#scroll');
	scrollbtn.onclick = () => {
		var smoothscroll = setInterval(function () {
			window.scrollTo(0, window.scrollY - 100)
			if (window.scrollY <= 0)
				clearInterval(smoothscroll)
		}, 20);
	}


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
	$("#searchtitlebtn").on("click", function (e) {
		e.stopPropagation();
		if ($("#titlesearchinput").val()) {
			tracksfiltered = tracksData.filter((item) => {
				return item.title
					.toLowerCase()
					.includes($("#titlesearchinput").val().toLowerCase());
			});
			parseTracksData(tracksfiltered, "title");
		}
	});
	$("#searchalbumbtn").on("click", function (e) {
		e.stopPropagation();
		if ($("#albumsearchinput").val()) {
			tracksfiltered = tracksData.filter((item) => {
				return item.releases[0].albumtitle
					.toLowerCase()
					.includes($("#albumsearchinput").val().toLowerCase());
			});
			parseTracksData(tracksfiltered, "title");
		}
	});
	if (localStorage.getItem("dbtoken")) {
		$("#loginshowbtn").html("Logout");
	}
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