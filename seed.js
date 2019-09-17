'use strict';

const db = require('./db');
const https = require('https');
const fs = require('fs');

// Seeding constants
const download_url = 'https://cdn.oceandataexplorer.org'
const download_folder = __dirname + '/resources/annotator'

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
};

// Migrate and seed database
console.log('> Migrating and seeding database')
db.init().then(() => {
    // Downloading seed audio & image files
    db.DatasetFile.query().select('filename').then(dataset_files => {
        console.log(`> Downloading ${dataset_files.length * 2} audio and image files`)
        for (let dataset_file of dataset_files) {
            let wav_name = dataset_file.filename;
            let png_name = wav_name.replace('.wav', '.png');
            download(`${download_url}/${wav_name}`, `${download_folder}/wav/${wav_name}`);
            download(`${download_url}/${png_name}`, `${download_folder}/png/${png_name}`);
        }
        return db.close();
    }).then(() => {
        console.log(`> Seeding complete`)
    });
});
