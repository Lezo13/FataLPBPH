/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Player } from '../../models';
import { DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, orderBy, query, CollectionReference, updateDoc } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class PlayerHttpService {
    constructor(
        private firestore: Firestore
    ) { }

    getAllPlayers(): Observable<Player[]> {
        const playersCollection = collection(this.firestore, 'Players');
        const playersQuery = query(playersCollection, orderBy('playerName')); // <-- sort here
        return collectionData(playersQuery, { idField: 'playerId' }) as Observable<Player[]>;
    }

    getPlayer(playerId: string): Observable<Player> {
        const playerDocRef = doc(this.firestore, `Players/${playerId}`);
        return docData(playerDocRef, { idField: 'playerId' }) as Observable<Player>;
    }

    insertPlayer(player: Player): Observable<DocumentReference<Player>> {
        const { playerId, ...insertData } = player;
        const playersCollection = collection(this.firestore, 'Players') as CollectionReference<Player>;
        return from(addDoc(playersCollection, insertData));
    }

    updatePlayer(player: Player): Observable<void> {
        const { playerId, ...updateData } = player;
        const playerDocRef = doc(this.firestore, `Players/${player.playerId}`);
        return from(updateDoc(playerDocRef, updateData));
    }

    deletePlayer(playerId: string): Observable<void> {
        const playerDocRef = doc(this.firestore, `Players/${playerId}`);
        return from(deleteDoc(playerDocRef));
    }
}