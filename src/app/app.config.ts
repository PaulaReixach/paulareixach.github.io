import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling  } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routeswithInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
        scrollOffset: [0, 80], // deja espacio para tu navbar fija
      })
    ),
  ],
};