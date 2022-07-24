import { getInitData } from '../utils/api';
import { getQuestions } from '../actions/questions';
import { getUsers } from '../actions/users';

export function handleInitialData() {
  return dispatch => {
    return getInitData().then(({ users, questions }) => {
      dispatch(getQuestions(questions));
      dispatch(getUsers(users));
    });
  };
}
