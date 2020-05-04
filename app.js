const express       = require("express"),
      mongoose      = require("mongoose"),
      bodyParser    = require("body-parser"),
      passport      = require("passport"),
      LocalStrategy = require("passport-local"),
      flash         = require("connect-flash");

var User = require("./models/user");
let userRoutes = require("./routes/index");
let postRoutes = require("./routes/posts");

let app = express();

mongoose.connect("mongodb://localhost/ideia", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use(express.static(__dirname + '/public'));

app.use(require("express-session")({
    secret: "Frase ultrassecreta",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(userRoutes);
app.use(postRoutes);

app.listen(3000);