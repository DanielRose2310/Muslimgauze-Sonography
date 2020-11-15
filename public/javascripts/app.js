import {
    parseData
} from './tracksManager.js'
import {
    declareViewEvents
} from './viewEvents.js'
window.onload = () => {
    declareViewEvents()
    getData()
}
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