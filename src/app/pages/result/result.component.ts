import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../core/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  score = 0;
  total = 0;

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    const questions = this.quizService.getQuestions();
    if (questions.length === 0) {
      // si on accède à /result directement sans jouer
      this.router.navigate(['/']);
      return;
    }

    this.score = this.quizService.getScore();
    this.total = questions.length;
  }

  restart() {
    this.quizService.reset();
    this.router.navigate(['/']);
  }
}
