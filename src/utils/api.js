import { getUsers, getQuestions, onSaveQuestion, onSaveAnswer } from './data';

export function getInitData() {
  return Promise.all([getUsers(), getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions
    })
  );
}

export function saveQuestion(question) {
  return onSaveQuestion(question);
}

export function saveQuestionAnswer(authUser, qid, answer) {
  return onSaveAnswer({ authUser, qid, answer });
}
