let FETCH_URL = "https://jsramverk-shirin-hsfqftftd8b6d9fn.northeurope-01.azurewebsites.net";
if (location.host === "localhost") {
    FETCH_URL = "http://localhost:8080";
}

let URL_GITHUB = "https://shirinajou.github.io/frontend-react"
if (location.host === "localhost") {
    URL_GITHUB = "http://localhost:5173";
}

export default {FETCH_URL, URL_GITHUB};