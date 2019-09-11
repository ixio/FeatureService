'use strict';

const { spawnSync } = require( 'child_process' );
const db = require('./db');

const download_url = 'https://cdn.oceandataexplorer.org'
const download_folder = __dirname + '/resources/annotator'

function run_cmd(cmd) {
    console.log('> Running ' + cmd);
    let correct_cmd = cmd.replace('knex', 'node node_modules/knex/bin/cli.js');
    let [head, ...tail] = correct_cmd.split(' ');
    let launched_cmd = spawnSync(head, tail);
    if (launched_cmd.stderr.toString() != '') {
        console.log(launched_cmd.stderr.toString());
    } else {
        console.log(launched_cmd.stdout.toString());
    }
}

run_cmd('knex migrate:latest');
run_cmd('knex seed:run');
db.DatasetFile.query().select('filename').then(dataset_files => {
    for (let dataset_file of dataset_files) {
        let wav_name = dataset_file.filename;
        let png_name = wav_name.replace('.wav', '.png');
        run_cmd(`wget -O ${download_folder}/wav/${wav_name} ${download_url}/${wav_name}`);
        run_cmd(`wget -O ${download_folder}/png/${png_name} ${download_url}/${png_name}`);
    }
    return;
});
