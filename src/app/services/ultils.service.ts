import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UltilsService {

  constructor() { }

  public validationMessages = {
    category: [
      { type: 'required', message: 'La categoria es obligatoria' },
      { type: 'minlength', message: 'La categoria debe de tener más de 2 caracteres' }
    ],
    title: [
      { type: 'required', message: 'El titulo es obligatorio' },
      { type: 'minlength', message: 'El titulo debe de tener más de 10 caracteres' }
    ],
    permalink: [
      { type: 'required', message: 'El permalink es obligatorio' },
      { type: 'minlength', message: 'El permalink debe de tener más de 10 caracteres' }
    ],
    excerpt: [
      { type: 'required', message: 'El excerpt es obligatorio' },
      { type: 'minlength', message: 'El excerpt debe de tener más de 50 caracteres' }
    ],
    postImg: [
      { type: 'required', message: 'La imagen es obligatoria' }
    ],
    content: [
      { type: 'required', message: 'El contenido es obligatorio' }
    ]
  }

  getValidationMessages(): object {
    return this.validationMessages;
  }
}
