'use strict';

const db = require('./db');
const https = require('https');
const fs = require('fs');
const path = require('path');

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
                fs.unlink(dest, (err) => {
                    // Without the callback this doesn't work however err === null weirdly enough
                });
            }
        }).on('error', function(err) {
            fs.unlink(dest);
            console.log(err.message);
        });
    }
}
// unzip function inspired from https://stackoverflow.com/a/21991500/2730032
const tar = require('tar');
const zlib = require('zlib');
const mkdirp = require('mkdirp'); // used to create directory tree

var log = console.log;

var tarball = 'path/to/downloaded/archive.tar.gz';
var dest    = 'path/to/destination';
function unzip(tarball, dest) {
    fs.createReadStream(tarball)
    .on('error', log)
    .pipe(zlib.Unzip())
    .pipe(tar.Parse())
    .on('entry', function(entry) {
        var isDir     = 'Directory' === entry.type;
        var fullpath  = path.join(dest, entry.path);
        var directory = isDir ? fullpath : path.dirname(fullpath);

        mkdirp(directory, function(err) {
            if (err) throw err;
            if (! isDir) { // should really make this an `if (isFile)` check...
                entry.pipe(fs.createWriteStream(fullpath));
            }
        });
    });
}

// Migrate and seed database
console.log('> Migrating and seeding database');
db.init().then(() => {
    // Downloading seed audio & image files
    db.DatasetFile.query().select('filename').then(datasetFiles => {
        console.log(`> Downloading ${datasetFiles.length * 2} audio and image files`);
        for (let datasetFile of datasetFiles) {
            let wavName = datasetFile.filename;
            let pngZipName = wavName.replace('.wav', '.tgz');
            download(`${downloadUrl}/${wavName}`, `${path.join(downloadFolder, 'wav', wavName)}`);
            download(`${downloadUrl}/${pngZipName}`, `${path.join(downloadFolder, 'png', pngZipName)}`, () => {
                console.log(`Download finished for ${pngZipName}, now unzipping`);
                unzip(path.join(downloadFolder, 'png', pngZipName), path.join(downloadFolder, 'png', 'test'));
            });

        }
        return db.close();
    }).then(() => {
        console.log(`> Seeding complete, script will exit when downloading is finished`);
    });
});
