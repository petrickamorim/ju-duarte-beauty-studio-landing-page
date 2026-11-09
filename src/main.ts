import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { iniciarNoTopo } from './app/core/navegacao/iniciar-no-topo';

iniciarNoTopo();

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
