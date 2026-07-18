const User = require("../models/User");
const bcrypt = require("bcrypt")
const showLoginForm = (req, res) => {
    res.render("auth/login");
}
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.send("email or password incorrect");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.send("email or password incorrect");
    }
    req.session.user={
        id:user._id,
        username:user.username
    };
    res.redirect("/");
    res.send("login successfully");
}
const logout=(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/login")
    })
}

module.exports={
    showLoginForm,
    login,
    logout
}