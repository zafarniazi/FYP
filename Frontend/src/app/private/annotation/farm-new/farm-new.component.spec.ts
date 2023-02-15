import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmNewComponent } from './farm-new.component';

describe('FarmNewComponent', () => {
  let component: FarmNewComponent;
  let fixture: ComponentFixture<FarmNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
