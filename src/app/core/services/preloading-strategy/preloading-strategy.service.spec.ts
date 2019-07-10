import { TestBed, inject } from '@angular/core/testing';

import { PreloadingStrategyService } from './preloading-strategy.service';

describe('PreloadingStrategyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreloadingStrategyService]
    });
  });

  it('should be created', inject([PreloadingStrategyService], (service: PreloadingStrategyService) => {
    expect(service).toBeTruthy();
  }));
});
