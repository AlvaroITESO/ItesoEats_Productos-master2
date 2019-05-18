import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from './review';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  selectedReview: Review;
  reviews: Review[];
  
  readonly URL_API = 'http://localhost:3000/api/reviews';

  constructor(private http: HttpClient) {
    this.selectedReview = new Review();
  }

  postReview(review: Review) {
    return this.http.post(this.URL_API, review);
  }

  getReviews() {
    return this.http.get(this.URL_API);
  }

  putReview(review: Review) {
    return this.http.put(this.URL_API + `/${review._id}`, review);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
