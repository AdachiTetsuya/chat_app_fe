export type chapterQuizPullDownDataType = {
  id: string;
  level: number[];
  title: string;
};

export const chapterQuizPullDownData: chapterQuizPullDownDataType[] = [
  {
    id: '1',
    level: [1, 2, 3],
    title: 'すべて',
  },
  {
    id: '2',
    level: [1],
    title: '★',
  },
  {
    id: '3',
    level: [2],
    title: '★★',
  },
  {
    id: '4',
    level: [3],
    title: '★★★',
  },
];

export const quizScreenParamsDefault = {
  screenName: '',
  sectionId: 0,
  isContinue: false,
  isRandomPage: false,
  isBookmarkPage: false,
};

export const quizListOptionDefault = {
  quizLevelList: [1, 2, 3],
  chapterNumList: [1, 2, 3, 4],
  sort: 'quizNumberOrder',
  isGrid: true,
};

export const loginRequiredReturn = {
  status: 401,
  result: false,
  response: {
    data: { loginRequired: true },
  },
};

export const questionResultChoiceList = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const questionResultChoiceListBlack = ['❶', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾'];
