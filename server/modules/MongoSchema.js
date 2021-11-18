const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//SETUP MODELS SCHEMA
const Product = mongoose.model('Product', new Schema({
    name: String,
    price: Number,
    tags: String,
    categories: String,
    descriptions: String,
    image: String,
    link: String,
    user_name: String,
    date_created: Date
}))

var Lixi = mongoose.model('Lixi', new Schema({
    content: String,
    user: String,
    bao_lixi: Number
}))

var Confess = mongoose.model('Confess', new Schema({
    hashtag: String, 
    image: Array, 
    ip: String, 
    ngayTao: Date, 
    noidung: String, 
    user: String, 
    video: String, 
    clientData: Array,
    background: String,
    analytics: String,
    comments: Array,
    confess_id: String,
    school_id: String,
    uploaded: Boolean,
    audio: Array,
    emotions: Array
}
,{collection: 'Confess'})); 
//var User = mongoose.model('User', new Schema({ email: {type: String}, password: {type: String}, salt: {type: String}, userid: {type: String}, activeId: {type:String}, active: Boolean},{collection: 'User'}));
var Sessions = mongoose.model('sessions', new Schema({data: Array,userid: String , key: String, expired_at: {type: Date, default: Date.now}},{collection: 'sessions'})); 
var User = mongoose.model('Users', new Schema({
    userName: String,
    password: String,
    gender: String,
    active: Boolean,
    activeId: String,
    salt: String,
    ip: String,
    userid: String,
    follower: Array,
    following: Array,
    birthday: Date,
    dateCreated: Date,
    relationship: Array,
    job: Array,
    school: Array,
    rank: Number,
    gold: Number,
    point: Number,
    avatar: String,
    background: String,
    infomation: String,
    country: String,
    live: String,
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,
    lol: String,
    pubgM: String,
    pubg: String,
    friends: Array,
    email: String,
    numberPhone: String,
    nickName: String,
    page: Array,
    group: Array,
    confess:Array
},{collection: 'User'}));

//POST DATABASE
var Posts = mongoose.model('Posts', new Schema({
    userId: String,
    userName: String,
    postId: String,
    title: String,
    dateCreated: {type: Date, default: Date.now},
    privacy: Number, // 0: Public, 1: OnlyMe, 2: Friends
    status: Number, //0: đăng trạng thái, 1: đăng hình ảnh, 2: chia sẻ, 3: đã gắn thẻ,4: đã tạo thăm dò, 5: đã Find Dating,6: đã đăng 1 kỷ niệm, 7: mối quan hệ
    text: String, //STATUS TEXT 
    media: Array,
    likes: Array,
    shares: Array,
    comments: Array,
    embed: String,
    report: Array,
    votes: Array,
    type: Number, //0:Image 1:Videos
    videoThumbnail: String
},{collection: 'Posts'}));

//NOTIFICATION DATABASE
var Notifications = mongoose.model('Notifications', new Schema({
    userid: String,
    userName: String,
    sendToUserId: String,
    text: String,
    thumb: Array,
    dateCreated: Date,
    postId: String,
    readed: Boolean
},{collection: 'Notifications'}));

module.exports = {
    User: User,
    Sessions: Sessions,
    UserSignup: User,
    Confess: Confess,
    Posts: Posts,
    Notifications: Notifications,
    Product: Product,
    Lixi: Lixi
}