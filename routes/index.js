var express = require('express');
var router = express.Router();
const userModel=require("./users");
const passport = require('passport');
const postModel=require("./post");
const localStrategy = require('passport-local');
const uploads=require("./multer");


passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/signup', function(req, res) {
  res.render('signup');
});
router.get('/signin', function(req, res) {
  res.render('signin');
});

router.get('/scan',isLoggedIn, function(req, res) {
  res.render('scan');
});
router.get('/scanner', function(req, res) {
  res.render('scanner');
});
router.get('/features', function(req, res) {
  res.render('features');
});
router.get('/blog', function(req, res) {
  res.render('blog');
});
router.get('/aboutus', function(req, res) {
  res.render('aboutus');
});
router.get('/search', function(req, res) {
  res.render('search');
});
router.get('/contactus',isLoggedIn, function(req, res) {
  res.render('contactus');
});

router.post("/contactus",isLoggedIn,async function(req,res){
  const user= await userModel.findOne({username:req.session.passport.user});
  const post= await postModel.create({
    user:user._id,
    // user:user.username,
    name:req.body.name,
    phone:req.body.phone,
    email:req.body.email,
    company:req.body.company,
    subject:req.body.subject,
    question:req.body.question,
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect("/");
});


router.post("/signup",function(req,res,next){
  const userData= new userModel({
    username:req.body.username,
    email:req.body.email,
  });
  userModel.register(userData,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res, function(){
      res.redirect("/");
    })
  })
});

router.post('/signin',passport.authenticate("local",{
  // successRedirect:"/",
  failureRedirect:"/signin"
})
, function(req, res) {
  res.redirect("/");
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated())
  return next();
res.redirect("/signup");
}

module.exports = router;
