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
	}else {let albumBody = {
		title: $("#albumtitleadd").val(),
		page: $("#albumpageadd").val(),
		src: $("#albumimageadd").val(),
	};
	albumAdd(albumBody);
}});


export const albumAdd = (_data) => {
	console.log(_data)
	fetch("https://muslimgauze-database.herokuapp.com/albums/add", {
		method: "POST",
		body: JSON.stringify(_data),
		headers: {
			"content-type": "application/json",
		},
	})
		.then((resp) => resp.json())
		.then((data) => {
			if (Object.values(data[0]).indexOf(_data.title)) {
				$("#submitalbum").html(`Album submitted!`);
				setTimeout(function () {
					$("#submitalbum").html("Submit Album");
				}, 2000);
			} else {
				$("#submitalbum")
				.html(`Album not submitted!`)
				.removeClass("btn btn-success")
				.addClass("btn btn-danger");
			setTimeout(function () {
				$("#submitalbum")
					.html("Submit album")
					.removeClass("btn btn-danger")
					.addClass("btn btn-success");
			}, 2000);
				console.log(data);
			}
		});
};