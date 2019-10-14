function makeHeader(level, headerText) {
  return `${'#'.repeat(level)} ${headerText}`
}

function addNewLinesToHeader(newlineCount, header) {
  return `${header}  ${'\n'.repeat(newlineCount)}`
}

const makeTitleText = date => domain => (...modifiers) => 
  `# ${date} ${domain}${modifiers.length ? ` ${modifiers.join(' ')} ` :` `} notes\n\n`

const makeSeparator = () => `\n---\n\n`

const makeULItem = text => `- ${text}\n`

const makeFilename = date => suffix => extension => 
  (...words) => `${date}-${words.length ? `${words.join('-')}-` : ``}${suffix}.${extension}`



module.exports = { 
  md: {
    makeHeader, 
    addNewLinesToHeader,
    makeTitleText,
    makeSeparator,
    makeULItem
  },
  txt: {
    makeFilename
  }
}

