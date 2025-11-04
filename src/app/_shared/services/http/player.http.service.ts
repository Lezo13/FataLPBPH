/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { Player } from '../../models';
import { DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, orderBy, query, CollectionReference, updateDoc, getDocs, getDoc } from '@angular/fire/firestore';
import { DateUtils } from '../../utils';

@Injectable({
    providedIn: 'root'
})
export class PlayerHttpService {
    constructor(
        private firestore: Firestore
    ) { }

    getAllPlayers(): Observable<Player[]> {
        const playersCollection = collection(this.firestore, 'Players');
        const playersQuery = query(playersCollection, orderBy('playerName'));

        // getDocs returns a Promise<QuerySnapshot>
        return from(getDocs(playersQuery)).pipe(
            map(snapshot =>
                snapshot.docs.map(doc =>
                    DateUtils.autoConvertFirestoreTimestamps({
                        playerId: doc.id,
                        ...doc.data()
                    } as Player)
                )
            )
        );
    }

    getPlayer(playerId: string): Observable<Player> {
        const playerDocRef = doc(this.firestore, `Players/${playerId}`);

        return from(getDoc(playerDocRef)).pipe(
            map(snapshot =>
                snapshot.exists()
                    ? DateUtils.autoConvertFirestoreTimestamps({
                        ...snapshot.data(),
                        playerId: snapshot.id
                    } as Player)
                    : null as any // or throw an error if desired
            )
        );
    }

    insertPlayer(player: Player): Observable<DocumentReference<Player>> {
        const { playerId, ...insertData } = DateUtils.convertDatesToFirestoreTimestamps(player);
        const playersCollection = collection(this.firestore, 'Players') as CollectionReference<Player>;
        return from(addDoc(playersCollection, insertData));
    }

    updatePlayer(player: Player): Observable<void> {
        const { playerId, ...updateData } = DateUtils.convertDatesToFirestoreTimestamps(player);
        const playerDocRef = doc(this.firestore, `Players/${player.playerId}`);
        return from(updateDoc(playerDocRef, updateData));
    }

    deletePlayer(playerId: string): Observable<void> {
        const playerDocRef = doc(this.firestore, `Players/${playerId}`);
        return from(deleteDoc(playerDocRef));
    }
}