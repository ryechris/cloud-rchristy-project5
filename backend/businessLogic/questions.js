import { QAccess } from '../dataLayer/questions';

const qAccess = new QAccess(process.env.QUESTIONS_TABLE);

export async function getQuestionList() {
  return qAccess.getQuestionList()
};

export async function addAnswer(a) {
  return qAccess.addAnswer(a)
};

export async function addQuestion(q) {
  return await qAccess.addQuestion(q)
};
