const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/', fileController.getAllFiles);
router.post('/upload', verifyToken, isAdmin, fileController.uploadMiddleware, fileController.uploadFile);
router.delete('/:id', verifyToken, isAdmin, fileController.deleteFile);

module.exports = router;
