import {
    parseData
} from './tracksManager.js'
import {
    declareViewEvents
} from './viewEvents.js'
window.onload = () => {
    declareViewEvents()
    getData()
    doAdmin()
}
export let admin=false;
const getData = () => {
    fetch('https://muslimgauze-database.herokuapp.com/tracks', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(function (response) {
            return response.json()
        })
        .then(function (jsonData) {
            parseData(jsonData, "title")
        })
}
const doAdmin=()=>{
    if (localStorage.getItem("dbtoken")){
        admin=true;
        $(".adminedit").show();
    }
}