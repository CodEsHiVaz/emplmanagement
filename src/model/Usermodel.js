const mongoose = require("mongoose");
const validator = require("validator");

const eduSchema = new mongoose.Schema({
  completed_degree: {
    type: String,
    required: [true, "degree name is required"],
  },
  feild_of_study: {
    type: String,
    required: [true, "feild name is required"],
  },
});
const professionalSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: [true, "company name is required"],
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  position: {
    type: String,
    // required: [true, "possition is required"],
  },
  salery: {
    type: Number,
    required: true,
  },
  document: {
    type: String,
    required: [true, "file is required"],
  },
});

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "first name is required"],
    validate(value) {
      if (!validator.isAlpha(value, ["en-IN"])) {
        throw new Error("input must be alphabates only");
      }
      if (!validator.isLength(value, { min: 3, max: 50 })) {
        throw new Error("input length must be 3-50 characters only");
      }
    },
  },

  middle_name: {
    type: String,
    required: [true, "middle name is required"],
    validate(value) {
      if (!validator.isAlpha(value, ["en-IN"])) {
        throw new Error("input must be alphabates only");
      }
      if (!validator.isLength(value, { min: 3, max: 50 })) {
        throw new Error("input length must be 3-50 characters only");
      }
    },
  },
  last_name: {
    type: String,
    required: [true, "last name is required"],
    validate(value) {
      if (!validator.isAlpha(value, ["en-IN"])) {
        throw new Error("input must be alphabates only");
      }
      if (!validator.isLength(value, { min: 3, max: 50 })) {
        throw new Error("input length must be 3-50 characters only");
      }
    },
  },
  date_of_birth: {
    type: Date,
    required: [true, "DOB is required"],
  },
  city_of_birth: {
    type: String,
    required: [true, "Date of birth  is required"],
  },
  gender: {
    type: String,
    required: [true, "gender must be provided"],
    enum: ["male", "female"],
  },
  country_of_birth: {
    type: String,
    required: [true, "country of birth is required"],
  },
  father_name: {
    type: String,
    required: [true, "father name is required"],
    validate(value) {
      if (!validator.isAlpha(value, ["en-IN"])) {
        throw new Error("input must be alphabates only");
      }
      if (!validator.isLength(value, { min: 3, max: 50 })) {
        throw new Error("input length must be 3-50 characters only");
      }
    },
  },
  mother_name: {
    type: String,
    required: [true, "mother name is required"],
    validate(value) {
      if (!validator.isAlpha(value, ["en-IN"])) {
        throw new Error("input must be alphabates only");
      }
      if (!validator.isLength(value, { min: 3, max: 50 })) {
        throw new Error("input length must be 3-50 characters only");
      }
    },
  },
  number_of_kids: {
    type: Number,
    max: [10, "kids must be less than 10"],
  },
  phone_number: {
    type: Number,
    required: [true, "Phone number  is required"],
    validate(value) {
      if (!validator.isMobilePhone(value.toString(), ["en-IN"])) {
        throw new Error("phone number is not valid");
      }
    },
  },
  whatsApp_number: {
    type: Number,
    required: [true, "whatsApp number is required"],
    validate(value) {
      if (!validator.isMobilePhone(value.toString(), ["en-IN"])) {
        throw new Error("phone number is not valid");
      }
    },
  },
  emergency_contact: {
    type: Number,
    required: [true, "emergency contact number  is required"],
    validate(value) {
      if (!validator.isMobilePhone(value.toString(), ["en-IN"])) {
        throw new Error("phone number is not valid");
      }
    },
  },
  email: {
    type: String,
    required: [true, "email  is required"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email id");
      }
    },
  },
  maritial_status: {
    type: String,
    required: [true, "maritial status  is required"],
  },

  city: {
    type: String,
    required: [true, "City name is required"],
  },
  street: {
    type: String,
    required: [true, "street name is required"],
  },
  zip: {
    type: Number,
    required: [true, "zip code is required"],
  },
  country: {
    type: String,
    required: [true, "Country name is required"],
  },

  professional_experience: {
    type: [professionalSchema],
  },
  education: [eduSchema],
});
const UserModel = mongoose.model("employee", userSchema);
module.exports = UserModel;
