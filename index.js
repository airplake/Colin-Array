var md5 = require('md5')

/**
 * Constructor
 * The 0th is always the genesis hash
 * Array()
 */

class ColinArray {
  constructor (key, genesis, last, length) {
    this.genesis = genesis
    this.key = key
    this.last = last || genesis
    this.length = length || 0
    // Validation check
    if (!this.check(last, length)) {
      this.last = this.genesis
      this.length = 0
    }
  }

  /**
   * Get the current Array state
   */
  getData () {
    var output = {
      key: this.key,
      genesis: this.genesis,
      last: this.last,
      length: this.length
    }
    return output
  }

  /**
   * Generate New one
   */
  add () {
    this.last = md5(this.last + this.key)
    this.length ++
    return this.last
  }

  /**
   * Lookup element by index
   */
  findByIndex (index) {
    if (index > this.length) {
      return null
    } else if (index === this.length) {
      return this.last
    } else {
      var target = this.last
      for (var i = 0; i < index; i++) {
        target = md5(target + this.key)
      }
      return target
    }
  }

  /**
   * toString
   */

  getFullData () {
    var cursor = this.genesis
    var arr = [cursor]

    // get all the data
    for (var i = 0; i < this.length; i++) {
      cursor = md5(cursor + this.key)
      arr.push(cursor)
    }

    var output = {
      key: this.key,
      genesis: this.genesis,
      length: this.length,
      last: this.last,
      data: arr
    }

    return output
  }

// check if last and length are matching
  check (last, length) {
    if (length < 0) return false
    if (length === 0 && last !== this.genesis) return false

    var cursor = this.genesis
    for (var i = 0; i < length; i++) {
      cursor = md5(cursor + this.key)
    }
    if (cursor !== last) return false
    return true
  }
}

module.exports = ColinArray
