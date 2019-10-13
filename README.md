# Node Note Streamer

This is package designed to take lines of text input via the terminal, transform those lines, and then stream them directly to a markdown file. 

## Installation 

## Use

Before your first use: 
* make a `.env` file in the root directory 
* set the following environment variables: `DEFAULT_PATH`, `DOMAIN`, and `DOMAIN_MODIFIER`

run the program with `node <path to this directory>/src/index.js`

### Commands  

* add notes by entering a string through your terminal and pressing `return`
* add horizontal separator to your notes with `sep`
* add a header with `h[heading level] [some header]` 
  * e.g. `h2 this will be a heading`
* end the session with `q`
* go get your notes using the file path provided to you


## What should we be able to do? 

The goal here is to run a node program that does the following:
1. takes single-line notes from standard input 
2. Transforms those notes into bulleted list items (markdown)
3. Writes them to a file as we go. 
4. Takes a command to close/end the stream 
5. The notes file's title should be of the form <date> <domain> <domainModifier> notes
 

## Troubleshooting

## Contributing

