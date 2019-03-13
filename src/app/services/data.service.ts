import { Injectable } from '@angular/core';
import { Speech } from '../shared/speechInterface';
import { Speeches } from '../shared/speeches';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  speechesArray:Speech[];
  constructor() { }
  getAllSpeeches(): Observable<number[]> {
    this.speechesArray = JSON.parse(localStorage.getItem('speeches'));
    // of operator returns array and pipe delay returns result after 3 sec to simulate http response
    //return only ids of my speechs so use map
    if(this.speechesArray == null){
      return of([]).pipe( delay(3000));
    }
    var ids = this.speechesArray.map( val => {
      return val.id;
    })
    return of(ids).pipe( delay(3000)); 
  }
  getMySpeechesIds(id:number): Observable<number[]> {
    this.speechesArray = JSON.parse(localStorage.getItem('speeches'));
    //use filter to filter only speeches of particular user with id
    var mySpeeches = this.speechesArray.filter(val => {
      return val.authorId = id;
    })
    //return only ids of my speechs so use map
    var ids = mySpeeches.map( val => {
      return val.id;
    })
    // of operator returns array and pipe delay returns result after 3 sec to simulate http response
    return of(ids).pipe( delay(3000)); 
  }
  getSpeech(id:number):Observable<Speech>{
    var speechesArray = JSON.parse(localStorage.getItem('speeches'));
    for( let i=0; i<speechesArray.length; i++){
      if(speechesArray[i].id == id){
        return of(speechesArray[i]).pipe( delay(3000));
      }
    }
    alert('not found speech with id '+id);
  }
  addSpeech(data:Speech): Observable<Speech> {
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
    
    return of(data).pipe ( delay( 3000 ) );
  }
  editSpeech(speech:Speech):Observable<Speech>{
    this.speechesArray = JSON.parse(localStorage.getItem('speeches'));
    for(let i=0; i<this.speechesArray.length; i++){
      if(this.speechesArray[i].id == speech.id){
        console.log('id matched '+this.speechesArray[i].id + ' param id '+speech.id);
        this.speechesArray[i] = speech;
        localStorage.setItem('speeches', JSON.stringify(this.speechesArray));
        console.log('speeches from localstorage '+localStorage.getItem('speeches'));
        return of(this.speechesArray[i]).pipe ( delay( 3000 ) );
      }
    }
    alert( 'speech not found');
    return;
  }

  deleteSpeech(id:number):Observable<number[]>{
    this.speechesArray = JSON.parse(localStorage.getItem('speeches'));
    for(let i=0; i<this.speechesArray.length; i++){
      if(this.speechesArray[i].id == id){
        console.log('id matched '+this.speechesArray[i].id + ' param id '+id);
        this.speechesArray.splice(i,1);
        localStorage.setItem('speeches', JSON.stringify(this.speechesArray));
        console.log('speeches from localstorage '+localStorage.getItem('speeches'));
        var ids = this.speechesArray.map( (val) => {
          return val.id;
        })
        return of(ids).pipe ( delay( 3000 ) );
      }
    }
    alert( 'speech not found');
    return;
  }

  getNewSpeechId():number{
    var ar = JSON.parse(localStorage.getItem('speeches'));
    if(ar == null){
      return 1;
    }
    var min=2;
    var max=500000;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;  
  }
}
