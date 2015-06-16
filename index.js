var util = require('util');
var stream = require('stream');
var gutil = require('gulp-util');
var browserify = require('browserify');

function BrowserifyStream(configure) {
  stream.Transform.call(this, { objectMode: true });
  this.configure = configure;
}

util.inherits(BrowserifyStream, stream.Transform);

BrowserifyStream.prototype._transform = function(input, encoding, callback) {
  var self = this;

  var b = this.configure(browserify).add(input.path);
  var output = input.clone({ contents: false });

  b.bundle(function(error, buffer) {
    if (error) {
      callback(error);
    } else {
      output.contents = buffer;
      callback(null, output);
    }
  });
};

module.exports = function(configure) {
  return new BrowserifyStream(configure);
};
