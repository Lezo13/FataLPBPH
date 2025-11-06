/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Injectable } from '@angular/core';
import { from, Observable, map, switchMap, forkJoin, of } from 'rxjs';
import { DocumentReference, Firestore, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { InvitationCode } from '../../models';
import { DateUtils } from '../../utils';

@Injectable({
    providedIn: 'root'
})
export class InvitationCodeHttpService {
    constructor(
        private firestore: Firestore
    ) { }
    getAllInvites(): Observable<InvitationCode[]> {
        const invitesCollection = collection(this.firestore, 'InvitationCodes');
        const invitesQuery = query(
            invitesCollection,
            orderBy('isUsed', 'asc')
        );

        return from(getDocs(invitesQuery)).pipe(
            map(snapshot => {
                const invites = snapshot.docs.map(doc =>
                    DateUtils.autoConvertFirestoreTimestamps({
                        ...doc.data(),
                        inviteCode: doc.id
                    } as InvitationCode)
                );

                // Sort by expirationDate in memory
                return invites.sort((a, b) => {
                    const aDate = a.expirationDate?.toMillis?.() ?? 0;
                    const bDate = b.expirationDate?.toMillis?.() ?? 0;
                    return aDate - bDate;
                });
            })
        );
    }


    getInvite(inviteCode: string): Observable<InvitationCode> {
        const playerDocRef = doc(this.firestore, `InvitationCodes/${inviteCode}`);

        return from(getDoc(playerDocRef)).pipe(
            map(snapshot =>
                snapshot.exists()
                    ? DateUtils.autoConvertFirestoreTimestamps({
                        ...snapshot.data(),
                        inviteCode: snapshot.id
                    } as InvitationCode)
                    : null as any // or throw an error if desired
            )
        );
    }

    insertInvite(invite: InvitationCode): Observable<void> {
        const { inviteCode, ...insertData } = DateUtils.convertDatesToFirestoreTimestamps(invite);
        const inviteDocRef = doc(this.firestore, 'InvitationCodes', inviteCode) as DocumentReference<InvitationCode>;
        return from(setDoc(inviteDocRef, insertData));
    }
    deleteInvite(inviteCode: string): Observable<void> {
        const inviteDocRef = doc(this.firestore, `InvitationCodes/${inviteCode}`);
        return from(deleteDoc(inviteDocRef));
    }

    setInviteCodeUsed(inviteCode: string, username: string): Observable<void> {
        const inviteDocRef = doc(this.firestore, `InvitationCodes/${inviteCode}`);
        return from(updateDoc(inviteDocRef, { isUsed: true, usedBy: username }));
    }

    deleteInactiveInvites(): Observable<void> {
        const invitesCollection = collection(this.firestore, 'InvitationCodes');

        const today = new Date();

        // Only query using expiration date to avoid composite index
        const invitesQuery = query(
            invitesCollection,
            where('expirationDate', '<', today)
        );

        return from(getDocs(invitesQuery)).pipe(
            switchMap(snapshot => {
                const toDelete = snapshot.docs.filter(doc =>
                    doc.data()['isUsed'] === false
                );

                if (toDelete.length === 0) {
                    return of(void 0);
                }
              
                const deleteOps = toDelete.map(docSnap =>
                    deleteDoc(docSnap.ref)
                );

                return forkJoin(deleteOps).pipe(map(() => void 0));
            })
        );
    }

}
