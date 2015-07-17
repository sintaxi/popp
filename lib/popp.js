
var fs        = require("fs")
var path      = require("path")
var os        = require("os")


// quick and dirty
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
}


// sync
module.exports = function(filepath, options){
  if (!options) {
    options = {}
  }

  // read file
  var contents = fs.readFileSync(path.resolve(filepath || ""))

  // abort unless it is a text file
  if (path.extname(filepath) !== ".txt") {
    throw "Wrong file type. Must be .txt"
  }

  // fetch parse lines
  var arr   = contents.toString().split(/\r?\n/).clean("")

  if (arr.length == 0)
    throw "Empty!"

  // take the first message
  var msg = arr.shift()

  // push onto bottom if `--rotate`
  if (options["rotate"]) {
    arr.push(msg)
  }

  // join contents
  str = arr.join(os.EOL)

  // write to disk
  fs.writeFileSync(filepath, str)

  // return message
  return msg
}