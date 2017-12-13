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

exports.getSong = (req, res) => {
    if (req.query.songName) {
        let songPath = path.join(__dirname, '../song/' + req.query.songName + '.mp3');
        fs.exists(songPath, (exists) => {
            if (exists) {
                fs.createReadStream(songPath).pipe(res);
            }
            else {
                res
                    .status(404)
                    .json({
                        message: 'Song not found...'
                    })
                    .end();
            }
        })
    }
    else {
        res
            .status(500)
            .send({
                message: 'Song name not found...'
            })
            .end();
    }
}
