import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { GamesListComponent } from './list/games-list.component';
import { GameDetailsComponent } from './details/game-details.component';
import { GamesAdminNewComponent } from './admin/new/games-admin-new.component';
import { AdminGuard } from '../../shared/guards/admin.guard';

const routes: Routes = [
  { path: '', component: GamesListComponent },
  { path: 'admin/new', component: GamesAdminNewComponent, canActivate: [AdminGuard] },
  { path: ':id', component: GameDetailsComponent },
];

@NgModule({
  declarations: [GamesListComponent, GameDetailsComponent, GamesAdminNewComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class GamesModule {}


