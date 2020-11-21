import {albumAdd} from "./dbCalls.js"
$("#submitalbum").on("click", () => {
    let albumBody = {
        title: $("#albumtitleadd").val(),
        page: $("#albumpageadd").val(),
        src: $("#albumimageadd").val(),
    };
    albumAdd(albumBody);
});

