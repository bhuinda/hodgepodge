export type Word = {
  label: string,
  category: string,
  selected: boolean,
}

export type Category = {
  id: number,
  label: string,
  words: string[]
}

export type Board = {
  title: string;
  description: string;
  difficulty: string;
  author: string;
  categories: Category[];
  wordOrder: number[];
};

const defaultWordOrder = [12, 6, 3, 14, 5, 1, 0, 8, 10, 9, 7, 15, 11, 4, 2, 13];

export const Boards: { [id: number]: Board } = {
  1: {
    title: 'This is a trap!',
    description: 'A challenge for the bravest.',
    difficulty: 'Nightmare',
    author: 'bhuinda',
    categories: [
      {
        id: 1,
        label: 'FORMATS FOR MOVING IMAGES',
        words: ['AVI', 'DVD', 'FILM', 'GIF'],
      },
      {
        id: 2,
        label: 'ONOMATOPOEIC MUSIC GENRES',
        words: ['BEBOP', 'DJENT', 'POP', 'SNAP'],
      },
      {
        id: 3,
        label: 'ENERGY',
        words: ['ELAN', 'FIRE', 'VIM', 'ZIP'],
      },
      {
        id: 4,
        label: 'WORDS THAT REMAIN VALID WHEN THE FIRST LETTER SHIFTS TO END',
        words: ['EON', 'RANGE', 'SMACK', 'TRAP'],
      }
    ],
    wordOrder: defaultWordOrder,
  },
  2: {
    title: '',
    description: '',
    difficulty: '',
    author: '',
    categories: [
      {
        id: 1,
        label: '',
        words: [],
      },
      {
        id: 2,
        label: '',
        words: [],
      },
      {
        id: 3,
        label: '',
        words: [],
      },
      {
        id: 4,
        label: '',
        words: [],
      }
    ],
    wordOrder: defaultWordOrder,
  },
  3: {
    title: '',
    description: '',
    difficulty: '',
    author: '',
    categories: [
      {
        id: 1,
        label: '',
        words: [],
      },
      {
        id: 2,
        label: '',
        words: [],
      },
      {
        id: 3,
        label: '',
        words: [],
      },
      {
        id: 4,
        label: '',
        words: [],
      }
    ],
    wordOrder: defaultWordOrder,
  }
};

/*
  GENERIC BOARD FORMAT:
  #: {
    title: '',
    description: '',
    difficulty: '',
    author: '',
    categories: [
      {
        id: 1,
        label: '',
        words: [],
      },
      {
        id: 2,
        label: '',
        words: [],
      },
      {
        id: 3,
        label: '',
        words: [],
      },
      {
        id: 4,
        label: '',
        words: [],
      }
    ],
  }
*/
