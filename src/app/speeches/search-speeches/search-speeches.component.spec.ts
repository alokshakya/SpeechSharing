import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSpeechesComponent } from './search-speeches.component';

describe('SearchSpeechesComponent', () => {
  let component: SearchSpeechesComponent;
  let fixture: ComponentFixture<SearchSpeechesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSpeechesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSpeechesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
