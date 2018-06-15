const cool = require('cool-ascii-faces');

/**
 * GET /
 * Cool page.
 */
exports.index = (req, res) => {
    res.render('pages/cool-faces', {title: 'Cool Ascii Faces', coolFaces: cool()});
};
