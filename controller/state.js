const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const State = require("../model/state");


// Create a new state => Admin
exports.createState= catchAsyncErrors(async (req, res,next) => {
  try {
    const { title, ar_title,country } = req.body;

    // Validation to ensure required fields are present
    if (!title || !ar_title  || !country) {
      return next(new ErrorHandler("Please provide all fields!", 400));
    }


   
    const newState = await State.create({
      title:title,
      ar_title:ar_title,
      country:country
    });

    return res.status(201).json({
      message: "Wooooo! State created successfully.",
      state: newState,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Create a array of states in one request => Admin
exports.createStates= catchAsyncErrors(async (req, res, next) => {
  try {
    const {states} = req.body; //  req.body has an array of states objects

    // Validation to ensure required fields are present for each state
    if (!Array.isArray(states) || states.length === 0) {
      return next(new ErrorHandler("Please provide an array of states!", 400));
    }


    const newStates = await State.insertMany(states.map(state => ({
      title: state.title,
      ar_title: state.ar_title,
      country:state.country
    })));

    return res.status(201).json({
      message: "States created successfully.",
      state: newStates,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete a state by ID => Admin
exports.deleteState = catchAsyncErrors(async (req, res,next) => {
  try {
    const { state_id } = req.params;

    // Call the findOneAndDelete 
    const state = await State.findOneAndDelete({ _id: state_id });

    if (!state) {
        return next(new ErrorHandler("State not found!", 404));
      }

    return res.status(200).json({ 
      success: true,
      message: "State deleted successfully." 
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update a state by ID => Admin
exports.updateState = catchAsyncErrors(async (req, res,next) => {
  try {
    const { state_id } = req.params;
    const values = req.body;

    // Find the state by ID and update
    const updatedState= await State.findByIdAndUpdate(
        state_id,
      values,
      { new: true, runValidators: true } // new: true to return the updated document
    );

    if (!updatedState) {
      return next(new ErrorHandler("State Not Found",400));
    }

    return res.status(200).json({
      success: true,
      message: "State updated successfully.",
      updatedState
    });
  } catch (error) {
    return next(new ErrorHandler(error.message,500));
  }
});

// Get all states => Admin
exports.getStates= catchAsyncErrors(async (req, res,next) => {
  try {
    const { country_id } = req.params;

    // Fetch the states 
    const states = await State.find({country:country_id});

    if (!states) {
      return next(new ErrorHandler("No States found!", 404));
    }


    res.status(200).json({
      success: true,
      states,   // The states data

    });
  } catch (error) {
    return next(new ErrorHandler(error.message,500));
  }
});


