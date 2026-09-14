import { TestBed } from '@angular/core/testing';
import { TitleTranslateStrategy } from './title-translate-strategy';

describe('TitleTranslateStrategy', () => {
  let service: TitleTranslateStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleTranslateStrategy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
