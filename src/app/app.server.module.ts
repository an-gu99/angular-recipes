import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AuthEffects } from './auth/store/auth.effects';
import { RecipeEffects } from './recipes/store/recipe.effects';

import * as fromApp from './store/app.reducer';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    ServerModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipeEffects]),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
