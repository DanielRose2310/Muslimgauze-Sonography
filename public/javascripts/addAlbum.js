$("#submitalbum").on("click", () => {
	if (
		!$("#albumtitleadd").val().length &&
		!$("#albumpageadd").val().length &&
		!$("#albumimageadd").val().length
	) {
		$("#submitalbum")
			.html(`No data entered!`)
			.removeClass("btn btn-success")
			.addClass("btn btn-warning");
		setTimeout(function () {
			$("#submitalbum")
				.html("Submit album")
				.removeClass("btn btn-warning")
				.addClass("btn btn-success");
		}, 2000);
	}
	let albumBody = {
		title: $("#albumtitleadd").val(),
		page: $("#albumpageadd").val(),
		src: $("#albumimageadd").val(),
	};
	console.log(albumBody);
});


export const trackAdd = (_data) => {
	console.log(_data)
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
				//location.reload();
			} else {
				console.log(data);
			}
		});
};