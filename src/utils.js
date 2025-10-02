let FETCH_URI = "https://jsramverk-shirin-hsfqftftd8b6d9fn.northeurope-01.azurewebsites.net/";
if (location.host === "localhost") {
    FETCH_URI = "http://localhost:8080";
}

export default FETCH_URI;