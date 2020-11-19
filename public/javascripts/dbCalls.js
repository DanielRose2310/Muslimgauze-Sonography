import { parseTracksData } from "./tracksManager.js";
export let discogData=[];
export let tracksData=[]
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
			tracksData=data
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
				location.reload();
			} else {
				alert(data[0].message);
			}
		});
};
export const trackAdd = (_data) => {
	fetch("https://muslimgauze-database.herokuapp.com/tracks/add", {
		method: "POST",
		body: JSON.stringify(_data),
		headers: {
			"content-type": "application/json",
		},
	})
		.then((resp) => resp.json())
		.then((data) => {
			if (data.ok) {
				location.reload();
			} else {
				alert(data[0].message);
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
				location.reload();
			} else {
				alert(data[0].message);
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
