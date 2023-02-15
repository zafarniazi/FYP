import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowndviComponent } from './showndvi.component';

describe('ShowndviComponent', () => {
  let component: ShowndviComponent;
  let fixture: ComponentFixture<ShowndviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowndviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowndviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
