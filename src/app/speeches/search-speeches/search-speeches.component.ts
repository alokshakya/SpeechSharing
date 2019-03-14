import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subject, ReplaySubject } from 'rxjs';
import { Speech } from '../../shared/speechInterface';
import { takeUntil } from 'rxjs/internal/operators';

@Component({
  selector: 'app-search-speeches',
  templateUrl: './search-speeches.component.html',
  styleUrls: ['./search-speeches.component.css']
})
export class SearchSpeechesComponent implements OnInit {

  constructor(private dataService: DataService) { }
  private eventsSubject: Subject<number> = new Subject<number>();
  private loadingEventSubject: Subject<boolean> = new Subject<boolean>();
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
      this.updateSpeechId(this.speechIdClicked);
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
    this.eventsSubject.next(this.speechIdClicked);
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
    this.loadingEventSubject.next(true);
    console.log('speech Content');
    var dateObj = new Date();
    this.speech.updatedDate = dateObj.toISOString();
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

  searchByCondition:string;
  searchBy(condition:string){
    this.searchByCondition = condition;
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


}
