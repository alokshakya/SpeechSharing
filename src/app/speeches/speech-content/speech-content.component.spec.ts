import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechContentComponent } from './speech-content.component';

describe('SpeechContentComponent', () => {
  let component: SpeechContentComponent;
  let fixture: ComponentFixture<SpeechContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
