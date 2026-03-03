"use strict"

const { describe, it, beforeEach, afterEach } = require("node:test")
const assert = require("node:assert/strict")
const fs     = require("fs")
const path   = require("path")
const os     = require("os")
const popp   = require("../")

const tmp = path.join(os.tmpdir(), "popp-test-" + process.pid)

function writeTmp(name, content) {
  const filepath = path.join(tmp, name)
  fs.writeFileSync(filepath, content)
  return filepath
}

describe("popp", function() {

  beforeEach(function() {
    fs.mkdirSync(tmp, { recursive: true })
  })

  afterEach(function() {
    fs.rmSync(tmp, { recursive: true, force: true })
  })

  it("should pop the first line from a file", function() {
    const filepath = writeTmp("test.txt", ["one", "two", "three"].join(os.EOL))
    const result = popp(filepath)
    assert.equal(result, "one")
    const remaining = fs.readFileSync(filepath, "utf8")
    assert.equal(remaining, ["two", "three"].join(os.EOL))
  })

  it("should pop the last remaining line", function() {
    const filepath = writeTmp("single.txt", "only")
    const result = popp(filepath)
    assert.equal(result, "only")
    const remaining = fs.readFileSync(filepath, "utf8")
    assert.equal(remaining, "")
  })

  it("should rotate the popped line to the end with rotate option", function() {
    const filepath = writeTmp("rotate.txt", ["one", "two", "three"].join(os.EOL))
    const result = popp(filepath, { rotate: true })
    assert.equal(result, "one")
    const remaining = fs.readFileSync(filepath, "utf8")
    assert.equal(remaining, ["two", "three", "one"].join(os.EOL))
  })

  it("should throw on an empty file", function() {
    const filepath = writeTmp("empty.txt", "")
    assert.throws(function() {
      popp(filepath)
    }, { message: "Empty!" })
  })

  it("should throw when file does not exist", function() {
    assert.throws(function() {
      popp(path.join(tmp, "nope.txt"))
    })
  })

  it("should work with non-.txt files", function() {
    const filepath = writeTmp("data.csv", ["a,b,c", "1,2,3"].join(os.EOL))
    const result = popp(filepath)
    assert.equal(result, "a,b,c")
    const remaining = fs.readFileSync(filepath, "utf8")
    assert.equal(remaining, "1,2,3")
  })

})
