const express = require("express");
const path = require("path");
const User = require('../model/user');
const router = express.Router();
// import section 
const {upload} = require("../multer");
const ErrorHandler = require("../utils/Errorhandler");
const { fileURLToPath } = require("url");

router.post("/create-user", upload.single("file"), async(req,res,next) => {
    const {name,email,password} = req.body;
    const userEmail = await User.findOne({email});
    if(userEmail) {
        return nextTick(new ErrorHandler("User already exist", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = {
        name: name,
        email: email,
        password: password,
        avatar: fileUrl,
    };

    console.log(user);
})

module.exports = router;