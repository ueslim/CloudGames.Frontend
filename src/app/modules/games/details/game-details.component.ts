import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService, GameDto } from '../../../shared/services/games.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
})
export class GameDetailsComponent implements OnInit {
  game: GameDto | null = null;
  loading = true;
  error: string | null = null;
  notFound = false;
  purchasing = false;
  purchaseError: string | null = null;

  constructor(private route: ActivatedRoute, private gamesService: GamesService, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.gamesService.getById(id).subscribe({
      next: (g) => {
        this.game = g;
        this.loading = false;
      },
      error: (err) => {
        if (err && err.status === 404) {
          this.notFound = true;
        } else {
          this.error = 'Failed to load game';
        }
        this.loading = false;
      },
    });
  }

  buy() {
    if (!this.game || this.purchasing) return;
    this.purchaseError = null;
    this.purchasing = true;
    this.gamesService.purchase(this.game.id).subscribe({
      next: (res) => {
        const paymentId = res?.paymentId;
        if (paymentId) {
          this.router.navigate(['/payments', paymentId]);
        } else {
          this.purchaseError = 'Unexpected response from server.';
          this.purchasing = false;
        }
      },
      error: () => {
        this.purchaseError = 'Could not start the purchase. Please try again.';
        this.purchasing = false;
      },
    });
  }
}


