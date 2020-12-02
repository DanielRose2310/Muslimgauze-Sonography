import { discogData } from "./dbCalls.js";
export function getRelData(_ref) {
	let releasedata;
	discogData.map((item) => {
		if (item.title.toLowerCase()===_ref.toLowerCase()) {
            releasedata = item;
            return
		}
	});
	return releasedata;
}
