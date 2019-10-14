const makeHeader = (level, headerText) => `${'#'.repeat(level)} ${headerText}`;

const  addNewLinesToHeader = (newlineCount) => (header) => `${header}  ${'\n'.repeat(newlineCount)}`
const addTwoLinesToHeader = addNewLinesToHeader(2);

const makeTitleText = date => domain => (...modifiers) => 
  `# ${date} ${domain}${modifiers.length ? ` ${modifiers.join(' ')} ` :` `} notes\n\n`

const makeSeparator = () => `\n---\n\n`

const makeULItem = text => `- ${text}\n`

const makeFilename = date => suffix => extension => 
  (...words) => `${date}-${words.length ? `${words.join('-')}-` : ``}${suffix}.${extension}`

module.exports = { 
  md: {
    makeHeader, 
    addTwoLinesToHeader,
    makeTitleText,
    makeSeparator,
    makeULItem
  },
  txt: {
    makeFilename
  }
}

