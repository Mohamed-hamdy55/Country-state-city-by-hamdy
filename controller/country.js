const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Country = require("../model/country");


// Create a new country => Admin
exports.createCountry= catchAsyncErrors(async (req, res,next) => {
  try {
    const { title, ar_title,isoCode,phoneCode,currency,latitude,longitude } = req.body;

    // Validation to ensure required fields are present
    if (!title || !ar_title  || !isoCode || !phoneCode || !currency || !latitude || !longitude) {
      return next(new ErrorHandler("Please provide all fields!", 400));
    }
    const eng_oldCountry = await Country.findOne({ title });
    const ar_oldCountry2 = await Country.findOne({ ar_title });
    if (eng_oldCountry || ar_oldCountry2) {
      if (eng_oldCountry)
        return next(new ErrorHandler("Country with english title already exist", 400));
      return next(new ErrorHandler("Country with arabic title already exist !", 400));
    }

   
    const newCountry = await Country.create({
      title:title,
      ar_title:ar_title,
      isoCode:isoCode,
      phoneCode:phoneCode,
      currency:currency,
      latitude:latitude,
      longitude:longitude
    });

    return res.status(201).json({
      message: "Wooooo! Country created successfully.",
      country: newCountry,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Create a array of countries in one request => Admin
exports.createCountries = catchAsyncErrors(async (req, res, next) => {
  try {
    const {countries} = req.body; //  req.body has an array of country objects

    // Validation to ensure required fields are present for each country
    if (!Array.isArray(countries) || countries.length === 0) {
      return next(new ErrorHandler("Please provide an array of countries!", 400));
    }

    const countryTitles = countries.map(country => country.title);
    const countryArTitles = countries.map(country => country.ar_title);

    const existingCountries = await Country.find({
      $or: [
        { title: { $in: countryTitles } },
        { ar_title: { $in: countryArTitles } }
      ]
    });

    if (existingCountries.length > 0) {
      const errors = existingCountries.map(country => {
        if (countryTitles.includes(country.title)) {
          return `Country with English title already exists: ${country.title}`;
        }
        if (countryArTitles.includes(country.ar_title)) {
          return `Country with Arabic title already exists: ${country.ar_title}`;
        }
        return null;
      }).filter(Boolean);
      return next(new ErrorHandler(errors.join(", "), 400));
    }

    const newCountries = await Country.insertMany(countries.map(country => ({
      title: country.title,
      ar_title: country.ar_title,
      isoCode: country.isoCode,
      phoneCode: country.phoneCode,
      currency: country.currency,
      latitude: country.latitude,
      longitude: country.longitude
    })));

    return res.status(201).json({
      message: "Countries created successfully.",
      countries: newCountries,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Delete a country by ID => Admin
exports.deleteCountry = catchAsyncErrors(async (req, res,next) => {
  try {
    const { country_id } = req.params;

    // Call the findOneAndDelete 
    const country = await Country.findOneAndDelete({ _id: country_id });

    if (!country) {
        return next(new ErrorHandler("Country not found!", 404));
      }

    return res.status(200).json({ 
      success: true,
      message: "Country deleted successfully." 
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Update a country by ID => Admin
exports.updateCountry = catchAsyncErrors(async (req, res,next) => {
  try {
    const { country_id } = req.params;
    const values = req.body;

    // Find the country by ID and update
    const updatedCountry= await Country.findByIdAndUpdate(
        country_id,
      values,
      { new: true, runValidators: true } // new: true to return the updated document
    );

    if (!updatedCountry) {
      return next(new ErrorHandler("Country Not Found",400));
    }

    return res.status(200).json({
      success: true,
      message: "Country updated successfully.",
      updatedCountry
    });
  } catch (error) {
    return next(new ErrorHandler(error.message,500));
  }
});

// Get all countries => Admin
exports.getCountries= catchAsyncErrors(async (req, res,next) => {
  try {
    
    // Fetch the countries
    const countries = await Country.find();

    if (!countries) {
      return next(new ErrorHandler("No countries found!", 404));
    }


    res.status(200).json({
      success: true,
      countries,   // The countries data

    });
  } catch (error) {
    return next(new ErrorHandler(error.message,500));
  }
});


