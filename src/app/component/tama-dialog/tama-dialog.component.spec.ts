import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TamaDialogComponent } from './tama-dialog.component';

describe('TamaDialogComponent', () => {
  let component: TamaDialogComponent;
  let fixture: ComponentFixture<TamaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TamaDialogComponent]
    });
    fixture = TestBed.createComponent(TamaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
