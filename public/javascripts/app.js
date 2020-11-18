
import {
    declareViewEvents
} from './viewEvents.js'
import {getData} from "./dbCalls.js"

window.onload = () => {
    declareViewEvents()
    getData()
    doAdmin()
}
export let admin=false;
const doAdmin=()=>{
    if (localStorage.getItem("dbtoken")){
        admin=true;
        $(".adminedit").show();
    }
}