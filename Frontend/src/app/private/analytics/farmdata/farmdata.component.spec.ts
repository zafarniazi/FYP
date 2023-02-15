import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmdataComponent } from './farmdata.component';

describe('FarmdataComponent', () => {
  let component: FarmdataComponent;
  let fixture: ComponentFixture<FarmdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
