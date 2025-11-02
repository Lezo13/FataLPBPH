/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Injectable } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import { Match, User } from '../../models';
import { Firestore, Timestamp, collection, doc, getDoc, getDocs, limit, orderBy, query, where } from '@angular/fire/firestore';
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
}