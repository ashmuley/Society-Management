const express =require("express");
const router = express.Router();

const {protect} = require("../middleware/auth.middleware");
const {authorizeRoles} =require("../middleware/role.middleware");

const {createService} =require("../controller/service.controller");

console.log("I am here  at routes");
console.log("protect:", protect);



router.post(
    "/create",
    protect,
    authorizeRoles("admin"),
    createService
);

module.exports = router;