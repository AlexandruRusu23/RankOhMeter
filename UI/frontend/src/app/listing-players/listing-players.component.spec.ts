import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingPlayersComponent } from './listing-players.component';

describe('ListingPlayersComponent', () => {
  let component: ListingPlayersComponent;
  let fixture: ComponentFixture<ListingPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
