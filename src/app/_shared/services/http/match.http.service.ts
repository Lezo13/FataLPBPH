/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Injectable } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import { Match } from '../../models';
import {
    CollectionReference, DocumentReference,
    Firestore, addDoc, collection, collectionData, deleteDoc, doc,
    docData, getDoc, getDocs, limit, orderBy, query, updateDoc, where
} from '@angular/fire/firestore';
import { DateUtils } from '../../utils';

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
        const matchesQuery = query(matchesCollection, orderBy('matchStartDate', 'desc'));

        return from(getDocs(matchesQuery)).pipe(
            map(snapshot =>
                snapshot.docs.map(doc =>
                    DateUtils.autoConvertFirestoreTimestamps({
                        ...doc.data(),
                        matchId: doc.id
                    } as Match)
                )
            )
        );
    }

    getMatch(matchId: string): Observable<Match> {
        const matchDocRef = doc(this.firestore, `Matches/${matchId}`);

        return from(getDoc(matchDocRef)).pipe(
            map(snapshot =>
                snapshot.exists()
                    ? DateUtils.autoConvertFirestoreTimestamps({
                        ...snapshot.data(),
                        matchId: snapshot.id
                    } as Match)
                    : null as any // or throw an error if desired
            )
        );
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