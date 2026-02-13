/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Injectable } from '@angular/core';
import { from, Observable, map } from 'rxjs';
import { Map } from '../../models';
import {
    CollectionReference, DocumentReference,
    Firestore, addDoc, collection, deleteDoc, doc,
    getDoc, getDocs, orderBy, query, updateDoc
} from '@angular/fire/firestore';
import { DateUtils } from '../../utils';

@Injectable({
    providedIn: 'root'
})
export class MapHttpService {
    constructor(
        private firestore: Firestore
    ) { }

    getAllMaps(): Observable<Map[]> {
        const matchesCollection = collection(this.firestore, 'Maps');
        const matchesQuery = query(matchesCollection, orderBy('mapName', 'asc'));

        return from(getDocs(matchesQuery)).pipe(
            map(snapshot =>
                snapshot.docs.map(doc =>
                    DateUtils.autoConvertFirestoreTimestamps({
                        ...doc.data(),
                        mapId: doc.id
                    } as Map)
                )
            )
        );
    }

    getMap(mapId: string): Observable<Map> {
        const matchDocRef = doc(this.firestore, `Maps/${mapId}`);

        return from(getDoc(matchDocRef)).pipe(
            map(snapshot =>
                snapshot.exists()
                    ? DateUtils.autoConvertFirestoreTimestamps({
                        ...snapshot.data(),
                        mapId: snapshot.id
                    } as Map)
                    : null as any // or throw an error if desired
            )
        );
    }

    insertMap(map: Map): Observable<DocumentReference<Map>> {
        const { matchId, ...insertData } = DateUtils.convertDatesToFirestoreTimestamps(map);
        const mapsCollection = collection(this.firestore, 'Maps') as CollectionReference<Map>;
        return from(addDoc(mapsCollection, insertData));
    }

    updateMap(map: Map): Observable<void> {
        const { matchId, ...updateData } = DateUtils.convertDatesToFirestoreTimestamps(map);
        const mapDocRef = doc(this.firestore, `Maps/${map.mapId}`);
        return from(updateDoc(mapDocRef, updateData));
    }

    deleteMap(mapId: string): Observable<void> {
        const mapDocRef = doc(this.firestore, `Maps/${mapId}`);
        return from(deleteDoc(mapDocRef));
    }
}