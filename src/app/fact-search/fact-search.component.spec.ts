import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactSearchComponent } from './fact-search.component';

describe('FactSearchComponent', () => {
  let component: FactSearchComponent;
  let fixture: ComponentFixture<FactSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
