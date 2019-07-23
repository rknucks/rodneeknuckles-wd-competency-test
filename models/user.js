// Requiring bcrypt for password hashing. 
var bcrypt = require("bcryptjs");
//
// Creating our User model

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
      isEmail: true
      }
      },
      
  password: {
  type: DataTypes.TEXT,
  allowNull: false
  },
  
  }, {
  
  })
  
  
  //check if an unhashed password can be compared to the hashed password stored in database
  User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
  };
  
  // before a User is created, automatically hash their password
  
  User.beforeCreate(user => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  
  return User;
  };
  
  
