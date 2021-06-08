const { contextBridge } = require("electron");
const fs = require("fs");
const db = require('electron-db');
const path = require('path');

// Expose API for persisting match and team data
// Example for doing this by reading and writing to a file
contextBridge.exposeInMainWorld(
    "db",
    {
        readMatches: () => fs.readFileSync("match-data.txt"),
        writeMatches: (data) => fs.writeFileSync("match-data.txt", data),
        appendMatches: (data) => fs.appendFileSync("match-data.txt", data),
        readTeams: () => fs.readFileSync("team-data.txt"),
        writeTeams: (data) => fs.writeFileSync("team-data.txt", data),
        appendTeams: (data) => fs.appendFileSync("team-data.txt", data),
        createLocation: () => path.join(__dirname, ''),
        db: db
    }
);

window.onload = () => {
    contextBridge.exposeInMainWorld("jquery", { $: require("jquery") });
};