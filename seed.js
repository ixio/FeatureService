'use strict';

const db = require('./db');
const https = require('https');
const fs = require('fs');

// Seeding constants
const downloadUrl = 'https://cdn.oceandataexplorer.org';
const downloadFolder = __dirname + '/resources/annotator';

// Aux functions
// download function inspired from https://stackoverflow.com/a/22907134/2730032
function download(url, dest) {
    if (fs.existsSync(dest)) {
        console.log(`${url} has already been downloaded to ${dest}`);
    } else {
        console.log(`Downloading ${url} to ${dest}`);
        let file = fs.createWriteStream(dest);
        let request = https.get(url, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close();
            });
        }).on('error', function(err) {
            fs.unlink(dest);
            console.log(err.message);
        });
    }
}

// Migrate and seed database
console.log('> Migrating and seeding database');
db.init().then(() => {
    // Downloading seed audio & image files
    db.DatasetFile.query().select('filename').then(datasetFiles => {
        console.log(`> Downloading ${datasetFiles.length * 2} audio and image files`);
        for (let datasetFile of datasetFiles) {
            let wavName = datasetFile.filename;
            let pngName = wavName.replace('.wav', '.png');
            download(`${downloadUrl}/${wavName}`, `${downloadFolder}/wav/${wavName}`);
            download(`${downloadUrl}/${pngName}`, `${downloadFolder}/png/${pngName}`);
        }
        return db.close();
    }).then(() => {
        console.log(`> Seeding complete`);
    });
});
