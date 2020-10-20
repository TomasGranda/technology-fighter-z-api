const Validator = require("validator");
const settings = require("../config/settings.json");
const icons = require("../config/icons.json");
const classes = require("../config/classes.json");

const validateCharacter = data => {
  let errors = {};
  const stats = {
    life: Number(data.life),
    defense: Number(data.defense),
    attack: Number(data.attack),
    speed: Number(data.speed)
  };
  const maxIndivualStat = settings.maxPoints - Object.keys(stats).length + 1;
  let statsErrors = [];
  let totalPoints = 0;
  let isValid;

  if (!data.classType) data.classType = "";
  if (!data.name)  data.name = "";
  if (!data.icon)  data.icon = "";

  // name
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  } else if (!Validator.isLength(data.name, { min: 1, max: 20 })){
    errors.name = "Name must be between 1 and 20 characters";
  }

  // classType
  if (Validator.isEmpty(data.classType)) {
    errors.classType = "Class field is required";
  } else {
    isValid = false;

    for (let i = 0; i < classes.length; i++) {
      if (data.classType === classes[i].name) {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      errors.classType = "Class must be valid";
    }    
  }

  // icon
  if (Validator.isEmpty(data.icon)) {
    errors.icon = "Icon field is required";
  } else {
    isValid = false;

    for (let i = 0; i < icons.length; i++) {
      if (data.icon === icons[i].icon) {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      errors.icon = "Icons must be valid";
    }
  }

  // stats
  for (const key in stats) {
    if (stats[key] === 0 || isNaN(stats[key])) {
      statsErrors.push(`${key} field is required`);
      continue;
    }

    if (!(1 <= stats[key] && stats[key] <= maxIndivualStat)) {
      statsErrors.push(
        `${key} field must be a int number between 1 and ${maxIndivualStat}`
      );
    } else {
      totalPoints += stats[key];
    }
  }

  if (statsErrors.length > 0) errors.statsErrors = statsErrors;

  if (totalPoints !== settings.maxPoints) {
    errors.totalPoints = `Total point must be ${settings.maxPoints}`;
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

module.exports = validateCharacter;
