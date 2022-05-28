const User = require("../models/user-model");
const userData = require("./user-seeds.json");
const Location = require("../models/charger-model");
const locationData = require("./charger-seeds.json");

User.deleteMany({})
  .then(() => {
    return User.insertMany(userData);
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  });

Location.deleteMany({})
  .then(() => {
    return Location.insertMany(locationData);
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  });
