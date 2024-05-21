import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDotaShuffleComponent } from './layout-dota-shuffle.component';

describe('LayoutDotaShuffleComponent', () => {
  let component: LayoutDotaShuffleComponent;
  let fixture: ComponentFixture<LayoutDotaShuffleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutDotaShuffleComponent]
    });
    fixture = TestBed.createComponent(LayoutDotaShuffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
