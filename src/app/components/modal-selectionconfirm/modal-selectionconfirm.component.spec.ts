import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectionconfirmComponent } from './modal-selectionconfirm.component';

describe('ModalSelectionconfirmComponent', () => {
  let component: ModalSelectionconfirmComponent;
  let fixture: ComponentFixture<ModalSelectionconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSelectionconfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSelectionconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
