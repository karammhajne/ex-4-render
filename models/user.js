import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const User = sequelize.define('User', {
  userName: {  // Adjusted column name to match table schema
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  userPassword: {  // Adjusted column name to match table schema
    type: DataTypes.STRING,
    allowNull: false
  },
  userAccessCode: {  // Added column for user access code
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'tbl_35_user',  // Specify the custom table name here
  timestamps: false  // Disable automatic timestamp columns
});

User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.userPassword);
};

User.prototype.getSignedJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export default User;

