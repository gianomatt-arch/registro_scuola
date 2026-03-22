import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';
import { VotiService } from '../../core/services/voti.service';
import { Voto } from '../../models/voto.model';

@Component({
  selector: 'app-studente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studente.component.html',
  styleUrl: './studente.component.css',
})
export class StudenteComponent implements OnInit {
  private readonly votiService = inject(VotiService);
  private readonly authService = inject(AuthService);

  readonly voti = signal<Voto[]>([]);
  readonly profile = this.authService.profile;

  ngOnInit(): void {
    this.votiService.getMine().subscribe((voti) => this.voti.set(voti));
  }
}
