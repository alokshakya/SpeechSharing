import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subject } from 'rxjs';
import { Speech } from '../../shared/speechInterface';

@Component({
  selector: 'app-my-speeches',
  templateUrl: './my-speeches.component.html',
  styleUrls: ['./my-speeches.component.css']
})
export class MySpeechesComponent implements OnInit {

  constructor(private dataService: DataService) { }
  private eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
    this.eventsSubject.next();
  }
  speechIdClicked:number;
  ngOnInit() {
    this.getMySpeechIds();
  }

  speechData = {
    id:3,
    authorId:2,
    authorName:'Alok',
    keywords:['rally', 'election'],
    text:'This is testing text speech 3',
    createdDate:"2019-03-10T08:38:22.410Z",
    updatedDate:"2019-03-11T08:39:10.823Z"
  };
  loading:boolean=false;
  addMessage(){
    this.loading=true;
    this.dataService.addSpeech(this.speechData)
    .subscribe( (res) => {
      this.loading=false;
      console.log('response in console ');
      console.log(res);
    });
  }
  mySpeechIds:number[];

  loadingIds:boolean=false;
  getMySpeechIds(){
    this.loadingIds=true;
    this.dataService.getMySpeechesIds(1)
    .subscribe( (res) => {
      this.loadingIds=false;
      this.mySpeechIds = res;
      this.speechIdClicked = this.mySpeechIds[0];
    },
    (err) => {
      this.loadingIds=false;
      //do error handling part
    })
  }
  updateSpeechId(id:number){
    console.log('id '+id);
    this.speechIdClicked = id;
    console.log('this.SpeechIdClicked '+this.speechIdClicked);
    this.eventsSubject.next();
  }
  speech:Speech;
  editedSpeech(speechFromChild:Speech){
    // console.log('speech from child ');
    // console.log(speechFromChild);
    this.speech = speechFromChild;
  }

}
