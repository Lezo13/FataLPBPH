/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Injectable } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import { DocumentReference, Firestore, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { InvitationCode } from '../../models';
import { DateUtils } from '../../utils';

@Injectable({
    providedIn: 'root'
})
export class InvitationCodeHttpService {
    constructor(
        private firestore: Firestore
    ) { }

    insertInvite(invite: InvitationCode): Observable<void> {
        const { inviteCode, ...insertData } = DateUtils.convertDatesToFirestoreTimestamps(invite);
        const inviteDocRef = doc(this.firestore, 'InvitationCodes', inviteCode) as DocumentReference<InvitationCode>;
        return from(setDoc(inviteDocRef, insertData));
    }

    getRecentInvite(username: string): Observable<InvitationCode> {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const matchesRef = collection(this.firestore, 'InvitationCodes');

        const q = query(
            matchesRef,
            where('createdBy', '==', username)
        );

        return from(getDocs(q)).pipe(
            map(snapshot => {
                if (snapshot.empty) return null;
                const validDocs = snapshot.docs.filter(doc => {
                    const docData: InvitationCode = { inviteCode: doc.id, ...doc.data() } as InvitationCode;
                    const convData: InvitationCode = DateUtils.autoConvertFirestoreTimestamps(docData);
                    return convData.expirationDate > startOfToday && !convData.isUsed;
                });

                const doc = validDocs[0];

                const data: InvitationCode = { inviteCode: doc.id, ...doc.data() } as InvitationCode;
                return DateUtils.autoConvertFirestoreTimestamps(data);
            })
        );
    }

    getInvitationCode(inviteCode: string): Observable<InvitationCode> {
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

    setInviteCodeUsed(inviteCode: string): Observable<void> {
        const inviteDocRef = doc(this.firestore, `InvitationCodes/${inviteCode}`);
        return from(updateDoc(inviteDocRef, { isUsed: true }));
    }
}
