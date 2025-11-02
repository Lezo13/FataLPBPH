// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from 'src/app/_shared/models';

export const environment: Environment = {
  production: false,
  apiEndpoint: 'https://localhost:44391',
  firebase: {
    apiKey: "AIzaSyC7_cV6iYMXv-H7ve3opdurNRsBL06XIQM",
    authDomain: "fatalpbph-caff7.firebaseapp.com",
    projectId: "fatalpbph-caff7",
    storageBucket: "fatalpbph-caff7.firebasestorage.app",
    messagingSenderId: "75381627043",
    appId: "1:75381627043:web:8d1063f84ca6f8859b0716"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
