import { Track } from "./tracksClass.js";
import { admin } from "./app.js";
export const doTable = async (_data, _page = 0) => {
	if (admin === true) {
		$("#editcol").show();
		$("#adminadd").show();
	}

	$(".spinner").empty();
	if (!_data.length) {
		$("#popupmodal").hide().fadeIn().css("display", "flex");
		$(".modal__window").html(`<h2>No matches found</h2>`);
		$(window).click(function () {
			$("#popupmodal").show().hide();
		});
	} else {
		$("#id_parent").empty();

		_data.slice(_page * 10, _page * 10 + 10).map(async (item) => {
			let track = new Track(
				item.title,
				item.releases[0]?.albumtitle,
				item.releases[0]?.albumyear,
				item.releases[0]?.albumformat,
				item.releases[0]?.albumcatalogue,
				item.releases[1]?.albumtitle,
				item?.releases[1]?.albumyear,
				item?.releases[1]?.albumformat,
				item?.releases[1]?.albumcatalogue,
				item?.releases[2]?.albumtitle,
				item?.releases[2]?.albumyear,
				item?.releases[2]?.albumformat,
				item?.releases[2]?.albumcatalogue,
				item._id
			);
		});
		let pages = Math.floor(_data.length / 10);
		$("#pagination").empty();
		for (let i = 0; i < pages; i++) {
			$("#pagination").append(
				`<option class="pagin" value=${i}>${i + 1}</option>`
			);
		}
		$("#pagination").on("change", function(e){
			doTable(_data, $(this).val());
			e.stopImmediatePropagation();
		});
		$("#pagination").val(_page)
	}
};
