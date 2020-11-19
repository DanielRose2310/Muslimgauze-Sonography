import { doTable } from "./tableManager.js";
export let tracks = [];
export const parseData = (_data, _sort, _titlestring, _albumstring) => {

	if (_sort === "title") {
		tracks = _.sortBy(_data, (item) => {
			let sortdat = item.title;
			if ((/^(The)\s/i).test(sortdat)) {
				sortdat = sortdat.substring(4, sortdat.length);
				console.log(sortdat)
			}
			if ((/^[A]\s/i).test(sortdat)) {
				sortdat = sortdat.substring(2, sortdat.length);
				console.log(sortdat)
			}
			return [sortdat];
		});
	}


	if (_sort === "album") {
		tracks = _.sortBy(_data, (item) => {
			let sortdat = item.releases[0].albumtitle;
			if (sortdat.indexOf("The ") === 0) {
				sortdat = sortdat.substring(4, sortdat.length);
			}
			if (sortdat.indexOf("A ") === 0) {
				console.log(sortdat.indexOf("A "));
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
