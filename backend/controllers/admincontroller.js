const userModel= require("../models/allModel");
const bcryptjs  = require("bcryptjs");
const jwt= require("jsonwebtoken");
const dotenv= require ("dotenv");
dotenv.config({path: "./config/config.env"});