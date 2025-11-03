/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Injectable } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import { Match, User } from '../../models';
import { CollectionReference, DocumentReference, Firestore, Timestamp, addDoc, collection, collectionData, deleteDoc, doc, docData, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { DateUtils, ObjectUtils } from '../../utils';

@Injectable({
    providedIn: 'root'
})
export class MatchHttpService {
    constructor(
        private firestore: Firestore
    ) { }


    getNextMatch(): Observable<Match> {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const matchesRef = collection(this.firestore, 'Matches');

        const q = query(
            matchesRef,
            where('matchStartDate', '>=', startOfToday),
            orderBy('matchStartDate', 'asc'),
            limit(1)
        );

        return from(getDocs(q)).pipe(
            map(snapshot => {
                if (snapshot.empty) return null;
                const doc = snapshot.docs[0];
                const data: Match = { matchId: doc.id, ...doc.data() } as Match;
                return DateUtils.autoConvertFirestoreTimestamps(data);
            })
        );
    }

    getAllMatches(): Observable<Match[]> {
        const matchesCollection = collection(this.firestore, 'Matches');
        const matchesQuery = query(matchesCollection, orderBy('matchStartDate'));

        return collectionData(matchesQuery, { idField: 'matchId' }).pipe(
            map(matches =>
                matches.map(match =>
                    DateUtils.autoConvertFirestoreTimestamps(match as Match)
                )
            )
        );
    }


    getMatch(matchId: string): Observable<Match> {
        const matchDocRef = doc(this.firestore, `Matches/${matchId}`);
        return docData(matchDocRef, { idField: 'matchId' }).pipe(
            map((match) => DateUtils.autoConvertFirestoreTimestamps(match as Match))
        ) as Observable<Match>;
    }

    insertMatch(match: Match): Observable<DocumentReference<Match>> {
        const { matchId, ...insertData } = DateUtils.convertDatesToFirestoreTimestamps(match);
        const matchesCollection = collection(this.firestore, 'Matches') as CollectionReference<Match>;
        return from(addDoc(matchesCollection, insertData));
    }

    updateMatch(match: Match): Observable<void> {
        const { matchId, ...updateData } = DateUtils.convertDatesToFirestoreTimestamps(match);
        const matchDocRef = doc(this.firestore, `Matches/${match.matchId}`);
        return from(updateDoc(matchDocRef, updateData));
    }

    deleteMatch(matchId: string): Observable<void> {
        const matchDocRef = doc(this.firestore, `Matches/${matchId}`);
        return from(deleteDoc(matchDocRef));
    }
}