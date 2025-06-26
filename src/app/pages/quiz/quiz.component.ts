import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../core/quiz.service';
import { Question } from '../../models/question.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex = 0;
  currentQuestion!: Question;
  selectedAnswer: string | null = null;
  showNextButton = false;

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    const existing = this.quizService.getQuestions();
    if (existing.length > 0) {
      this.questions = existing;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    } else {
      this.quizService.loadQuestions().subscribe((qs) => {
        this.quizService.setQuestions(qs);
        this.questions = qs;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      });
    }
  }

  selectAnswer(answer: string) {
    if (this.selectedAnswer) return; // empêche double clic

    this.selectedAnswer = answer;
    this.showNextButton = true;

    if (answer === this.currentQuestion.correct_answer) {
      this.quizService.addScore();
    }
  }

  isCorrect(answer: string): boolean {
    return answer === this.currentQuestion.correct_answer;
  }

  isWrong(answer: string): boolean {
    return this.selectedAnswer === answer && answer !== this.currentQuestion.correct_answer;
  }

  nextQuestion() {
    this.selectedAnswer = null;
    this.showNextButton = false;
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.router.navigate(['/result']);
    } else {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }
}
