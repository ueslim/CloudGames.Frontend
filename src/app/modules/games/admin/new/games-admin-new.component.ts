import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GamesService, CreateGameDto } from '../../../../shared/services/games.service';

@Component({
  selector: 'app-games-admin-new',
  templateUrl: './games-admin-new.component.html',
})
export class GamesAdminNewComponent {
  saving = false;
  error: string | null = null;
  success = false;

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(2000)]],
    developer: ['', [Validators.required, Validators.maxLength(100)]],
    publisher: ['', [Validators.required, Validators.maxLength(100)]],
    releaseDate: ['', [Validators.required]],
    genre: ['', [Validators.required, Validators.maxLength(50)]],
    price: [0, [Validators.required, Validators.min(0.01)]],
    coverImageUrl: ['', [Validators.required]],
    tags: ['', []],
  });

  constructor(private fb: FormBuilder, private games: GamesService, private router: Router) {}

  submit() {
    if (this.form.invalid || this.saving) return;
    this.error = null;
    this.saving = true;

    const raw = this.form.getRawValue();
    const payload: CreateGameDto = {
      title: raw.title,
      description: raw.description,
      developer: raw.developer,
      publisher: raw.publisher,
      releaseDate: new Date(raw.releaseDate),
      genre: raw.genre,
      price: Number(raw.price),
      coverImageUrl: raw.coverImageUrl?.match(/^https?:\/\//i) ? raw.coverImageUrl : `https://${raw.coverImageUrl}`,
      tags: (raw.tags || '')
        .split(',')
        .map(t => t.trim())
        .filter(t => !!t),
    };

    this.games.create(payload).subscribe({
      next: () => {
        this.saving = false;
        this.success = true;
        this.router.navigate(['/games']);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to create game';
        this.saving = false;
      },
    });
  }
}


