import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { NuovoVoto, Voto } from '../../models/voto.model';

@Injectable({ providedIn: 'root' })
export class VotiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAll() {
    return this.http.get<Voto[]>(`${this.apiUrl}/voti`);
  }

  getMine() {
    return this.http.get<Voto[]>(`${this.apiUrl}/voti/miei`);
  }

  create(payload: NuovoVoto) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/voti`, payload);
  }
}
