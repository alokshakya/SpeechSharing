import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subject, ReplaySubject } from 'rxjs';
import { Speech } from '../../shared/speechInterface';
import { takeUntil } from 'rxjs/internal/operators';
@Component({
  selector: 'app-my-speeches',
  templateUrl: './my-speeches.component.html',
  styleUrls: ['./my-speeches.component.css']
})
export class MySpeechesComponent implements OnInit {

  constructor(private dataService: DataService) { }
  private eventsSubject: Subject<number> = new Subject<number>();
  private loadingEventSubject: Subject<boolean> = new Subject<boolean>();
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  emitEventToChild() {
    this.eventsSubject.next();
  }
  speechIdClicked:number;
  ngOnInit() {
    this.getMySpeechIds();
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
      this.updateSpeechId(this.speechIdClicked);
    },
    (err) => {
      this.loadingIds=false;
      //do error handling part
    })
  }
  updateSpeechId(id:number){
    this.speechIdClicked = id;
    this.eventsSubject.next(id);
  }
  speech:Speech;
  editedSpeech(speechFromChild:Speech){
    this.speech = speechFromChild;
  }
  savingSpeech:boolean=false;
  save(){
    this.savingSpeech = true;
    this.loadingEventSubject.next(true);
    console.log('speech Content');
    var dateObj = new Date();
    this.speech.updatedDate = dateObj.toISOString();
    var a = this.speech.keywords;
    var b = a.toString();
    this.speech.keywords = b.split(',');
    console.log('speech keywords ');
    console.log(this.speech.keywords);
    console.log(this.speech);
    this.dataService.editSpeech(this.speech).pipe(takeUntil(this.destroyed$))
    .subscribe( (res) => {
      this.savingSpeech = false;
      this.loadingEventSubject.next(false);
      this.speech = res;
    },
    (err) => {
      this.loadingEventSubject.next(false);
      //error handling part
    })
  }

  delete(){
    this.loadingEventSubject.next(true);
    this.dataService.deleteSpeech(this.speech.id).pipe(takeUntil(this.destroyed$))
    .subscribe( (res) => {
      this.savingSpeech = false;
      this.loadingEventSubject.next(false);
      this.mySpeechIds = res;
      this.speechIdClicked = this.mySpeechIds[0];
      this.updateSpeechId(this.speechIdClicked);
    },
    (err) => {
      this.loadingEventSubject.next(false);
      //error handling part
    })
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
