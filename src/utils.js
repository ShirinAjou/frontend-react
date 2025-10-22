let FETCH_URL = "https://jsramverk-shirin-hsfqftftd8b6d9fn.northeurope-01.azurewebsites.net";

if (location.host === "localhost:5173") {
    FETCH_URL = "http://localhost:8080";
}

// let FETCH_URL = "http://localhost:8080";
export default FETCH_URL;