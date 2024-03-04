import { Component, OnInit } from '@angular/core';

type Word = {
  label: string,
  category: string,
  selected: boolean,
  hidden: boolean
}

@Component({
  selector: 'app-connections',
  standalone: true,
  imports: [],
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.scss'
})
export class ConnectionsComponent implements OnInit {
  selection: Word[] = []
  words: Word[] = []

  categories = [
    {
      label: 'FORMATS FOR MOVING IMAGES',
      words: ['AVI', 'DVD', 'FILM', 'GIF'],
      revealed: false
    },
    {
      label: 'ONOMATOPOEIC MUSIC GENRES',
      words: ['BEBOP', 'DJENT', 'POP', 'SNAP'],
      revealed: false
    },
    {
      label: 'ENERGY',
      words: ['ELAN', 'FIRE', 'VIM', 'ZIP'],
      revealed: false
    },
    {
      label: 'WORDS THAT REMAIN VALID WHEN THE FIRST LETTER SHIFTS TO END',
      words: ['EON', 'RANGE', 'SMACK', 'TRAP'],
      revealed: false
    }
  ]

  checkSelection(): void {
    // Establish category to compare against
    const category = this.selection[0].category

    if (this.selection.every(w => w.category == category)) {
      // Reveal category
      const selectedCategory = this.categories.find(c => c.label == category);
      selectedCategory.revealed = true;

      // Hide selected words
      this.selection.forEach(word => {
        word.selected = false,
        word.hidden = true
      });

      // Reset selection
      this.selection = []
    }
  }

  initBoard(): void {
    this.words = this.categories.flatMap(category =>
      category.words.map(word => ({
        label: word,
        category: category.label,
        selected: false,
        hidden: false
      }))
    );

    // Fisher-Yates shuffle
    for (let i = this.words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
    }
  }

  select(word: Word): void {
    // If word is already selected, deselect it and remove it from the selection
    if (word.selected) {
      word.selected = false;
      this.selection = this.selection.filter(w => w !== word);
    } else if (this.selection.length < 4) {
      // If selection isn't full, add word to selection; else, do nothing
      word.selected = true;
      this.selection.push(word);
    }
  }

  ngOnInit(): void {
    this.initBoard()
  }
}
