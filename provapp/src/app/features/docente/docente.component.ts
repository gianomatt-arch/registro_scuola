import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { VotiService } from '../../core/services/voti.service';
import { Voto } from '../../models/voto.model';

@Component({
  selector: 'app-docente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './docente.component.html',
  styleUrl: './docente.component.css',
})
export class DocenteComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly votiService = inject(VotiService);

  readonly voti = signal<Voto[]>([]);
  readonly feedback = signal('');

  readonly form = this.fb.nonNullable.group({
    studenteNome: ['', Validators.required],
    studenteUsername: ['', Validators.required],
    materia: ['', Validators.required],
    voto: [6, [Validators.required, Validators.min(1), Validators.max(10)]],
  });

  ngOnInit(): void {
    this.loadGrades();
  }

  loadGrades(): void {
    this.votiService.getAll().subscribe((voti) => this.voti.set(voti));
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.votiService.create(this.form.getRawValue()).subscribe(({ message }) => {
      this.feedback.set(message);
      this.form.patchValue({ voto: 6, materia: '' });
      this.loadGrades();
    });
  }
}
