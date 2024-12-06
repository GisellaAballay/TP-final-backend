import bcrypt from "bcryptjs";

const users = [];

export const findUserByUsername = (username) => {
  return users.find((user) => user.username === username);
};

export const findUserById = (id) => {
  return users.find((user) => user.id === id);
};

export const createUser = async ({ id, username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10); 

  const newUser = { id, username, password: hashedPassword };
  users.push(newUser);
  return newUser;
};

export default users;
