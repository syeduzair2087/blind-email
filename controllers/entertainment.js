var exports = module.exports = {}
var path = require('path');;
var pdfText = require('pdf-text');
var fs = require('fs');

exports.getPdfText = (req, res, next) => {
    if (req.query.fileName) {
        let pathToPdf = path.join(__dirname, '../pdf/' + req.query.fileName + '.pdf');
        pdfText(pathToPdf, function (err, data) {
            if (err) {
                return res
                    .status(400)
                    .json({
                        message: 'Error while reading Pdf',
                        error: err
                    })
            }

            res.json({
                message: 'Data extract successfully!',
                data: data.join(' ')
            });
        })
    }
    else {
        res
            .status(404)
            .json({
                message: 'Pdf not found.'
            });
    }

}
