import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimMatchComponent } from './sim-match.component';

describe('SimMatchComponent', () => {
  let component: SimMatchComponent;
  let fixture: ComponentFixture<SimMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
