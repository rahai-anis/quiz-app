import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/question.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuizService {
  
  private questions: Question[] = [];
  private score = 0;
  

  constructor(private http: HttpClient) {}

loadQuestions() {
  let url = 'https://opentdb.com/api.php?amount=10&type=multiple&difficulty=medium';
  if (this.categoryId) {
    url += `&category=${this.categoryId}`;
  }

  return this.http.get<any>(url).pipe(
    map((res) =>
      res.results.map((q: any) => ({
        ...q,
        all_answers: this.shuffle([q.correct_answer, ...q.incorrect_answers])
      }))
    )
  );
}


  setQuestions(questions: Question[]) {
    this.questions = questions;
  }

  getQuestions(): Question[] {
    return this.questions;
  }

  addScore() {
    this.score++;
  }

  getScore() {
    return this.score;
  }

  reset() {
    this.questions = [];
    this.score = 0;
  }

  private shuffle(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }
  private categoryId: number | null = null;

setCategory(id: number) {
  this.categoryId = id;
}

}
