import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNosongsfoundComponent } from './modal-nosongsfound.component';

describe('ModalNosongsfoundComponent', () => {
  let component: ModalNosongsfoundComponent;
  let fixture: ComponentFixture<ModalNosongsfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNosongsfoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNosongsfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
