import { doTable } from "./tableManager.js";
export let tracks = [];
export const parseData = (_data, _sort, _titlestring, _albumstring) => {
	if (_sort === "title") {
		tracks = _.sortBy(_data, _sort);
	}
	if (_sort === "album") {
		tracks = _.sortBy(_data, (item) => {
			return [item.releases[0].albumtitle];
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
