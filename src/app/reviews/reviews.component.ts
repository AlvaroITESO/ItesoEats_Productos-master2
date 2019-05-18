import { Component, OnInit } from '@angular/core';

import { ReviewService } from '../reviews/review.service';
import { NgForm } from '@angular/forms';
import { Review } from '../reviews/review';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  providers: [ ReviewService ]
})
export class ReviewsComponent implements OnInit {

  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
    this.getReviews();
  }

  addReview(form?: NgForm) {
    console.log(form.value);
    if(form.value._id) {
      this.reviewService.putReview(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getReviews();
        });
    } else {
      this.reviewService.postReview(form.value)
      .subscribe(res => {
        this.getReviews();
        this.resetForm(form);
      });
    }
    
  }

  getReviews() {
    this.reviewService.getReviews()
      .subscribe(res => {
        this.reviewService.reviews = res as Review[];
      });
  }

  editreview(review: Review) {
    this.reviewService.selectedReview = review;
  }

  deleteEmployee(_id: string, form: NgForm) {
    if(confirm('Are you sure you want to delete it?')) {
      this.reviewService.deleteEmployee(_id)
        .subscribe(res => {
          this.getReviews();
          this.resetForm(form);
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.reviewService.selectedReview = new Review();
    }
  }

}
