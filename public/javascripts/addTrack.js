	$("#submittrack").on("click", () => {
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
