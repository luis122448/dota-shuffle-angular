import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDotaShuffleComponent } from './basic-dota-shuffle.component';

describe('BasicDotaShuffleComponent', () => {
  let component: BasicDotaShuffleComponent;
  let fixture: ComponentFixture<BasicDotaShuffleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicDotaShuffleComponent]
    });
    fixture = TestBed.createComponent(BasicDotaShuffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
