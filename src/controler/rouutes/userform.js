const { Router } = require("express");
const UserModel = require("../../model/Usermodel");
const multer = require("multer");
const path = require("path");
const homeRouter = Router();
const validator = require("validator");
let storage = multer.diskStorage({
  destination: "../../../uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Only jpeg,  jpg , png, and gif Image allow"));
    }
  },
});
homeRouter.get("/index", async (req, res) => {
  try {
    res.render("index");
  } catch (error) {
    res.send(error.message);
  }
});
homeRouter.post(
  "/register",
  upload.array("file_Documents"),
  async (req, res) => {
    try {
      const body = req.body;
      function getEducation() {
        let edu = [];
        if (typeof body.completed_degree !== "string") {
          for (let i = 0; i < body?.completed_degree?.length; i++) {
            let degrees = {};
            degrees.completed_degree = body.completed_degree[i];
            degrees.feild_of_study = body.feild_of_study[i];
            edu.push(degrees);
          }
          return edu;
        } else {
          let temp = {
            completed_degree: body.completed_degree,
            feild_of_study: body.feild_of_study,
          };
          edu.push(temp);
          return edu;
        }
      }
      function getExperience() {
        let experience = [];
        if (typeof body.company_name !== "string") {
          for (let i = 0; i < body?.company_name?.length; i++) {
            let temp = {};
            temp.company_name = body.company_name[i];
            temp.start_date = body.start_date[i];
            temp.end_date = body.end_date[i];
            temp.position = body.position[i];
            temp.salery = body.salery[i];
            temp.document = req.files[i].filename;
            experience.push(temp);
          }
          return experience;
        } else {
          let temp = {
            company_name: body.company_name,
            start_date: body.start_date,
            end_date: body.end_date,
            position: body.position,
            salery: body.salery,
            document: req.files[0].filename,
          };
          experience.push(temp);
          return experience;
        }
      }
      const payload = {
        first_name: body.first_name,
        middle_name: body.middle_name,
        last_name: body.last_name,
        gender: body.gender,
        date_of_birth: body.date_of_birth,
        city_of_birth: body.city_of_birth,
        country_of_birth: body.country_of_birth,
        maritial_status: body.maritalstatus,
        father_name: body.father_name,
        mother_name: body.mother_name,
        number_of_kids: body.number_of_kids,
        phone_number: body.phone_number,
        whatsApp_number: body.whatsApp_number,
        emergency_contact: body.emergency_contact,
        email: body.email,
        city: body.city,
        street: body.street,
        zip: body.zip,
        country: body.country,
        professional_experience: getExperience(),
        education: getEducation(),
      };
      const abc = await UserModel.create(payload);
      res.redirect("/index");
    } catch (error) {
      const body = req.body;
      function getEducation() {
        let edu = [];
        if (typeof body.completed_degree !== "string") {
          for (let i = 0; i < body?.completed_degree?.length; i++) {
            let degrees = {};
            degrees.completed_degree = body.completed_degree[i];
            degrees.feild_of_study = body.feild_of_study[i];
            edu.push(degrees);
          }
          return edu;
        } else {
          let temp = {
            completed_degree: body.completed_degree,
            feild_of_study: body.feild_of_study,
          };
          edu.push(temp);
          return edu;
        }
      }
      function getExperience() {
        let experience = [];
        if (typeof body.company_name !== "string") {
          for (let i = 0; i < body?.company_name?.length; i++) {
            let temp = {};
            temp.company_name = body.company_name[i];
            temp.start_date = body.start_date[i];
            temp.end_date = body.end_date[i];
            temp.position = body.position[i];
            temp.salery = body.salery[i];
            temp.document = req.files[i].filename;
            experience.push(temp);
          }
          return experience;
        } else {
          let temp = {
            company_name: body.company_name,
            start_date: body.start_date,
            end_date: body.end_date,
            position: body.position,
            salery: body.salery,
            document: req.files[0].filename,
          };
          experience.push(temp);
          return experience;
        }
      }
      const payload = {
        first_name: body.first_name,
        middle_name: body.middle_name,
        last_name: body.last_name,
        gender: body.gender,
        date_of_birth: body.date_of_birth,
        city_of_birth: body.city_of_birth,
        country_of_birth: body.country_of_birth,
        maritial_status: body.maritalstatus,
        father_name: body.father_name,
        mother_name: body.mother_name,
        number_of_kids: body.number_of_kids,
        phone_number: body.phone_number,
        whatsApp_number: body.whatsApp_number,
        emergency_contact: body.emergency_contact,
        email: body.email,
        city: body.city,
        street: body.street,
        zip: body.zip,
        country: body.country,
        professional_experience: getExperience(),
        education: getEducation(),
      };
      console.log({ err: error.errors });

      // res.send({ err: error.errors, body: payload });

      res.render("register", { err: error.errors, body: payload });
    }
  }
);
homeRouter.get("/register", async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    res.send(error.message);
  }
});
// homeRouter.get("/register1", async (req, res) => {
//   try {
//     res.render("register1");
//   } catch (error) {
//     res.send({ err: error.message });
//     // res.render("register1", { err: error.errors });
//   }
// });

homeRouter.get("/getuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.find({ _id: id });
    res.render("getuser", { user: user[0] });
  } catch (error) {
    res.send(error.message);
  }
});
homeRouter.get("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndDelete({ _id: id });
    res.redirect("/index");
  } catch (error) {
    res.send(error.message);
  }
});

homeRouter.get("/searchemp", async (req, res) => {
  try {
    const searchBy = req.query.q;

    // console.log("homeRouter.get  searchBy", searchBy);
    const query = req.query.value.trim();

    // console.log("homeRouter.get  query", query);

    if (query == "") {
      let user = await UserModel.find();
      res.send(user);
    } else {
      if (searchBy === "name") {
        let user = await UserModel.find({
          $or: [
            { first_name: { $regex: query } },
            { last_name: { $regex: query } },
          ],
        });
        res.send(user);
        // res.render();
      } else if (searchBy === "gender") {
        let user = await UserModel.find({
          $or: [{ gender: { $regex: query } }],
        });
        res.send(user);
        // res.render("index", { emps: user });
      } else if (searchBy === "cityofbirth") {
        let user = await UserModel.find({
          $or: [{ city_of_birth: { $regex: query } }],
        });
        res.send(user);
        // res.render("index", { emps: user });
      } else if (searchBy === "countryofbirth") {
        let user = await UserModel.find({
          $or: [{ country_of_birth: { $regex: query } }],
        });
        res.send(user);
        // res.render("index", { emps: user });
      } else if (searchBy === "city") {
        let user = await UserModel.find({
          $or: [{ city: { $regex: query } }],
        });
        // console.log(user);
        res.send(user);
        // res.render("index", { emps: user });
      } else if (searchBy === "country") {
        let user = await UserModel.find({
          $or: [{ country: { $regex: query } }],
        });
        res.send(user);
        // res.render("index", { emps: user });
      } else if (searchBy === "drgree") {
        let user = await UserModel.find({
          education: { $elemMatch: { completed_degree: { $regex: query } } },
        });
        res.send(user);
        // res.render("index", { emps: user });
      } else if (searchBy === "studyfeild") {
        let user = await UserModel.find({
          education: { $elemMatch: { feild_of_study: { $regex: query } } },
        });
        res.send(user);
        // res.render("index", { emps: user });
        // res.render("index", { emps: user });
      }
    }
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = homeRouter;
