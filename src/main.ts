import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { AuthEffects } from './app/auth/store/auth.effects';
import { RecipeEffects } from './app/recipes/store/recipe.effects';
import { environment } from './environments/environment';
import * as fromApp from './app/store/app.reducer';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './app/auth/auth-interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    importProvidersFrom(
      HttpClientModule,
      AppRoutingModule,
      StoreModule.forRoot(fromApp.appReducer),
      EffectsModule.forRoot([AuthEffects, RecipeEffects])
    ),
  ],
});
