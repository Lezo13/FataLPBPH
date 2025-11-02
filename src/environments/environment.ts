// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from 'src/app/_shared/models';

export const environment: Environment = {
  production: false,
  apiEndpoint: 'https://localhost:44391',
  firebase: {
    apiKey: "AIzaSyCiWWKbc1lUuMYteMltg0yt-38ufNNZ24Y",
    authDomain: "fatal-clan.firebaseapp.com",
    projectId: "fatal-clan",
    storageBucket: "fatal-clan.firebasestorage.app",
    messagingSenderId: "272171779854",
    appId: "1:272171779854:web:3f2c6a7d42a6b958fb795f"
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
