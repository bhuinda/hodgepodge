import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Word, Category, Connections } from './connections.config';

@Component({
  selector: 'connections',
  standalone: true,
  imports: [NgClass],
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.scss'
})
export class ConnectionsComponent implements OnInit {
  /* TO-DO:
     - refactor Connections boards into JSONs
     - add localStorage support
     - reactive styling
  */
  selection: Word[] = [];
  submissionHistory: Word[][] = [];
  submissionMistakesLeft: number = 4;

  error: string = '';
  errorTimeout: any = null;
  showError: boolean = false;

  gameOver: boolean = false;
  game: typeof Connections[1];

  words: Word[] = [];
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

    // Check if the submitted selection matches any of the previous submissions
    for (const submission of this.submissionHistory) {
      if (this.selection.every((value, index) => value == submission[index])) {
        this.errorPopup("You've already submitted this selection...");
        return;
      }
    }

    // Push submitted selection to submission history
    this.submissionHistory.push([...this.selection]);

    // Establish category to compare against
    const category = this.selection[0].category;

    let correctCount = 0;
    for (const word of this.selection) if (word.category == category) correctCount++;

    if (correctCount < 4) {
      this.submissionMistakesLeft--;

      if (this.submissionMistakesLeft == 0) this.gameOver = true;
      else if (correctCount == 3) this.errorPopup("One word away...");

      return;
    }

    // Reveal category
    const revealedCategory = this.game.categories.find(c => c.label == category);
    this.categories.push(revealedCategory);

    // Hide selected words
    this.words = this.words.filter(word => !word.selected);

    // Reset selection
    this.selection = [];
  }

  errorPopup(error: string): void {
    this.error = error;

    if (this.showError) clearTimeout(this.errorTimeout);
    else this.showError = true;

    this.errorTimeout = setTimeout(() => {
      this.showError = false;
      this.error = '';
    }, 3000);
  }

  ngOnInit(): void {
    this.initBoard();
  }
}
