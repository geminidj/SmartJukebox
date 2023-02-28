import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericpanelComponent } from './genericpanel.component';

describe('GenericpanelComponent', () => {
  let component: GenericpanelComponent;
  let fixture: ComponentFixture<GenericpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericpanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
