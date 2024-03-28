import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Word, Category, Board, Boards } from './connections.config';

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

  @Input() gameId: number;
  gameOver: boolean = false;

  submissionSelection: Word[] = [];
  submissionHistory: Word[][] = [];
  submissionMistakesLeft: number = 4;

  error: string = '';
  errorTimeout: any = null;
  errorTimeoutLength: number = 3000;
  errorIsEnabled: boolean = false;

  board: Board;
  words: Word[] = [];
  categories: Category[] = [];

  initBoard(): void {
    this.board = Boards[this.gameId];
    this.words = this.board.categories.flatMap(category =>
      category.words.map(word => ({
        label: word,
        category: category.label,
        selected: false,
      }))
    );

    this.orderWords();
  }

  orderWords(): void {
    const wordOrder = this.board.wordOrder;
    this.words = wordOrder.map(index => this.words[index]);
  }

  select(word: Word): void {
    // If word is already selected, deselect it and remove it from the selection
    if (word.selected) {
      word.selected = false;
      this.submissionSelection = this.submissionSelection.filter(w => w != word);
    }

    // If selection isn't full, add word to selection; else, do nothing
    else if (this.submissionSelection.length < 4) {
      word.selected = true;
      this.submissionSelection.push(word);
    }
  }

  shuffle(): void {
    for (let i = this.words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
    }
  }

  deselectAll(): void {
    this.submissionSelection.forEach(word => word.selected = false);
    this.submissionSelection = [];
  }

  submit(): void {
    if (this.submissionSelection.length < 4) return;

    // Check if the submitted selection matches any of the previous submissions
    for (const submission of this.submissionHistory) {
      if (this.submissionSelection.every((value, index) => value == submission[index])) {
        this.errorPopup("You've already submitted this selection...");
        return;
      }
    }

    // Push submitted selection to submission history
    this.submissionHistory.push([...this.submissionSelection]);

    // Establish category to compare against
    const category = this.submissionSelection[0].category;

    let correctCount = 0;
    for (const word of this.submissionSelection) if (word.category == category) correctCount++;

    if (correctCount < 4) {
      this.submissionMistakesLeft--;

      if (this.submissionMistakesLeft == 0) this.gameOver = true;
      else if (correctCount == 3) this.errorPopup("One word away...");

      return;
    }

    // Reveal category
    const revealedCategory = this.board.categories.find(c => c.label == category);
    this.categories.push(revealedCategory);

    // Hide selected words
    this.words = this.words.filter(word => !word.selected);

    // Reset selection
    this.submissionSelection = [];
  }

  errorPopup(error: string): void {
    this.error = error;

    if (this.errorIsEnabled) clearTimeout(this.errorTimeout);
    else this.errorIsEnabled = true;

    this.errorTimeout = setTimeout(() => {
      this.errorIsEnabled = false;
      this.error = '';
    }, this.errorTimeoutLength);
  }

  ngOnInit(): void {
    this.initBoard();
  }
}
