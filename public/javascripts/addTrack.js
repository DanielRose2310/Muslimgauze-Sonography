$("#submittrack").on("click", () => {
	if (!$("#titleadd").val().length) {
		$("#submittrack")
			.html(`No title entered!`)
			.removeClass("btn btn-success")
			.addClass("btn btn-warning");
		setTimeout(function () {
			$("#submittrack")
				.html("Submit track")
				.removeClass("btn btn-warning")
				.addClass("btn btn-success");
		}, 2000);
	} else {
		let trackBody = {
			title: $("#titleadd").val(),
			releases: [
				{
					albumtitle: $("#release1titleadd").val(),
					albumyear: $("#release1yearadd").val(),
					albumformat: $("#release1formatadd").val(),
					albumcatalogue: $("#release1catalogueadd").val(),
				},
				{
					albumtitle: $("#release2titleadd").val(),
					albumyear: $("#release2yearadd").val(),
					albumformat: $("#release2formatadd").val(),
					albumcatalogue: $("#release2catalogueadd").val(),
				},
				{
					albumtitle: $("#release3titleadd").val(),
					albumyear: $("#release3yearadd").val(),
					albumformat: $("#release3formatadd").val(),
					albumcatalogue: $("#release3catalogueadd").val(),
				},
			],
		};
		trackAdd(trackBody);
	}
});

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
			if (Object.values(data[0]).indexOf(_data.title)) {
				$("#submittrack").html(`Track submitted!`);
				setTimeout(function () {
					$("#submittrack").html("Submit track");
				}, 2000);
			} else {
				$("#submittrack")
				.html(`Track not submitted!`)
				.removeClass("btn btn-success")
				.addClass("btn btn-danger");
			setTimeout(function () {
				$("#submittrack")
					.html("Submit track")
					.removeClass("btn btn-danger")
					.addClass("btn btn-success");
			}, 2000);
				console.log(data);
			}
		});
};
