import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongitemComponent } from './songitem.component';

describe('SongitemComponent', () => {
  let component: SongitemComponent;
  let fixture: ComponentFixture<SongitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
