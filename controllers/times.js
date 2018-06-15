/**
 * GET /
 * Times page.
 */
exports.index = (req, res) => {
    let result = '';
    const times = process.env.TIMES || 5;
    for (let i = 0; i < times; i++){
        result += i + ' ';
    }
    // res.send(result);
    res.render('pages/times', {title: 'Times', times: result});
};
