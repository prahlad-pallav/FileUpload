
const express = require("express");
const router = express.Router();

const{localFileUpload, imageUpload, videoUpload, imageSizeReduce} = require("../Controllers/fileUpload");

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReduce", imageSizeReduce);

module.exports = router;