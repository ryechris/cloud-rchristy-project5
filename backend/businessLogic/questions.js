import { QAccess } from '../dataLayer/questions';

const qAccess = new QAccess(process.env.QUESTIONS_TABLE);

export async function getQuestionList() {
  // try return await it this doesn't work
  return qAccess.getQuestionList()
};

export async function addAnswer(a) {
  return qAccess.addAnswer(a)
};

export async function addQuestion(q) {
  return qAccess.addQuestion(q)
};
