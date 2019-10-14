const fs = require('fs');
const path = require('path');
const { Transform } = require('stream');

require('dotenv').config();

const { dateStamp } = require('./utils/dates');
const { md, txt } = require('./utils/text');

let notesPath = process.env.DEFAULT_PATH;
let domain = process.env.DOMAIN
let domainModifier = process.env.DOMAIN_MODIFIER;

// TODO: configure path domain via command line args
const args = process.argv.slice(2);
if (/^--mod=/.test(args[0])) {
  domainModifier = args[0].split('=')[1];
}

const notesTitle = md.makeTitleText(dateStamp())(domain)(domainModifier)
const filename = txt.makeFilename(dateStamp())('notes')('md')(domain, domainModifier)
// Initialize the transform stream to convert input to markdown syntax
const markdownTransform = new Transform({
  transform(chunk, encoding = 'utf-8', callback) {
    const str = chunk.toString().trim();
    const headerRegEx = /^h\d/
    if (str === 'q') {
      this.emit('close');
    } else if (str === 'sep') {
      this.emit('separator');
      this.push(md.makeSeparator());
    } else if (headerRegEx.test(str)) {
      const level = str.match(headerRegEx)[0][1];
      const headerText = str.slice(3);
      const header = md.makeHeader(level, headerText);
      this.emit('header');
      this.push(md.addTwoLinesToHeader(header));
    } else {
      this.emit('note');
      this.push(md.makeULItem(str))
    }
    callback();
  },
})

// Initialize the writable stream to markdown file.
const fullFilename = path.join(notesPath, filename)
const notesFile = fs.createWriteStream(fullFilename);

// Add title line to the notes file
notesFile.write(notesTitle);
console.log(`Starting new session in ${fullFilename}\n\n`);
process.stdin.pipe(markdownTransform)
             .on('separator', () => console.log(' * * * * new section * * * * \n'))
             .on('note', () => console.log('* * * * note added * * * * \n'))
             .on('header', () => console.log('* * * * header added * * * * \n'))
             .on('close', () => {
              console.log('* * * * session ended * * * * ')
              console.log(`Follow this path to your notes: ${fullFilename}`)
              notesFile.end();
              process.exit();
            })
             .pipe(notesFile)
