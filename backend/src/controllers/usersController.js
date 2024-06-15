const mongoose = require('mongoose');
const User = require('../models/User');
const CustomError = require('../lib/customError');
const generateToken = require('../utils/jwtUtils');
const { revokeToken } = require('../utils/revokedTokens');

exports.createUser = async ({
  fullName, email, password,
}) => {
  try {
    const user = await User.create({
      fullName, email, password,
    });
    return user;
  } catch (error) {
    throw new CustomError(`Failed to create user: ${error.message}`, 500);
  }
};

exports.loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw new CustomError('UN_Authenticated', 401);
    }
    const valid = user.verifyPassword(password);
    if (!valid) {
      throw new CustomError('UN_Authenticated', 401);
    }
    const token = generateToken(user);
    return token;
  } catch (error) {
    throw new CustomError(`Failed to login user: ${error.message}`, error.status || 500);
  }
};

exports.logoutUser = async ({ token }) => {
  try {
    await revokeToken(token);
    return true;
  } catch (error) {
    throw new CustomError(`Failed to logout user: ${error.message}`, error.status || 500);
  }
};

exports.deleteUser = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError('Invalid id format', 400);
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }
  } catch (error) {
    throw new CustomError(`Failed to delete user: ${error.message}`, error.status || 500);
  }
};

exports.updateUser = async (id, {
  fullName, email, password,
}) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError('Invalid id format', 400);
    }
    const user = await User.findByIdAndUpdate(
      id,
      {
        fullName, email, password,
      },
      { new: true },
    );
    if (!user) {
      throw new CustomError('User not found', 404);
    }
    return user;
  } catch (error) {
    throw new CustomError(`Failed to update user: ${error.message}`, error.status || 500);
  }
};
