import { Track } from "./tracksClass.js";
import { admin } from "./app.js";
let datacat;
let pages;
let itemsperpage;
export const doTable = async (_data, _page = 0, _itemsperpage = 10) => {
	itemsperpage = _itemsperpage;
	$("#reissuecol1").css("display", "none");
	$("#reissuecol2").css("display", "none");
	datacat = _data;
	if (admin === true) {
		$("#editcol").show();
		$("#adminaddtrack").show();
		$("#adminaddalbum").show();
	}
	$(".spinner").empty();
	if (!datacat.length) {
		$("#popupmodal").hide().fadeIn().css("display", "flex");
		$(".modal__window").html(`<h2>No matches found</h2>`);
		$(window).on("click", function (e) {
			e.stopImmediatePropagation();
			$("#popupmodal").show().hide();
		});
	} else {
		$("#id_parent").empty();
	let cat=	datacat
			.slice(_page * itemsperpage, (_page * itemsperpage) + itemsperpage)
			.map(async (item) => {
				let track = new Track(
					item.title,
					item.releases[0]?.albumtitle,
					item.releases[0]?.albumyear,
					item.releases[0]?.albumformat,
					item.releases[0]?.albumcatalogue,
					item?.releases[1]?.albumtitle,
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
		pages = Math.floor(datacat.length / itemsperpage);
		$("#pagination").empty();
		for (let i = 0; i < pages + 1; i++) {
			$("#pagination").append(
				`<option class="pagin" value=${i}>${i + 1}</option>`
			);
		}
		$("#itemsmenu").on("change", function (e) {
			if (Number($(this).val())) {
				itemsperpage = Number($(this).val());
				doTable(datacat, 0, itemsperpage);
				e.stopImmediatePropagation();
			}
		});
		$("#pagination").on("change", function (e) {
			_page = $(this).val();
			doTable(datacat, _page, itemsperpage);
			e.stopImmediatePropagation();
		});
		$("#firstpage").on("click", (e) => {
			if (_page > 0) {
				_page = 0;
				doTable(datacat, _page, itemsperpage);
				e.stopImmediatePropagation();
			}
		});
		$("#prevpage").on("click", (e) => {
			if (_page > 0) {
				_page--;
				doTable(datacat, _page, itemsperpage);
			}
			e.stopImmediatePropagation();
		});
		$("#nextpage").on("click", (e) => {
			if (_page < pages) {
				_page++;
				doTable(datacat, _page, itemsperpage);
			}
			e.stopImmediatePropagation();
		});
		$("#lastpage").on("click", (e) => {
			if (_page < pages) {
				_page = pages;
				doTable(datacat, _page, itemsperpage);
				e.stopImmediatePropagation();
			}
		});
		$("#pagination").val(_page);
		$("#itemsmenu").val(itemsperpage);
	}
};
