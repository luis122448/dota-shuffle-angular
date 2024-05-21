import { TestBed } from '@angular/core/testing';

import { DotaPlayerService } from './dota-player.service';

describe('DotaPlayerService', () => {
  let service: DotaPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DotaPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
