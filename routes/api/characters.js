const express = require("express");
const router = express.Router();

// Load Character Model
const Character = require("../../models/Character");

// Validation
const validateCharacter = require('../../validation/character');

// @route  GET api/character/test
// @desc   Test character route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Characters Works" }));

// @route  GET api/characters
// @desc   Get all characters
// @access Public
router.get("/", (req, res) => {
  Character.find()
    .sort({ date: -1 })
    .then(characters => res.json(characters))
    .catch(() =>
      res.status(404).json({ nocharactersfound: "No characters found" })
    );
});

// @route  POST api/characters
// @desc   Create characters
// @access Public
router.post("/", (req, res) => {
  const { errors, isValid } = validateCharacter(req.body);

  // Check Validation
  if (!isValid) {
      // If any error, send 400 with errors object
      return res.status(400).json(errors);    
  }

  const newCharacter = new Character({
    name: req.body.name,
    icon: req.body.icon,
    life: req.body.life * 50,
    defense: req.body.defense * 5,
    attack: req.body.attack * 5,
    speed: req.body.speed * 5,
    classType: req.body.classType
  });

  newCharacter
    .save()
    .then(character => res.json(character))
    .catch(err => res.status(400).json(err));
});

module.exports = router;