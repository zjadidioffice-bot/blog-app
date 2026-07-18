const{body}=require("express-validator");

const postValidation=[
    body("title")
    .trim()
    .notEmpty()
    .withMessage("title is required")
    .isLength({min:3})
    .withMessage("title must be at least 3 chars"),

    body("body")
    .trim()
    .notEmpty()
    .withMessage("body is required")
    .isLength({min:10})
    .withMessage("body must be at least 10 chars")
];
module.exports=postValidation;

