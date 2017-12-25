var exports = module.exports = {}
var fs = require('fs');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var request = require('request');

var SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send'
    // 'https://www.googleapis.com/auth/gmail.metadata'
];
var auth = new googleAuth();
var authUrl;
var gmail = google.gmail('v1');
var oauth2Client;

fs.readFile('client_secret.json', (err, content) => {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    let credentials = JSON.parse(content);
    let clientSecret = credentials.installed.client_secret;
    let clientId = credentials.installed.client_id;
    let redirectUrl = credentials.installed.redirect_uris[0];

    oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
});


exports.loginPage = (req, res, next) => {
    if (authUrl)
        res.json({ url: authUrl });
    else
        res
            .status(401)
            .send('Error while connecting Gmail!');
}

exports.getToken = (req, res, next) => {
    oauth2Client.getToken(req.query.code, function (err, token) {
        if (err) {
            console.log('Error while trying to retrieve access token', err);
            return res
                .status(err.code || 401)
                .json({
                    message: 'Error while trying to retrieve access token.',
                    error: err.message
                });
        }

        res.cookie('token', encryptToken(token));
        res.redirect('/home');

        // res.json({
        //     message: 'User authorized successfully!'
        // });
    });
}

exports.getMessageList = (req, res, next) => {
    let auth = oauth2Client;
    auth.credentials = dencryptToken(req.cookies.token);
    gmail.users.messages.list({
        userId: 'me',
        labelIds: req.body.labelId || 'INBOX',
        pageToken: req.body.pageToken || '',
        q: req.body.query || 'in:inbox -category:(promotions OR social)',
        maxResults: 10,
        auth: auth,
    }, (err, result) => {
        if (err) {
            console.log('err', err);
            res
                .status(err.code || 401)
                .json({
                    message: 'Error while receiving Gmail inbox',
                    error: err.message
                });
        }
        else {
            if (!result.messages) {
                return res
                    .status(500)
                    .json({
                        message: 'Error while receiving Gmail inbox'
                    });
            }

            let messagePromiseList = result.messages
                .map(message => {
                    return new Promise((resolve, reject) => {
                        getMessageDetail(message.id, auth)
                            .then(messageDetail => resolve(messageDetail))
                            .catch(err => reject(err));
                    });
                });

            Promise.all(messagePromiseList)
                .then(messageList => {
                    res.json({
                        message: 'Emails fetched successfully!',
                        data: Object.assign({}, result, { messages: messageList })
                    });
                })
                .catch(err => {
                    console.log('Promise all error', err)
                    res
                        .status(102)
                        .json({
                            message: 'Error while receiving Gmail inbox or may be it took to much time to process.',
                            error: err
                        });
                });
        }
    });
}

exports.sendMail = (req, res, next) => {
    if (!req.body.receiverEmail || !req.body.mailSubject || !req.body.mailBody) {
        return res.
            status(400)
            .json({
                message: 'Please provide required fields...'
            });
    }

    let auth = oauth2Client;
    auth.credentials = dencryptToken(req.cookies.token);
    gmail.users.messages.send({
        userId: 'me',
        auth: auth,
        resource: {
            raw: makeEmailBody(req.body.receiverEmail, req.body.senderEmail, req.body.mailSubject, req.body.mailBody)
        }
    }, (err, response) => {
        if (err) {
            return res.
                status(err.code || 520)
                .json({
                    message: 'Error while sending mail please try later...',
                    err: err
                });
        }

        res.json({
            message: 'Email send successfully!',
            data: response
        });
    });
}

exports.logout = (req, res, next) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.clearCookie("token");
    res.json({
        message: 'Logout successfully!'
    });
}

exports.getLableList = (req, res, next) => {
    let auth = oauth2Client;
    auth.credentials = dencryptToken(req.cookies.token);
    gmail.users.labels.list({
        userId: 'me',
        auth: auth,
    }, (err, lableList) => {
        if (err) {
            return res.json({
                message: 'Error while fetching lable list.',
                error: err
            });
        }

        res.send({
            message: 'Label list fetched successfully!',
            data: lableList
        });
    });
}

exports.getLableDetail = (req, res, next) => {
    let auth = oauth2Client;
    auth.credentials = dencryptToken(req.cookies.token);
    gmail.users.labels.get({
        id: req.query.labelId || 'CATEGORY_FORUMS',
        userId: 'me',
        auth: auth,
    }, (err, labelData) => {
        if (err) {
            return res
                .status(err.code || 400)
                .json({
                    message: 'Error while fetching list detail.',
                    error: err
                });
        }

        res.json({
            message: 'List detail fetched successfully!',
            data: labelData
        });
    });
}

exports.verifyToken = (req, res, next) => {
    tokeninfo(dencryptToken(req.cookies.token).access_token)
        .then(data => res.json(data))
        .catch(error => res.status(error.status).json(error))

}


function getMessageDetail(messageID, auth) {
    return new Promise((resolve, reject) => {
        gmail.users.messages.get({
            id: messageID,
            userId: 'me',
            auth: auth,
        }, (err, message) => {
            if (err) {
                reject({
                    message: 'Error while fetching email.',
                    error: err
                });
                return;
            }

            resolve(message);
        });
    });
}

function makeEmailBody(receiverEmail, senderEmail, mailSubject, mailBody) {
    let mailString = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", receiverEmail, "\n",
        "from: ", senderEmail, "\n",
        "subject: ", mailSubject, "\n\n",
        mailBody
    ].join('');

    return new Buffer(mailString).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
}

function encryptToken(token) {
    return new Buffer(JSON.stringify(token)).toString('base64');
}

function dencryptToken(token) {
    return JSON.parse(new Buffer(token, 'base64').toString());
}

function tokeninfo(access_token) {
    return new Promise((resolve, reject) => {
        request('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + access_token, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve({
                    data: body,
                });
            } else {
                reject({
                    error: body,
                    status: response.statusCode
                });
            }
        });
    });
}