import { FirebaseOptions } from '@angular/fire/app';

export interface Environment {
  production: boolean;
  apiEndpoint: string;
  firebase: FirebaseOptions;
}
