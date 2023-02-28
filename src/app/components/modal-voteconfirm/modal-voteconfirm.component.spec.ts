import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVoteconfirmComponent } from './modal-voteconfirm.component';

describe('ModalVoteconfirmComponent', () => {
  let component: ModalVoteconfirmComponent;
  let fixture: ComponentFixture<ModalVoteconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVoteconfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVoteconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
