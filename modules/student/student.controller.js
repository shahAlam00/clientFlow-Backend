import Student from './student.model.js'; 
 
// @desc    Create a new student record 
// @route   POST /api/students 
// @access  Public / Private 
export const createStudent = async (req, res) => { 
  try { 
    const newStudent = new Student(req.body); 
    const savedStudent = await newStudent.save(); 
 
    res.status(201).json({ 
      success: true, 
      message: 'Student registered successfully', 
      data: savedStudent, 
    }); 
  } catch (error) { 
    res.status(400).json({ 
      success: false, 
      message: 'Failed to register student', 
      error: error.message, 
    }); 
  } 
}; 
 
// @desc    Get all student records 
// @route   GET /api/students 
// @access  Public / Private 
export const getAllStudents = async (req, res) => { 
  try { 
    const students = await Student.find().sort({ createdAt: -1 }); 
 
    res.status(200).json({ 
      success: true, 
      count: students.length, 
      data: students, 
    }); 
  } catch (error) { 
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching students', 
      error: error.message, 
    }); 
  } 
}; 
 
// @desc    Get single student by ID 
// @route   GET /api/students/:id 
// @access  Public / Private 
export const getStudentById = async (req, res) => { 
  try { 
    const student = await Student.findById(req.params.id); 
 
    if (!student) { 
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found', 
      }); 
    } 
 
    res.status(200).json({ 
      success: true, 
      data: student, 
    }); 
  } catch (error) { 
    res.status(500).json({ 
      success: false, 
      message: 'Server error while fetching student', 
      error: error.message, 
    }); 
  } 
}; 
 
// @desc    Update student record 
// @route   PUT /api/students/:id 
// @access  Public / Private 
export const updateStudent = async (req, res) => { 
  try { 
    // findByIdAndUpdate with runValidators to check enums on update 
    const updatedStudent = await Student.findByIdAndUpdate( 
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } 
    ); 
 
    if (!updatedStudent) { 
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found to update', 
      }); 
    } 
 
    res.status(200).json({ 
      success: true, 
      message: 'Student updated successfully', 
      data: updatedStudent, 
    }); 
  } catch (error) { 
    res.status(400).json({ 
      success: false, 
      message: 'Failed to update student', 
      error: error.message, 
    }); 
  } 
}; 
 
// @desc    Delete student record 
// @route   DELETE /api/students/:id 
// @access  Public / Private 
export const deleteStudent = async (req, res) => { 
  try { 
    const deletedStudent = await Student.findByIdAndDelete(req.params.id); 
 
    if (!deletedStudent) { 
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found to delete', 
      }); 
    } 
 
    res.status(200).json({ 
      success: true, 
      message: 'Student deleted successfully', 
      data: {}, 
    }); 
  } catch (error) { 
    res.status(500).json({ 
      success: false, 
      message: 'Server error while deleting student', 
      error: error.message, 
    }); 
  } 
};