import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { Speech } from '../../shared/speechInterface';
import { DataService } from '../../services/data.service';
import { takeUntil } from 'rxjs/internal/operators';

@Component({
  selector: 'app-speech-content',
  templateUrl: './speech-content.component.html',
  styleUrls: ['./speech-content.component.css']
})
export class SpeechContentComponent implements OnInit {

  constructor(private fb: FormBuilder,private dataService: DataService) { }
  @Input('speechId') id: number;
  @Input('disableControls') disableControlsCondition: boolean;
  @Input() events: Observable<void>;
  @Output() editedSpeech = new EventEmitter<Speech>();
  speechText:string='this is testing test in component ';
  eventsSubscription:any;
  speech:Speech;
  loadingText:boolean=false;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  dis:boolean=true;
  addSpeechCondition:boolean=false;
  ngOnInit() {
    this.initSpeechForm();
    console.log('id of input '+this.id);
    if(this.id === undefined){
      this.addSpeechCondition = true;
      var dateObj = new Date();
      this.speech = {id:1,authorId:2,authorName:`Alok Shakya`,keywords:[`keywords1`, `keyword2`],text:'Enter Input Text',createdDate:dateObj.toISOString(),updatedDate:dateObj.toISOString()};
      console.log(this.speech);
      console.log('-------------;;;;;')
      this.setFormControlValues();
      console.log(' add speech part executed');
    }
    else{
      this.loadInitialSpeech();
      //subscribe to id change in parent to fetch updated speech
      this.loadSpeechOnIdChange();
    }
    

  }

  speechForm:FormGroup;
  initSpeechForm() {
    this.speechForm = this.fb.group({
      text: ['',[]],
      keywords: ['',[]],
      authorName: ['', []]
    });
    this.speechForm.get('text').valueChanges.subscribe(val => {
      //emit event
    });
    this.speechForm.get('keywords').valueChanges.subscribe(val => {
      // emit event
    });
    this.speechForm.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe( (val) => {
      this.speech.text = val.text;
      this.speech.keywords = val.keywords;
      this.speech.authorName = val.authorName;
      //send Speech To parent componet
      this.editedSpeech.emit(this.speech);
    });
    if(this.disableControlsCondition){
      //this.speechForm.get('text').disable();
    }
  }

  loadInitialSpeech(){
    this.loadingText = true;
    this.dataService.getSpeech(this.id).pipe(takeUntil(this.destroyed$)).subscribe( (res) => {
      this.loadingText = false;
      this.speech = res;
      this.setFormControlValues();
      //send Speech To parent componet
      this.editedSpeech.emit(this.speech);
    });

  }

  loadSpeechOnIdChange(){
    this.events.pipe(takeUntil(this.destroyed$)).subscribe(() => {

      this.loadingText = true;
      this.dataService.getSpeech(this.id).pipe(takeUntil(this.destroyed$)).subscribe( (res) => {
        this.loadingText = false;
        this.speech = res;
        this.setFormControlValues();
        //send Speech To parent componet
        this.editedSpeech.emit(this.speech);
      });
    });
  }

  setFormControlValues(){
    this.speechForm.controls['text'].setValue(this.speech.text);
    console.log(this.speech)
    console.log('keywords '+this.speech.keywords);
    console.log('authorName '+this.speech.authorName);
    this.speechForm.controls['keywords'].setValue(this.speech.keywords.toString());
    this.speechForm.controls['authorName'].setValue(this.speech.authorName);
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  

}
