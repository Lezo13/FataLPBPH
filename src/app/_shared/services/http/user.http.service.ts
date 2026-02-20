/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Injectable } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import { User } from '../../models';
import { DocumentReference, Firestore, collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { DateUtils } from '../../utils';

@Injectable({
    providedIn: 'root'
})
export class UserHttpService {
    constructor(
        private firestore: Firestore
    ) { }

    getAllUsers(): Observable<User[]> {
        const usersCollection = collection(this.firestore, 'Users');
        const usersQuery = query(usersCollection, orderBy('ingameName'));

        return from(getDocs(usersQuery)).pipe(
            map(snapshot =>
                snapshot.docs.map(doc =>
                    DateUtils.autoConvertFirestoreTimestamps({
                        username: doc.id,
                        ...doc.data()
                    } as User)
                )
            )
        );
    }

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

    updateUser(user: User): Observable<void> {
        const { username, ...updateData } = DateUtils.convertDatesToFirestoreTimestamps(user);
        const userDocRef = doc(this.firestore, `Users/${user.username}`);
        return from(updateDoc(userDocRef, updateData));
    }

    updateEmail(oldEmail: string, newEmail: string): Observable<void> {
        const usersCollection = collection(this.firestore, 'Users');
        const q = query(usersCollection, where('email', '==', oldEmail));

        return from(getDocs(q).then((querySnapshot) => {
            if (querySnapshot.empty) {
                return Promise.resolve();
            }

            const docSnap = querySnapshot.docs[0];

            return updateDoc(docSnap.ref, { email: newEmail }).then(() => { });
        }));
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
