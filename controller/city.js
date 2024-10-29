const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const City = require("../model/city");


// Create a new city => Admin
exports.createCity= catchAsyncErrors(async (req, res,next) => {
  try {
    const { title, ar_title,state } = req.body;

    // Validation to ensure required fields are present
    if (!title || !ar_title  || !state) {
      return next(new ErrorHandler("Please provide all fields!", 400));
    }


   
    const newCity = await City.create({
      title:title,
      ar_title:ar_title,
      state:state
    });

    return res.status(201).json({
      message: "Wooooo! CIty created successfully.",
      city: newCity,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Create a array of cities in one request => Admin
exports.createCities= catchAsyncErrors(async (req, res, next) => {
  try {
    const {cities} = req.body; //  req.body has an array of cities objects

    // Validation to ensure required fields are present for each state
    if (!Array.isArray(cities) || cities.length === 0) {
      return next(new ErrorHandler("Please provide an array of cities!", 400));
    }


    const newCities = await City.insertMany(cities.map(city => ({
      title: city.title,
      ar_title: city.ar_title,
      state:city.state
    })));

    return res.status(201).json({
      message: "Cities created successfully.",
      cities: newCities,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete a city by ID => Admin
exports.deleteCity = catchAsyncErrors(async (req, res,next) => {
  try {
    const { city_id } = req.params;

    // Call the findOneAndDelete 
    const city = await City.findOneAndDelete({ _id: city_id });

    if (!city) {
        return next(new ErrorHandler("City not found!", 404));
      }

    return res.status(200).json({ 
      success: true,
      message: "City deleted successfully." 
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update a city by ID => Admin
exports.updateCity = catchAsyncErrors(async (req, res,next) => {
  try {
    const { city_id } = req.params;
    const values = req.body;

    // Find the state by ID and update
    const updatedCity= await City.findByIdAndUpdate(
        city_id,
      values,
      { new: true, runValidators: true } // new: true to return the updated document
    );

    if (!updatedCity) {
      return next(new ErrorHandler("City Not Found",400));
    }

    return res.status(200).json({
      success: true,
      message: "City updated successfully.",
      updatedCity
    });
  } catch (error) {
    return next(new ErrorHandler(error.message,500));
  }
});

// Get all cities => Admin
exports.getCities= catchAsyncErrors(async (req, res,next) => {
  try {
    const { state_id } = req.params;

    // Fetch the cities 
    const cities = await City.find({state:state_id});

    if (!cities) {
      return next(new ErrorHandler("No Cities found!", 404));
    }


    res.status(200).json({
      success: true,
      cities,   // The cities data

    });
  } catch (error) {
    return next(new ErrorHandler(error.message,500));
  }
});


