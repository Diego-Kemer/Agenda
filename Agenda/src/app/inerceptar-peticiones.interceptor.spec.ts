import { TestBed } from '@angular/core/testing';

import { InerceptarPeticionesInterceptor } from './inerceptar-peticiones.interceptor';

describe('InerceptarPeticionesInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InerceptarPeticionesInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InerceptarPeticionesInterceptor = TestBed.inject(InerceptarPeticionesInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
