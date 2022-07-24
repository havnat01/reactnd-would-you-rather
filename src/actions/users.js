import { saveQuestionAnswer } from '../utils/api';
import { addAnswerToQuestion } from '../actions/questions';

export const GET_USERS = 'GET_USERS';
export const SAVE_ANSWER_TO_USER = 'SAVE_ANSWER_TO_USER';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

export function getUsers(users) {
  return {
    type: GET_USERS,
    users
  };
}

function saveAnswerToUser(authUser, qid, answer) {
  return {
    type: SAVE_ANSWER_TO_USER,
    authUser,
    qid,
    answer
  };
}

export function handleSaveQuestionAnswer(authUser, qid, answer) {
  return dispatch => {
    dispatch(saveAnswerToUser(authUser, qid, answer));
    dispatch(addAnswerToQuestion(authUser, qid, answer));

    return saveQuestionAnswer(authUser, qid, answer).catch(e => {
      console.warn('Error in handleSaveQuestionAnswer:', e);
    });
  };
}

export function addQuestionToUser({ id, author }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    id,
    author
  };
}
