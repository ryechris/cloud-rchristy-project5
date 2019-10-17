import { UserAccess } from '../dataLayer/users';

const userAccess = new UserAccess(process.env.USERS_TABLE);

export async function getUserList() {
  // try return await it this doesn't work
  return userAccess.getUserList()
};

export async function addQuestion(q) {
  return userAccess.addQuestion(q)
};

export async function addAnswer(a) {
  return userAccess.addAnswer(a)
};

export async function addUser(user) {
  return await userAccess.addUser(user)
};
