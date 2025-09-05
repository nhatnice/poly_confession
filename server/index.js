const DEBUG = false;
//const cookieParser = require('cookie-parser');
const express = require("express");
const mongoose = require('mongoose');
const Schema = require('./modules/MongoSchema.js');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');
const mongoHost = "mongodb+srv://lavenesconfession:LavenesConfessionDB2022hjklakj@cluster0.8gfsr5m.mongodb.net/Confession?retryWrites=true&w=majority&appName=Cluster0";
const Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function (e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function (e) {
        e = e.replace(/rn/g, "n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function (e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fileTypes = /png|jpg|gif|jpeg/;
const storage = multer.diskStorage({ //UPLOADS FILE
    destination: function (req, file, cb) {
        cb(null, "./public/media");
    },
    filename: function (req, file, cb) {
        cb(null, randomID() + "-" + file.originalname);
    }
});
//IMAGE AND VIDEO UPLOAD
const imageUpload = multer({ //multer settings
    storage: storage,
    //KIỂM TRA ĐỊNH DẠNG FILE 
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
    limits: {
        fieldSize: 8 * 1024 * 1024
    }
});

//RANDOM ID FUNCTION
var randomID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString();
};
//CONNECT TO MONGOHOST
mongoose.connect(mongoHost, {
    useNewUrlParser: true
}, function (err) {
    if (err) {
        return console.log(err);
    }

    return console.log("Connected to MongoDB!");
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', DEBUG ? '*' : '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");


// Certificate
// const privateKey = !DEBUG ? fs.readFileSync('/etc/letsencrypt/live/server.confession.lavenes.com/privkey.pem', 'utf8') : "";
// const certificate = !DEBUG ? fs.readFileSync('/etc/letsencrypt/live/server.confession.lavenes.com/fullchain.pem', 'utf8') : "";
// const ca = !DEBUG ? fs.readFileSync('/etc/letsencrypt/live/server.confession.lavenes.com/fullchain.pem', 'utf8') : "";

// const credentials = {
//     key: privateKey,
//     cert: certificate,
//     ca: ca
// }; //HTTPS SERVER
// const server = DEBUG ? http.createServer(app) : https.createServer(credentials, app);
const server = http.createServer(app);

server.listen(8002, () => {
    console.log('Server running on port 8002');
});
const io = require("socket.io")(server);

//CALL SERVER
io.on("connection", function (socket) {

    //CLIENT SEND COMMENT
    socket.on("client-send-comment", (data) => {
        let new_comment_data = {
            comment: data.comment,
            images: data.images,
            videos: data.videos,
            user: data.user,
            date: data.date,
            type: data.type,
            likes: data.likes
        }

        Schema.Confess.updateOne({
            _id: data.post_id
        }, {
            $push: {
                comments: new_comment_data
            }
        }, (err) => {
            if (err) throw err;
            socket.broadcast.emit("server-send-comment", data);
            console.log("SUCCESS");
        });
    })

});

//WEBSITE FUNCTIONS
//#region
//KIỂM TRA TÍNH HỢP LỆ CỦA EMAIL
function isEmail(email) {
    var isValid = false;
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(email)) {
        isValid = true;
    }
    return isValid;
}

//CHECK FILE TYPE FUNCTION
function checkFileType(file, cb) {
    let ext = fileTypes.test(path.extname(file.originalname).toLowerCase());
    let mimetype = fileTypes.test(file.mimetype);

    if (mimetype && ext) {
        return cb(null, true);
    } else {
        cb("File bạn vừa up không nằm trong định dạng cho phép của Confess hoặc vượt quá 8MB");
    }
}

//#endregion

//API
//#region

const API = '/laven_api/v1/';

//PRODUCT API
//#region 
app.post(API + 'create_product', (req,res) => {
    let data = req.body.data;

    Schema.Product.create(data, (err) => {
        if(err) throw errr;
        
        res.send("SUCCESS");
    })
})

//GET PRODUCTS
app.get(API + 'get_products/:category', (req,res) => {
    if(req.params.category == 'all') {
        Schema.Product.find({}, (err, result) => {
            if(err) throw err;
            res.send(result);
        })

    }else{
        Schema.Product.find({categories: req.params.category}, (err, result) => {
            if(err) throw err;
            res.send(result);
        })
    }
})
//#endregion

//UPLOAD IMAGE API
app.post('/uploadImage', imageUpload.single('image'), (req, res, next) => {
    res.send({
        msg: "Hình ảnh đã được upload!",
        fileName: req.file.filename
    });
});

app.post(API + 'upload_file', imageUpload.single('file'), (req,res,next) => {
    res.send({
        fileName: req.file.filename
    })
})

//CREATE MUSIC CONFESS
app.get('/hellofromboss', (req, res) => {
    
});

//CREATE LIXI
app.post(API + 'create_lixi', (req,res) => {
    let data = req.body.data;

    Schema.Lixi.create(data, (err, result) => {
        if(err) throw err;

        res.send(result);
    })
})

//GET LIXI
app.get(API + 'get_lixi/:id', (req,res) => {
    Schema.Lixi.findOne({_id: req.params.id}, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

//CLIENT SEND ENOTION API
app.post(API + 'client_send_emotion/:confess_id', (req, res) => {
    Schema.Confess.findOne({
        _id: req.params.confess_id
    }, (err, result) => {
        if (err) throw err;

        //CHECK IF CLIENT LIKED
        if (result.emotions.map(function (e) {
                return e.client_ip;
            }).indexOf(req.body.client_ip) <= -1) {
            //SEND EMOTIONS
            Schema.Confess.updateOne({
                _id: req.params.confess_id
            }, {
                $push: {
                    emotions: req.body
                }
            }, (err) => {
                if (err) throw err;
                res.send(200);
            });
        } else {
            //REMOVE EMOTIONS
            Schema.Confess.updateOne({
                _id: req.params.confess_id
            }, {
                $pull: {
                    emotions: {
                        client_ip: req.body.client_ip
                    }
                }
            }, (err) => {
                if (err) throw err;
                res.send(200);
            });
        }
    });
});

//DELETE CONFESS API
app.get(API + 'delete_confess/nhatsdevil/:id', (req, res) => {
    Schema.Confess.deleteOne({
        _id: req.params.id
    }, (err) => {
        if (err) throw err;
        res.send(200);
    });
});

//GENERATE CONFESS API
app.get(API + 'generate_confess/:school_id', (req, res) => {
    const school_id = req.params.school_id;
    Schema.Confess.find({
        school_id: school_id
    }, (err, result) => {
        if (err) throw err;
        let data = result.filter((data, i) => {
            return DEBUG ? data.uploaded : !data.uploaded
        })

        Schema.Confess.updateMany({
            uploaded: false,
            school_id: school_id
        }, {
            uploaded: true
        }, (err) => {
            if (err) throw err;

            return res.render('confess_generate', {
                data: data
            });
        })
    });
});

//SEND CONFESS API
app.post(API + 'send_confess/:school_id', (req, res) => {
    let data = req.body;
    let school_id = req.params.school_id;

    Schema.Confess.find({
        school_id: school_id
    }, (err, result) => {
        if (err) throw err;
        var confess = data;

        confess["uploaded"] = false;
        confess["audio"] = [""];
        confess["emotions"] = [];
        confess["hashtag"] = confess["hashtag"].replace(/Đéo |đéo |Cu |cu |Địt |địt | Nứng|nứng|Dick|dick|pussy|Pussy|đụ mẹ|lồn|Lồn|đụ |Đụ |Cặc|cặc|phò|tao|mày|Tao|Mày/g, function (word) {
            word = word.toLowerCase();

            if (word === 'đụ mẹ') return 'đm';
            if (word === 'lồn') return 'l*n';
            if (word === 'phò') return 'fò';
            if (word === 'tao') return 't';
            if (word === 'mày') return 'm';
            if (word === 'đụ ') return 'đ* ';
            if (word === 'cặc') return 'c*c';
            if (word === 'fuck') return 'f*ck';
            if (word === 'dick') return 'd*ck';
            if (word === 'pussy') return 'p*ssy';
            if (word === 'nứng') return 'n*ng';
            if (word === 'địt') return 'đ*t';
            if (word === 'cu') return 'c*';
            if (word === 'đéo') return 'méo';
        })

        let count = 0;
        for (var i = 0; i < result.length; i++) {
            new Date(result[i].ngayTao).getFullYear() !== new Date(data.date).getFullYear() ? count += 1 : ""
        }

        confess["confess_id"] = new Date().getFullYear().toString().substr(2, 2) + (count <= 9 ? "0" + count : count);

        confess["noidung"] = confess["noidung"].replace(/Đéo |đéo |Cu |cu |Địt |địt | Nứng|nứng|Dick|dick|pussy|Pussy|đụ mẹ|lồn|Lồn|đụ |Đụ |Cặc|cặc|phò|tao|mày|Tao|Mày/g, function (word) {
            word = word.toLowerCase();
            if (word === 'đụ mẹ') return 'đm';
            if (word === 'lồn') return 'l*n';
            if (word === 'phò') return 'fò';
            if (word === 'tao') return 't';
            if (word === 'mày') return 'm';
            if (word === 'đụ ') return 'đ* ';
            if (word === 'cặc') return 'c*c';
            if (word === 'fuck') return 'f*ck';
            if (word === 'dick') return 'd*ck';
            if (word === 'pussy') return 'p*ssy';
            if (word === 'nứng') return 'n*ng';
            if (word === 'địt') return 'đ*t';
            if (word === 'cu') return 'c*';
            if (word === 'đéo') return 'méo';
        })
        //INSERT CONFESS LEN DATABASE
        Schema.Confess.create(confess);
    });
});

//GET ALL CONFESS API
app.get(API + 'get_all_confess', (req, res) => {
    Schema.Confess.find({}, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//LOAD CONFESS TO PAGE API
app.get(API + 'get_confess/:range/:school_id', (req, res) => {
    const range = req.params.range;
    const confess_limit = 10;
    const school_id = req.params.school_id;

    Schema.Confess.find({
        school_id: school_id
    }, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    }).skip(range * confess_limit).limit(confess_limit).sort({
        $natural: -1
    })

});

//GET SINGLE CONFESS
app.get(API + 'get_single_confess/:id', (req, res) => {
    Schema.Confess.findOne({
        _id: req.params.id
    }, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/update', (req, res) => {
    Schema.Confess.updateMany({}, {
        $set: {
            school_id: 'tcnhv'
        }
    }, (err) => {
        if (err) throw err;
        console.log("AAA");
        res.send(200);
    });
});
//

//#endregion
