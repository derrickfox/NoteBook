import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Dashboard
import { DashboardComponent }   from './dashboard/dashboard.component';

// Hero App
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

// Fact App
import { FactsComponent }      from './facts/facts.component';
import { FactDetailComponent }  from './fact-detail/fact-detail.component';

// Routes
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'hero/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'fact/:id', component: FactDetailComponent },
  { path: 'facts', component: FactsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
