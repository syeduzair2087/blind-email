import { TestBed, inject } from '@angular/core/testing';

import { EntertainmentService } from './entertainment.service';

describe('EntertainmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntertainmentService]
    });
  });

  it('should ...', inject([EntertainmentService], (service: EntertainmentService) => {
    expect(service).toBeTruthy();
  }));
});
