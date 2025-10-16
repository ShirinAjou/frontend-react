import { useState, useEffect } from 'react';
import FETCH_URI from './utils.js';
import { io } from "socket.io-client";
import './App.css'

let socket;

function Client() {
    useEffect(() => {
      socket = io(FETCH_URI);

      return () => {
        socket.disconnect();
      }
    }, [selectedDoc]);
}

socket.emit("create", docs["_id"]);

socket.on("doc", (data) => {
    setEditorContent(data.html, false);
});

let data = {
    _id: "LÅNG OCH SLUMPAT",
    html: "Texten i html format från editorn"
};

socket.emit("doc", data);


export default Client;