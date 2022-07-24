let users = {
  amelia: {
    id: 'amelia',
    name: 'Amelia',
    avatarURL: '/images/avatars/amelia.png',
    answers: {
      xl8sn99cspryps6tt9l9lf: 'optionOne',
      bgnihnv508yduub3ooauh: 'optionTwo'
    },
    questions: ['n1ovuenloik5r7n5ujflzw', 'xl8sn99cspryps6tt9l9lf']
  },
  freya: {
    id: 'freya',
    name: 'Freya',
    avatarURL: '/images/avatars/freya.png',
    answers: {},
    questions: []
  },
  harry: {
    id: 'harry',
    name: 'Harry',
    avatarURL: '/images/avatars/harry.png',
    answers: {},
    questions: []
  },
  jack: {
    id: 'jack',
    name: 'Jack',
    avatarURL: '/images/avatars/jack.png',
    answers: {},
    questions: []
  },
  lilly: {
    id: 'lilly',
    name: 'Lilly',
    avatarURL: '/images/avatars/lilly.png',
    answers: {},
    questions: []
  },
  mia: {
    id: 'mia',
    name: 'Mia',
    avatarURL: '/images/avatars/mia.png',
    answers: {},
    questions: []
  },
  noah: {
    id: 'noah',
    name: 'Noah',
    avatarURL: '/images/avatars/noah.png',
    answers: {
      '82chaucrvh5tu64gnyq33': 'optionOne',
      '1y168v1imegug999s457y8': 'optionTwo',
      k2b50vvuq3rvjepba7eaji: 'optionTwo',
      n1ovuenloik5r7n5ujflzw: 'optionTwo'
    },
    questions: ['82chaucrvh5tu64gnyq33', 'k2b50vvuq3rvjepba7eaji']
  },
  oliver: {
    id: 'oliver',
    name: 'Oliver',
    avatarURL: '/images/avatars/oliver.png',
    answers: {
      bgnihnv508yduub3ooauh: 'optionOne',
      xl8sn99cspryps6tt9l9lf: 'optionTwo',
      '1y168v1imegug999s457y8': 'optionTwo'
    },
    questions: ['1y168v1imegug999s457y8', 'bgnihnv508yduub3ooauh']
  }
};

let questions = {
  '82chaucrvh5tu64gnyq33': {
    id: '82chaucrvh5tu64gnyq33',
    author: 'noah',
    timestamp: 1658646564,
    optionOne: {
      votes: ['noah'],
      text: 'be a little late'
    },
    optionTwo: {
      votes: [],
      text: 'way too early'
    }
  },
  '1y168v1imegug999s457y8': {
    id: '1y168v1imegug999s457y8',
    author: 'oliver',
    timestamp: 1658144564,
    optionOne: {
      votes: [],
      text: 'win the lottery'
    },
    optionTwo: {
      votes: ['oliver', 'noah'],
      text: 'live twice as long'
    }
  },
  k2b50vvuq3rvjepba7eaji: {
    id: 'k2b50vvuq3rvjepba7eaji',
    author: 'noah',
    timestamp: 1658244564,
    optionOne: {
      votes: [],
      text: 'be Batman'
    },
    optionTwo: {
      votes: ['noah'],
      text: 'Spiderman'
    }
  },
  n1ovuenloik5r7n5ujflzw: {
    id: 'n1ovuenloik5r7n5ujflzw',
    author: 'amelia',
    timestamp: 1658232456,
    optionOne: {
      votes: [],
      text: 'read an awesome book'
    },
    optionTwo: {
      votes: ['noah'],
      text: 'watch a good movie'
    }
  },
  xl8sn99cspryps6tt9l9lf: {
    id: 'xl8sn99cspryps6tt9l9lf',
    author: 'amelia',
    timestamp: 1658511123,
    optionOne: {
      votes: ['amelia'],
      text: 'lose your keys'
    },
    optionTwo: {
      votes: ['oliver'],
      text: 'your cell phone'
    }
  },
  bgnihnv508yduub3ooauh: {
    id: 'bgnihnv508yduub3ooauh',
    author: 'oliver',
    timestamp: 1658880144,
    optionOne: {
      votes: ['oliver'],
      text: 'date someone you met online'
    },
    optionTwo: {
      votes: ['amelia'],
      text: 'go on a blind date'
    }
  }
};

function generateUID() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export function getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

export function getQuestions() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...questions }), 1000);
  });
}

function formatQuestion({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText
    },
    optionTwo: {
      votes: [],
      text: optionTwoText
    }
  };
}

export function onSaveQuestion(question) {
  return new Promise((res, rej) => {
    const authUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      };

      users = {
        ...users,
        [authUser]: {
          ...users[authUser],
          questions: users[authUser].questions.concat([formattedQuestion.id])
        }
      };

      res(formattedQuestion);
    }, 1000);
  });
}

export function onSaveAnswer({ authUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authUser]: {
          ...users[authUser],
          answers: {
            ...users[authUser].answers,
            [qid]: answer
          }
        }
      };

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authUser])
          }
        }
      };

      res();
    }, 500);
  });
}
