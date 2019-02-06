import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPlayersModalComponent } from './select-players-modal.component';

describe('SelectPlayersModalComponent', () => {
  let component: SelectPlayersModalComponent;
  let fixture: ComponentFixture<SelectPlayersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPlayersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPlayersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
