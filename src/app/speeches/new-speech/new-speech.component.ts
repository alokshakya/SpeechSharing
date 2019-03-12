import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subject, ReplaySubject } from 'rxjs';
import { Speech } from '../../shared/speechInterface';
import { takeUntil } from 'rxjs/internal/operators';
@Component({
  selector: 'app-new-speech',
  templateUrl: './new-speech.component.html',
  styleUrls: ['./new-speech.component.css']
})
export class NewSpeechComponent implements OnInit {

  constructor(private dataService: DataService) { }
  private eventsSubject: Subject<void> = new Subject<void>();
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  emitEventToChild() {
    this.eventsSubject.next();
  }
  speechIdClicked:number;
  ngOnInit() {
    this.getAllSpeechIds();
  }

  allSpeechIds:number[];
  loadingIds:boolean=false;
  getAllSpeechIds(){
    this.loadingIds=true;
    this.dataService.getAllSpeeches()
    .subscribe( (res) => {
      this.loadingIds=false;
      this.allSpeechIds = res;
      this.speechIdClicked = this.allSpeechIds[0];
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
  savingSpeech:boolean=false;
  save(){
    this.savingSpeech = true;
    console.log('speech Content');
    var dateObj = new Date();
    this.speech.updatedDate = dateObj.toISOString();
    console.log(this.speech);
    this.dataService.editSpeech(this.speech).pipe(takeUntil(this.destroyed$))
    .subscribe( (res) => {
      this.savingSpeech = false;
      this.speech = res;
    },
    (err) => {
      //error handling part
    })
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  addSpeech(){
    console.log('speech to be added ');
    console.log(this.speech);
  }


}
