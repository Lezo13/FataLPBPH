/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Injectable } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import { User } from '../../models';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { DateUtils, ObjectUtils } from '../../utils';

@Injectable({
    providedIn: 'root'
})
export class UserHttpService {
    constructor(
        private firestore: Firestore
    ) { }


    getUser(username: string): Observable<User> {
        const userDocRef = doc(this.firestore, 'Users', username);
        return from(getDoc(userDocRef)).pipe(
            map(snapshot => {
                if (!snapshot.exists()) return null;
                const data = { username: snapshot.id, ...snapshot.data() };
                return DateUtils.autoConvertFirestoreTimestamps(data);
            })
        );
    }
}
