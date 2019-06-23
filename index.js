'use strict;'
const fs = require ('fs')
const readline = require('readline')
console.log('example use of readline')

function example_cb(err, info) {
    let f = 'unknown'
    if(info && info.f) { f = info.f }
    if(err) {
        console.error(`unable to process the file '${f}'`, err)
        return
    }
    console.log(`process file complete for '${f}'`, info)
}

procfile('lines.txt', example_cb)
procfile('nonex.txt', example_cb)
procfile('empty.txt', example_cb)
procfile('lines.txt', example_cb)
procfile('empty.txt', example_cb)

function procfile(inputFile, cb) {
    try {
        let info = { f: inputFile, linecount: 0 }
        console.log(`read '${inputFile}'`)
        console.debug('create stream...')
        let instream = fs.createReadStream(inputFile).on('error', (err) => {cb(err, info)})
        console.debug('create readline interface...')
        let r = readline.createInterface(instream)
        console.debug('readline events...')
        let linecount = 0
        r.on('line', function (line) {
            linecount++
            
        }).on('close', function() {
            console.debug(`close event for '${inputFile}'`)
            console.log('Lines from file:', linecount)
            info.linecount = linecount
            cb(null, info)
        }).on('error', function(err) {
            cb(err, info)
        })
        console.debug(`what now for '${inputFile}'?`)
    } catch(err) {
        cb(err, info)
    }
}

