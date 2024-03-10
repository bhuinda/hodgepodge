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

export const Connections = {
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
