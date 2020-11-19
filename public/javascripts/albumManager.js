import { discogData } from "./dbCalls.js";
export function getRelData(_ref) {
	let releasedata;
	//_ref = _ref.replace(/[\[\]\:\\]+/g, "");
	//_ref = _ref.replace(/[\/]+/g, " ");
	//if (_ref.split(" ").length > 2) {
	//	_ref = _ref.split(" ").splice(0, 2).join(" ");
	//}
	discogData.map((item) => {
		if (item.title.toLowerCase()===_ref.toLowerCase()) {
            releasedata = item;
            return
		}
	});
	return releasedata;
}
