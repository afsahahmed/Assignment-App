const express= require("express");
const {createQuestion, getQuesDetails, deleteQuestion, updateQuestion } = require("../controllers/quesController");
const {createAssignment, getAssignmentDetails, deleteAssignment, updateAssignment } = require("../controllers/assignController");
const {registerTeacher, loginUser, getUserDetails, deleteUser, updateUser, blockTeacher } = require("../controllers/userController");
const { verifyToken, authorizedRoles } = require("../middleware/auth");
const router= express.Router();


// ADMIN ROUTES
router.route("/user/block").put(authorizedRoles("admin"),blockTeacher); //CHECK

//QUESTION ROUTES
router.route("/question/new").post(authorizedRoles("teacher"), createQuestion);
router.route("/question/getDetails").get(authorizedRoles(["teacher","admin"]),getQuesDetails);
router.route("/question/delete").delete(authorizedRoles(["teacher","admin"]),deleteQuestion);
router.route("/question/update").put(authorizedRoles(["teacher"]),updateQuestion);

//TEACHER ROUTES
router.route("/user/login").post(loginUser);
router.route("/user/new").post(authorizedRoles("teacher"),registerTeacher);
router.route("/user/getDetails").get(authorizedRoles(["teacher","admin"]),getUserDetails);
// router.route("/user/delete").delete(authorizedRoles(["teacher","admin"]),deleteUser);
router.route("/user/update").put(authorizedRoles(["teacher"]),updateUser);

//ASSIGNMENT ROUTES
router.route("/assignment/new").post(authorizedRoles("teacher"),createAssignment);
router.route("/assignment/getAssignmentDetails").get(authorizedRoles(["teacher","admin"]),getAssignmentDetails);
router.route("/assignment/delete").delete(authorizedRoles(["teacher","admin"]),deleteAssignment);
router.route("/assignment/update").put(authorizedRoles(["teacher"]),updateAssignment);


module.exports= router;
