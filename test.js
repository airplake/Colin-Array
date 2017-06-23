var ColinArray = require('./index.js')
var Time = require('time-diff')
var time = new Time()

var arr = new ColinArray('thisIsKey', 'ThisCouldBeAnyString')

time.start('adding')
for (var i = 0; i < 100000; i++) {
  arr.add()
}
console.log('add process: ', time.end('adding'))

time.start('loading')
console.log(arr.getData())
console.log('loading process: ', time.end('loading'))

time.start('finding')
console.log(arr.findByIndex(99999))
console.log('finding process: ', time.end('finding'))
