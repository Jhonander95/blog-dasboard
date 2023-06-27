import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  public validationMessages = {
    name: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'minlength', message: 'El nombre debe de tener más de 2 caracteres' }
    ],
    email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'pattern', message: 'El formato del email es inválido' }
    ],
    comment: [
      { type: 'required', message: 'El comentario es obligatorio' },
      { type: 'pattern', message: 'El comentario debe tener más de 4 caracteres' }
    ],
  }

  getValidationMessages(): object {
    return this.validationMessages;
  }

}
