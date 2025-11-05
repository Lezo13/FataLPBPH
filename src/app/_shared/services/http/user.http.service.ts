/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Injectable } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import { User } from '../../models';
import { DocumentReference, Firestore, collection, doc, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { DateUtils } from '../../utils';

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

    insertUser(user: User): Observable<void> {
        const { username, ...insertData } = DateUtils.convertDatesToFirestoreTimestamps(user);
        const userDocRef = doc(this.firestore, 'Users', username) as DocumentReference<User>;
        return from(setDoc(userDocRef, insertData));
    }

    usernameExists(email: string): Observable<boolean> {
        const userDocRef = doc(this.firestore, 'Users', email);
        return from(getDoc(userDocRef)).pipe(
            map(snapshot => snapshot.exists())
        );
    }

    emailExists(email: string): Observable<boolean> {
        const usersRef = collection(this.firestore, 'Users');
        const q = query(usersRef, where('email', '==', email));

        return from(getDocs(q)).pipe(
            map(snapshot => !snapshot.empty)
        );
    }
}
