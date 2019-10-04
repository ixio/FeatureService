'use strict';

const https = require('https');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const db = require('./db');

// Seeding constants
const downloadUrl = 'https://cdn.oceandataexplorer.org';
const downloadFolder = path.join(__dirname + '/resources/annotator');

//
// Aux functions
//

// download function inspired from https://stackoverflow.com/a/22907134/2730032
function download(url, dest, callback = null) {
    if (fs.existsSync(dest)) {
        console.log(`${url} has already been downloaded to ${dest}`);
    } else {
        console.log(`Initiating download from ${url} to ${dest}`);
        let file = fs.createWriteStream(dest);
        let request = https.get(url, function(response) {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(callback);
                });
            } else {
                console.log(`Error: ${url} returns statusCode ${response.statusCode}`);
                file.destroy();
                fs.unlinkSync(dest);
            }
        }).on('error', function(err) {
            fs.unlink(dest);
            console.log(err.message);
        });
    }
}

// run bash command
function runCmd(cmd) {
    console.log('Running > ' + cmd);
    let [head, ...tail] = cmd.split(' ');
    let launchedCmd = spawnSync(head, tail);
    if (launchedCmd.error) {
        throw(launchedCmd.error);
    } else if (launchedCmd.stderr.toString() !== '') {
        console.log('Error', launchedCmd.stderr.toString());
    } else {
        console.log(launchedCmd.stdout.toString());
    }
}

// Migrate and seed database
console.log('> Migrating and seeding database');
db.init().then(() => {
    // Downloading seed audio & image files
    db.DatasetFile.query().select('id', 'filename').then(datasetFiles => {
        console.log(`> Downloading ${datasetFiles.length * 2} audio and image files (+ unzipping)`);
        for (let datasetFile of datasetFiles) {
            let wavName = datasetFile.filename;
            let pngZipName = wavName.replace('.wav', '.zip');
            let pngZipPath = path.join(downloadFolder, 'png', pngZipName);
            let pngResPath = path.join(downloadFolder, 'png', datasetFile.id.toString());
            download(`${downloadUrl}/${wavName}`, `${path.join(downloadFolder, 'wav', wavName)}`);
            if (!fs.existsSync(pngResPath)) {
                if (fs.existsSync(pngZipPath)) {
                    console.log(`Unzipping previously downloaded ${pngZipName}`);
                    fs.mkdirSync(pngResPath);
                    runCmd(`unzip ${pngZipPath} -d ${pngResPath}`);
                    fs.unlinkSync(pngZipPath);
                } else {
                    download(`${downloadUrl}/${pngZipName}`, pngZipPath, () => {
                        console.log(`Download finished for ${pngZipName}, now unzipping`);
                        fs.mkdirSync(pngResPath);
                        runCmd(`unzip ${pngZipPath} -d ${pngResPath}`);
                        fs.unlinkSync(pngZipPath);
                    });
                }
            } else {
                console.log(`Folder already exists for ${pngZipName} (${pngResPath})`);
            }
        }
        return db.close();
    }).then(() => {
        console.log(`> Seeding complete, script will exit when downloading is finished`);
    });
});
