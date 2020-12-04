import { parseTracksData } from "./tracksManager.js";
export let discogData = [];
export let tracksData = [];
export let ytres;

export const doLogin = (_data) => {
	fetch("https://muslimgauze-database.herokuapp.com/users/login/", {
		method: "POST",
		body: JSON.stringify(_data),
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
					.html(`Welcome back ${_data.user}!`)
					.css("color", "green")
					.delay(2500)
					.fadeOut();
				location.reload();
			} else if (Array.isArray(data)) {
				$(".usermessage")
					.show()
					.html(data)
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
};

export const getTracksData = () => {
	fetch("https://muslimgauze-database.herokuapp.com/tracks", {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			tracksData = data;
			parseTracksData(tracksData, "title");
		});
};
export const getAlbumsData = () => {
	fetch("https://muslimgauze-database.herokuapp.com/albums", {
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (jsonData) {
			discogData = jsonData;
		});
};

export const trackEdit = (_data) => {
	fetch("https://muslimgauze-database.herokuapp.com/tracks/edit", {
		method: "PUT",
		body: JSON.stringify(_data),
		headers: {
			"content-type": "application/json",
		},
	})
		.then((resp) => resp.json())
		.then((data) => {
			if (data.ok) {
				$("#submitedit").html(`Submitted!`);
			} else {
				console.log(data);
			}
		});
};

export const trackDel = (_id) => {
	fetch(`https://muslimgauze-database.herokuapp.com/tracks/del/${_id}`, {
		method: "DELETE",
		headers: {
			"content-type": "application/json",
		},
	})
		.then((resp) => resp.json())
		.then((data) => {
			if (data.ok) {
				//location.reload();
				$("#deledit")
				.html("Track deleted")
			} else {
				console.log(data);
			}
		});
};

export const dbSearchTitle = (_string) => {
	_string = _string.replace(/[\[\]\:\\]+/g, "");
	_string = _string.replace(/[\/]+/g, " ");
	fetch(
		`https://muslimgauze-database.herokuapp.com/tracks/titlesearch/${_string}/`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (jsonData) {
			parseTracksData(jsonData, "title");
		});
	$("#titlesearchinput").val("");
	$("#sortmenu").val("start").change();
};

export const dbSearchAlbum = (_string) => {
	_string = _string.replace(/[\[\]\:\\]+/g, "");
	_string = _string.replace(/[\/]+/g, " ");
	fetch(
		`https://muslimgauze-database.herokuapp.com/tracks/albumsearch/${_string}/`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (jsonData) {
			parseTracksData(jsonData, "title");
		});
	$("#albumsearchinput").val("");
	$("#sortmenu").val("start").change();
};

export const getYT = (_string) => {
	let string = _string.replace("/s/g", "%20");

	fetch(
		`https://www.googleapis.com/youtube/v3/search?key=AIzaSyC6CIzYA_1Qu8arbhTaHrPqfezoJf_QczI&type=video&part=snippet&maxResults=1&q=muslimgauze%20${string}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		}
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			ytres = data.items[0].id.videoId;
		});
	return ytres;

};
