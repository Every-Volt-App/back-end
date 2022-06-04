const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/user-model");
const Profile = require("../models/profile-model");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "EveryVolt",
      sub: userID,
    },
    "EveryVolt",
    { expiresIn: "6h" }
  );
};

router.post("/user/signup", (req, res) => {
  const { username, password, role } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    if (user)
      res.status(400).json({
        message: { msgBody: "Username is already taken", msgError: true },
      });
    else {
      const newUser = new User({ username, password, role });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else
          res.status(201).json({
            message: {
              msgBody: "Account successfully created",
              msgError: false,
            },
          });
      });
    }
  });
});

router.post(
  "/user/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

router.get(
  "/user/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

// GET user profile
router.get(
  "/user/profile/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("profile")
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else {
          res
            .status(200)
            .json({ profile: document.profile, authenticated: true });
        }
      });
  }
);

//CREATE user profile
router.post(
  "/user/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profile = new Profile(req.body);
    req.user.profile = profile;
    profile.save((err) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        req.user.save((err) => {
          if (err) {
            res.status(500).json({
              message: { msgBody: "Error has occured", msgError: true },
            });
          } else {
            res.status(200).json({
              message: {
                msgBody: "Successfully created profile",
                msgError: false,
              },
            });
          }
        });
      }
    });
  }
);

//UPDATE user profile
router.put(
  "/user/profile/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findByIdAndUpdate(
      req.params.id,
      {
        profileImage: req.body.profileImage,
        primaryCar: {
          make: req.body.primaryCar.make,
          model: req.body.primaryCar.model,
          connectionType: req.body.primaryCar.connectionType,
        },
        primaryAddress: {
          addressLine1: req.body.primaryAddress.addressLine1,
          addressLine2: req.body.primaryAddress.addressLine2,
          city: req.body.primaryAddress.city,
          state: req.body.primaryAddress.state,
          zipcode: req.body.primaryAddress.zipcode,
        },
      },
      { new: true }
    ).exec((err) => {
      if (err)
        res.status(500).json({
          message: { msgBody: "Error has occured", msgError: true },
        });
      else {
        res.status(200).json({
          message: {
            msgBody: "Successfully updated profile",
            msgError: false,
          },
        });
      }
    });
  }
);

//DELETE user profile
router.delete(
  "/user/profile/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findByIdAndRemove(req.params.id).exec((err) => {
      if (err)
        res.status(500).json({
          message: { msgBody: "Error has occured", msgError: true },
        });
      else {
        res.status(200).json({
          message: {
            msgBody: "Successfully deleted profile",
            msgError: false,
          },
        });
      }
    });
  }
);

router.get(
  "user/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      res
        .status(200)
        .json({ message: { msgBody: "You are an admin", msgError: false } });
    } else
      res.status(403).json({
        message: { msgBody: "You're not an admin, go away", msgError: true },
      });
  }
);

router.get(
  "/user/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
);

module.exports = router;
