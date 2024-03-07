import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

type Word = {
  label: string,
  category: string,
  selected: boolean,
}

type Category = {
  id: number,
  label: string,
  words: string[]
}

@Component({
  selector: 'app-connections',
  standalone: true,
  imports: [NgClass],
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.scss'
})
export class ConnectionsComponent implements OnInit {
  /* TO-DO:
     - dynamically import categories
     - add localStorage support
     - reactive styling
  */
  selection: Word[] = []
  words: Word[] = []
  game: { categories: Category[] } = {
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
    ]
  }

  categories: Category[] = [];


  initBoard(): void {
    this.words = this.game.categories.flatMap(category =>
      category.words.map(word => ({
        label: word,
        category: category.label,
        selected: false,
      }))
    );
  }

  select(word: Word): void {
    // If word is already selected, deselect it and remove it from the selection
    if (word.selected) {
      word.selected = false;
      this.selection = this.selection.filter(w => w != word);
    }

    // If selection isn't full, add word to selection; else, do nothing
    else if (this.selection.length < 4) {
      word.selected = true;
      this.selection.push(word);
    }
  }

  shuffle(): void {
    for (let i = this.words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
    }
  }

  deselectAll(): void {
    this.selection.forEach(word => word.selected = false);
    this.selection = [];
  }

  submit(): void {
    if (this.selection.length < 4) return;

    // Establish category to compare against
    const category = this.selection[0].category

    let correctCount = 0;
    for (const word of this.selection) {
      if (word.category == category) {
        correctCount++;
      }
    }

    if (correctCount == 3) {
      // Reveal "only one away..."
    }

    else if (correctCount == 4) {
      // Reveal category
      const revealedCategory = this.game.categories.find(c => c.label == category);
      this.categories.push(revealedCategory);

      // Hide selected words
      this.words = this.words.filter(word => !word.selected);

      // Reset selection
      this.selection = []
    }
  }

  ngOnInit(): void {
    this.initBoard();
  }
}
