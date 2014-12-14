var fs = require('fs');
var expectedDir = __dirname + '/expected_files/';
var actualDir = __dirname + '/scratch/';

module.exports = {
  'default': function (test) {
    // Load in the images
    // TODO: If this were BDD, we should be loading this into a canvas and doing a threshold comparison there
    //   (i.e. are the images 90% similar)
    // var expectedCanvasImage = fs.readFileSync(expectedDir + 'canvas.png', 'binary');
    // var expectedGmImage = fs.readFileSync(expectedDir + 'gm.png', 'binary');
    var actualImage = fs.readFileSync(actualDir + 'sprite.png', 'binary');
    // var matchesImage = expectedCanvasImage === actualImage || expectedGmImage === actualImage;

    // Assert they are equal
    // TODO: Perform more accurate assertion
    test.ok(actualImage, 'Actual image does not match expected image');

    // Load in the sprite positions
    // TODO: If this were BDD, we would be asserting the same variables exist -- which means loading this into either
    //   Stylus or a meta-language
    var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.styl', 'utf8');
    var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.styl', 'utf8');

    // Make sure the outputs match
    test.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');

    // Callback since we are done testing
    test.done();
  },
  'jpg,json': function (test) {
    // Load in the images
    // TODO: If this were BDD, we should be loading this into a canvas and doing a threshold comparison there
    //   (i.e. are the images 90% similar)
    var actualImage = fs.readFileSync(actualDir + 'sprite.jpg', 'binary');

    // Assert they are equal
    // TODO: Perform more accurate assertion
    test.ok(actualImage, 'Actual image does not match expected image');

    // Load in the sprite positions
    // TODO: If this were BDD, we would be asserting the same variables exist -- which means loading this into either
    //   Stylus or a meta-language
    var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.json', 'utf8');
    var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.json', 'utf8');

    // Make sure the outputs match
    test.deepEqual(JSON.parse(actualCoords), JSON.parse(expectedCoords),
      'Generated output doesn\'t match expected output.');

    // Callback since we are done testing
    test.done();
  },
  overrides: function (test) {
    // Load in the images
    // TODO: If this were BDD, we should be loading this into a canvas and doing a threshold comparison there
    //   (i.e. are the images 90% similar)
    var actualImage = fs.readFileSync(actualDir + 'sprite.overrides.png', 'binary');

    // Assert they are equal
    // TODO: Perform more accurate assertion
    test.ok(actualImage, 'Actual image does not match expected image');

    // Load in the sprite positions
    // TODO: If this were BDD, we would be asserting the same variables exist -- which means loading this into either
    //   Stylus or a meta-language
    var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions.overrides.styl', 'utf8');
    var actualCoords = fs.readFileSync(actualDir + 'sprite_positions.overrides.styl', 'utf8');

    // Make sure the outputs match
    test.deepEqual(JSON.parse(actualCoords), JSON.parse(expectedCoords),
      'Generated output doesn\'t match expected output.');

    // Callback since we are done testing
    test.done();
  },
  nested: function (test) {
    // Load in the coordinates and extract the path to the sprite file
    var coords = fs.readFileSync(actualDir + '3/4/sprite_positions.styl', 'utf8');

    // Assert the path is the relative one we expect
    test.notEqual(coords.indexOf('../../nested/1/2/spritesheet.png'), -1);

    // Finish the test
    test.done();
  },
  // DEV: This is for testing an edge case -- don't let this strawman you in maintenance.
  empty: function (test) {
    // Setup
    test.expect(2);
    var img = fs.readFileSync(actualDir + 'empty/sprite.png', 'binary');
    var coords = fs.readFileSync(actualDir + 'empty/sprite_positions.json', 'utf8');

    // Assert that an empty file and JSON blob are created
    test.strictEqual(img, '');
    test.strictEqual(coords, '{}');

    // Callback
    test.done();
  },
  // DEV: This is testing an edge case. CSS options are not critical for module functionality.
  cssOpts: function (test) {
    // Setup
    var expectedCoords = fs.readFileSync(expectedDir + 'css_opts/sprite_positions.css', 'utf8');
    var actualCoords = fs.readFileSync(actualDir + 'css_opts/sprite_positions.css', 'utf8');

    // Make sure the outputs match
    test.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');

    // Callback
    test.done();
  },
  // DEV: This is testing an edge case. A custom template is not critical for module functionality.
  cssFunctionTemplate: function (test) {
    // Setup
    var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions_custom_function_template.styl', 'utf8');
    var actualCoords = fs.readFileSync(actualDir + 'sprite_positions_custom_function_template.styl', 'utf8');

    // Make sure the outputs match
    test.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');

    // Callback
    test.done();
  },
  // DEV: This is testing an edge case. A custom template is not critical for module functionality.
  cssMustacheTemplate: function (test) {
    // Setup
    var expectedCoords = fs.readFileSync(expectedDir + 'sprite_positions_custom_mustache_template.styl', 'utf8');
    var actualCoords = fs.readFileSync(actualDir + 'sprite_positions_custom_mustache_template.styl', 'utf8');

    // Make sure the outputs match
    test.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');

    // Callback
    test.done();
  },
  // DEV: This is testing an edge case. A custom template is not critical for module functionality.
  cssVarMap: function (test) {
    // Setup
    var expectedCoords = fs.readFileSync(expectedDir + 'css_var_map/sprite_positions.styl', 'utf8');
    var actualCoords = fs.readFileSync(actualDir + 'css_var_map/sprite_positions.styl', 'utf8');

    // Make sure the outputs match
    test.strictEqual(actualCoords, expectedCoords, 'Generated output doesn\'t match expected output.');

    // Callback
    test.done();
  }
};
