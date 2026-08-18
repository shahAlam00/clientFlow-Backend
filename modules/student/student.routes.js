import express from 'express';
import { upload } from "../../middleware/multer.middleware.js";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from './student.controller.js';

const router = express.Router();

router.route('/')
  .get(getAllStudents)
  .post(upload.single('profileImage'), createStudent);

router.route('/:id')
  .get(getStudentById)
  .put(upload.single('profileImage'), updateStudent)
  .delete(deleteStudent);

export default router;