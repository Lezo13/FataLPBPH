/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Injectable } from '@angular/core';
import { from, Observable, map, forkJoin } from 'rxjs';
import { Map, SpawnPoint } from '../../models';
import {
    CollectionReference, DocumentReference,
    Firestore, addDoc, collection, deleteDoc, doc,
    getDoc, getDocs, orderBy, query, updateDoc
} from '@angular/fire/firestore';
import { DateUtils } from '../../utils';

@Injectable({
    providedIn: 'root'
})
export class SpawnPointHttpService {
    constructor(
        private firestore: Firestore
    ) { }

    getAllSpawnPoints(): Observable<SpawnPoint[]> {
        const spawnsCollection = collection(this.firestore, 'SpawnPoints');
        const mapsCollection = collection(this.firestore, 'Maps');

        return forkJoin({
            spawns: from(getDocs(spawnsCollection)),
            maps: from(getDocs(mapsCollection))
        }).pipe(
            map(({ spawns, maps }) => {
                const mapsLookup: Map[] = maps.docs.map(doc => ({
                    mapId: doc.id,
                    ...(doc.data() as Map)
                }));

                const merged = spawns.docs.map(doc => {
                    const data = doc.data() as SpawnPoint;
                    const mapData = mapsLookup.find(ml => ml.mapId == data.mapId);

                    return DateUtils.autoConvertFirestoreTimestamps({
                        ...data,
                        spawnPointId: doc.id,
                        mapName: mapData?.mapName ?? '',
                        mapImageUrl: mapData?.mapImageUrl ?? ''
                    } as SpawnPoint);
                });

                return merged.sort((a, b) =>
                    a.mapName.localeCompare(b.mapName)
                );
            })
        );
    }


    getSpawnPoint(spawnPointId: string): Observable<SpawnPoint> {
        const spawnDocRef = doc(this.firestore, `SpawnPoints/${spawnPointId}`);

        return from(getDoc(spawnDocRef)).pipe(
            map(snapshot =>
                snapshot.exists()
                    ? DateUtils.autoConvertFirestoreTimestamps({
                        ...snapshot.data(),
                        spawnPointId: snapshot.id
                    } as SpawnPoint)
                    : null as any // or throw an error if desired
            )
        );
    }

    insertSpawnPoint(spawnPoint: SpawnPoint): Observable<DocumentReference<SpawnPoint>> {
        const { spawnPointId, ...insertData } = DateUtils.convertDatesToFirestoreTimestamps(spawnPoint);
        const spawnCollection = collection(this.firestore, 'SpawnPoints') as CollectionReference<SpawnPoint>;
        return from(addDoc(spawnCollection, insertData));
    }

    updateSpawnPoint(spawnPoint: SpawnPoint): Observable<void> {
        const { spawnPointId, ...updateData } = DateUtils.convertDatesToFirestoreTimestamps(spawnPoint);
        const spawnDocref = doc(this.firestore, `SpawnPoints/${spawnPoint.spawnPointId}`);
        return from(updateDoc(spawnDocref, updateData));
    }

    deleteSpawnPoint(spawnPointId: string): Observable<void> {
        const spawnDocref = doc(this.firestore, `SpawnPoints/${spawnPointId}`);
        return from(deleteDoc(spawnDocref));
    }
}