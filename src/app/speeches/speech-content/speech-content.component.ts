import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private dataService: DataService) { }
  @Input('speechId') id: number;
  @Input() events: Observable<void>;
  speechText:string='this is testing test in component ';
  eventsSubscription:any;
  speech:Speech;
  loadingText:boolean=false;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  ngOnInit() {
    console.log('id of input '+this.id);
    this.loadingText = true;
    this.dataService.getSpeech(this.id).pipe(takeUntil(this.destroyed$)).subscribe( (res) => {
      this.loadingText = false;
      this.speech = res;
      console.log('speech res ');
      console.log(res);
    });

    this.events.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      console.log('id clicked in parent displayed in child component by input '+ this.id);
      this.loadingText = true;
      this.dataService.getSpeech(this.id).pipe(takeUntil(this.destroyed$)).subscribe( (res) => {
        this.loadingText = false;
        this.speech = res;
        console.log('speech res ');
        console.log(res);
      });
    });
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
