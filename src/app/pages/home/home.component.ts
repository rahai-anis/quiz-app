import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../core/quiz.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories = [
    { name: 'Sport', id: 21 },
    { name: 'Politics', id: 24 },
    { name: 'Science: Computers', id: 18 },
    { name: 'General Knowledge', id: 9 }
  ];

  selectedCategoryId: number | null = null ;


  constructor(private router: Router, private quizService: QuizService) {}

  startQuiz() {
   // alert(this.selectedCategoryId)
    if (this.selectedCategoryId) {
      this.quizService.reset();
      this.quizService.setCategory(this.selectedCategoryId);
      this.router.navigate(['/quiz']);
    }
  }
}
