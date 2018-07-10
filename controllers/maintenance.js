/**
 * GET /
 * Maintenance page.
 */
exports.index = (req, res) => {
    res.render('pages/maintenance', {title: 'Maintenance'});
};
