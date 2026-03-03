"use strict"

const fs   = require("fs")
const path = require("path")
const os   = require("os")

module.exports = function(filepath, options) {
  if (!options) {
    options = {}
  }

  // read file
  const contents = fs.readFileSync(path.resolve(filepath || ""))

  // parse lines, filter out empty strings
  const arr = contents.toString().split(/\r?\n/).filter(function(line) {
    return line !== ""
  })

  if (arr.length === 0) {
    throw new Error("Empty!")
  }

  // take the first message
  const msg = arr.shift()

  // push onto bottom if `--rotate`
  if (options["rotate"]) {
    arr.push(msg)
  }

  // join contents
  const str = arr.join(os.EOL)

  // write to disk
  fs.writeFileSync(filepath, str)

  // return message
  return msg
}
