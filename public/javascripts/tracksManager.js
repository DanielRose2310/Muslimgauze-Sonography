import { doTable } from "./tableManager.js";
export let tracks = [];
export const parseTracksData = (_data, _sort, _titlestring, _albumstring) => {
	
	if (_sort === "title") {
		tracks = _.sortBy(_data, (item) => {
			let sortdat = item.title;
			if ((/^(The)\s/i).test(sortdat)) {
				sortdat = sortdat.substring(4, sortdat.length);
			}
			if ((/^[A]\s/i).test(sortdat)) {
				sortdat = sortdat.substring(2, sortdat.length);
			}
			return [sortdat];
		});
	}
	if (_sort === "album") {
		tracks = _.sortBy(_data, (item) => {
			let sortdat = item.releases[0].albumtitle;
			if ((/^(The)\s/i).test(sortdat)) {
				sortdat = sortdat.substring(4, sortdat.length);
			}
			if ((/^[A]\s/i).test(sortdat)) {
				sortdat = sortdat.substring(2, sortdat.length);
			}
			return [sortdat];
		});
	}
	if (_sort === "yearasc") {
		tracks = _.sortBy(_data, (item) => {
			return [item.releases[0].albumyear];
		});
	}
	if (_sort === "yeardesc") {
		tracks = _.sortBy(_data, (item) => {
			return [item.releases[0].albumyear];
		}).reverse();
	}
	doTable(tracks);
};
