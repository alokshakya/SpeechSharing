import { Injectable } from '@angular/core';
import { Speech } from '../shared/speechInterface';
import { Speeches } from '../shared/speeches';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

var Speeches2:Speech[] = [
  {
      id:1,
      authorId:2,
      authorName:'Alok',
      keywords:['rally', 'election'],
      text:'This is testing text speech',
      createdDate:"2019-03-09T08:38:22.410Z",
      updatedDate:"2019-03-09T08:39:10.823Z"
  }
];
@Injectable({
  providedIn: 'root'
})
export class DataService {
  speechesArray:Speech[];
  constructor() { }
  getAllSpeeches(): Observable<Speech[]> {
    // TODO: send the message _after_ fetching the heroes
    //this.messageService.add('HeroService: fetched heroes');
    return of(Speeches);
  }
  addSpeech(data:Speech): Observable<Speech[]> {
    // TODO: send the message _after_ fetching the heroes
    //this.messageService.add('HeroService: fetched heroes');
    if(localStorage.getItem('speeches') == null){
      //create first array and insert in it
      this.speechesArray = [];
      this.speechesArray.push(data);
      localStorage.setItem('speeches', JSON.stringify(this.speechesArray));
    }
    else{
      this.speechesArray = JSON.parse(localStorage.getItem('speeches'));
      this.speechesArray.push(data);
      localStorage.setItem('speeches', JSON.stringify(this.speechesArray));
    }
    
    return of(this.speechesArray).pipe ( delay( 3000 ) )
  }
}
