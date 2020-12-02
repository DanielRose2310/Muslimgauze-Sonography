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
			releases: [{
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
		trackCheck(trackBody);
	}
});

export const trackCheck = (_data) => {
	fetch("https://muslimgauze-database.herokuapp.com/tracks", {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {


			let titletest = _data.title.trim().replace(/[^a-zA-Z\s]|(untitled)+/g, '').toLowerCase().split(' ').sort()
			if (titletest.length > 1) {
				titletest = titletest.filter(item =>
					item.length > 3);
			}
			const dups = data.filter(value => {

				if (JSON.stringify(value.title.replace(/[^a-zA-Z\s]|(untitled)+/g, '').toLowerCase().split(' ').filter(item => item.length > 3).sort()) == JSON.stringify(titletest)) {
					return true
				}
			});
			if (dups.length) {
				console.log(dups)
				dups.map(item => {
					$(".dupmodal").fadeIn()
					$("#dupinfo").append(`<li>
				 ${item.title}, <i>${item.releases[0].albumtitle}</i> - ${item.releases[0].albumcatalogue}<br> ${item.releases[0].albumyear} - ${item.releases[0].albumformat}
				 </li>
				 <li>
				 <i>${item.releases[1]?.albumtitle}</i> - ${item.releases[1]?.albumcatalogue}<br> ${item.releases[1]?.albumyear} - ${item.releases[1]?.albumformat}
				 </li>
				 <li>
				 <i>${item.releases[2]?.albumtitle}</i> - ${item.releases[2]?.albumcatalogue}<br> ${item.releases[2]?.albumyear} - ${item.releases[2]?.albumformat}
				 </li>
				 `);

				})
			}
		})
}


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