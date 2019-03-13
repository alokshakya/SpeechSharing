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
  getAllSpeeches(): Observable<number[]> {
    this.speechesArray = JSON.parse(localStorage.getItem('speeches'));
    // of operator returns array and pipe delay returns result after 3 sec to simulate http response
    //return only ids of my speechs so use map
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
    this.speechesArray = JSON.parse(localStorage.getItem('speeches'));
    //use filter to filter speeches with particular speech id
    var Speech= this.speechesArray.filter(val => {
      console.log('id '+id +' val.id '+val.id);
      return val.id = id;
    });
    // return 0 index element of filtered array
    console.log('returning speech ');
    console.log(Speech[0]);
    return of(Speech[0]).pipe( delay(3000));
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
    var updated:boolean = false;
    var ind=0;
    for(let i=0; i<this.speechesArray.length; i++){
      if(this.speechesArray[i].id == speech.id){
        this.speechesArray[i] = speech;
        updated=true;
        ind=i;
      }
    }
    if(updated){
      localStorage.setItem('speeches', JSON.stringify(this.speechesArray));
      return of(this.speechesArray[ind]).pipe ( delay( 3000 ) );
    }
    else{
      //not found and not updated error
    }
  }

  getNewSpeechId():number{
    var ar = JSON.parse(localStorage.getItem('speeches'));
    // return length + 5*(length -3)*11*31%17 so that unique id is maintained
    var le = ar.length;
    return (le + ( (le)*5*11*31)%17);
  }
}
