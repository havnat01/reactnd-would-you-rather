import { saveQuestion } from '../utils/api';
import { addQuestionToUser } from '../actions/users';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION';
export const SAVE_QUESTION = 'SAVE_QUESTION';

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions
  };
}

export function addAnswerToQuestion(authUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_QUESTION,
    authUser,
    qid,
    answer
  };
}

function addQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question
  };
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
  return dispatch => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      question => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      }
    );
  };
}
