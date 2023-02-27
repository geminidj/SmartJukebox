import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosongswarningComponent } from './nosongswarning.component';

describe('NosongswarningComponent', () => {
  let component: NosongswarningComponent;
  let fixture: ComponentFixture<NosongswarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NosongswarningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosongswarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
