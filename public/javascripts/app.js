import { declareViewEvents } from "./viewEvents.js";
import { getTracksData,getAlbumsData } from "./dbCalls.js";

window.onload = () => {
	getTracksData();
	getAlbumsData();
	declareViewEvents();
	doAdmin();	
};
export let admin = false;
const doAdmin = () => {
	if (localStorage.getItem("dbtoken")) {
		admin = true;
		$(".adminedit").show();
	}
};
