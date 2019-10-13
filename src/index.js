#!/usr/bin/env node

const { Transform } = require('stream');
const fs = require('fs');
const path = require('path');

const { dateStamp } = require('../utils/dates');

const args = process.argv.slice(2);


const DEFAULT_NOTES_PATH = path.join('/', 'Users', 'rtrontz', 'Dropbox', 'codesmith', 'csPrep', 'notes');
let notesPath = DEFAULT_NOTES_PATH;
// TODO: insert logic for adjusting default path via command-line args
let cohortNumber;

if (/cohort/.test(args[0])) {
  cohortNumber = args[0].split('=')[1];
}

const notesTitle = `# ${dateStamp()} cs-prep ${cohortNumber} notes  \n\n`
const filename = `${dateStamp()}-cs-prep-${cohortNumber ? `${cohortNumber}-` : ``}notes.md`
/**
 * The goal here is to run a node program that does the following:
 * 1. takes single-line notes from standard input 
 * 2. Transforms those notes into bulleted list items (markdown)
 * 3. Writes them to a file as we go. 
 * 4. Takes a command to close/end the stream 
 * 5. The notes file's title should be of the form cs-prep <cohortNumber> <date>  notes
 */

// Initialize the transform stream to convert input to markdown syntax
const markdownTransform = new Transform({
  transform(chunk, encoding = 'utf-8', callback) {
    const str = chunk.toString().trim();
    const header = /^h\d/
    if (str === 'q') {
      this.emit('close');
    } else if (str === 'sep') {
      this.emit('separator');
      this.push(`\n---  \n\n`);
    } else if (header.test(str)) {
      const level = str.match(header)[0];
      const headerString = str.slice(3);
      this.emit('header');
      this.push(`\n${"#".repeat(level[1])} ${headerString}  \n\n`);
    } else {
      this.emit('note');
      this.push(`* ${str}  \n`)
    }
    callback();
  },
})

// Initialize the writable stream to markdown file.
const notesFile = fs.createWriteStream(path.join(notesPath, filename));

// Add title line to the notes file
notesFile.write(notesTitle);

process.stdin.pipe(markdownTransform)
             .on('separator', () => console.log(' * * * * writing separator * * * * \n'))
             .on('note', () => console.log('* * * * note added * * * * \n'))
             .on('header', () => console.log('* * * * adding header * * * * \n'))
             .on('close', () => {
              console.log('* * * * ending * * * * ')
              notesFile.end();
              process.exit();
            })
             .pipe(notesFile)
