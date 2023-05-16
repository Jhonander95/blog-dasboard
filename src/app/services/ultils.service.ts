import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UltilsService {

  constructor() { }

  public validationMessages = {
    category: [
      { type: 'required', message: 'La categoria es obligatoria' },
      { type: 'minlength', message: 'La categoria debe de tener más de dos caracteres' }
    ]
  }

  getValidationMessages(): object {
    return this.validationMessages;
  }
}
