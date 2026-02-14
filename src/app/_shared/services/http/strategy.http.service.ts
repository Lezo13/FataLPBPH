/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { Injectable } from '@angular/core';
import { from, Observable, map, forkJoin } from 'rxjs';
import { Strategy, Map, MapStrategies } from '../../models';
import {
    CollectionReference, DocumentReference,
    Firestore, addDoc, collection, deleteDoc, doc,
    getDoc, getDocs, limit, orderBy, query, updateDoc, where
} from '@angular/fire/firestore';
import { DateUtils, ObjectUtils } from '../../utils';

@Injectable({
    providedIn: 'root'
})
export class StrategyHttpService {
    constructor(
        private firestore: Firestore
    ) { }

    getMapStrategies(): Observable<MapStrategies[]> {
        const mapsCollection = collection(this.firestore, 'Maps');
        const strategiesCollection = collection(this.firestore, 'Strategies');

        return forkJoin({
            maps: from(getDocs(mapsCollection)),
            strategies: from(getDocs(strategiesCollection))

        }).pipe(
            map(({ maps, strategies }) => {
                const strategiesLookup: Strategy[] = strategies.docs.map(doc => ({
                    strategyId: doc.id,
                    ...(doc.data() as Strategy)
                }));

                const mergedMaps = maps.docs.map(doc => {
                    const mapId: string = doc.id;
                    const data = doc.data() as MapStrategies;

                    const strategiesData = strategiesLookup.filter(s => s.mapId == mapId);

                    return DateUtils.autoConvertFirestoreTimestamps({
                        ...data,
                        strategies: strategiesData ?? []
                    } as MapStrategies);
                });

                const mapsWithStrategies = mergedMaps.filter(map => ObjectUtils.hasData(map.strategies));

                return mapsWithStrategies.sort((a, b) =>
                    a.mapName.localeCompare(b.mapName)
                );
            })
        );
    }

    getAllStrategies(): Observable<Strategy[]> {
        const strategiesCollection = collection(this.firestore, 'Strategies');
        const mapsCollection = collection(this.firestore, 'Maps');

        return forkJoin({
            spawns: from(getDocs(strategiesCollection)),
            maps: from(getDocs(mapsCollection))
        }).pipe(
            map(({ spawns, maps }) => {
                const mapsLookup: Map[] = maps.docs.map(doc => ({
                    mapId: doc.id,
                    ...(doc.data() as Map)
                }));

                const merged: Strategy[] = spawns.docs.map(doc => {
                    const data: Strategy = doc.data() as Strategy;
                    const mapData: Map = mapsLookup.find(ml => ml.mapId == data.mapId);

                    return DateUtils.autoConvertFirestoreTimestamps({
                        ...data,
                        strategyId: doc.id,
                        mapName: mapData?.mapName ?? ''
                    } as Strategy);
                });

                return merged.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
            })
        );
    }

    getStrategy(strategyId: string): Observable<Strategy> {
        const stategyDocRef = doc(this.firestore, `Strategies/${strategyId}`);

        return from(getDoc(stategyDocRef)).pipe(
            map(snapshot =>
                snapshot.exists()
                    ? DateUtils.autoConvertFirestoreTimestamps({
                        ...snapshot.data(),
                        strategyId: snapshot.id
                    } as Strategy)
                    : null as any
            )
        );
    }

    insertStrategy(strategy: Strategy): Observable<DocumentReference<Strategy>> {
        const { strategyId, ...insertData } = DateUtils.convertDatesToFirestoreTimestamps(strategy);
        const spawnCollection = collection(this.firestore, 'Strategies') as CollectionReference<Strategy>;
        return from(addDoc(spawnCollection, insertData));
    }

    updateStrategy(strategy: Strategy): Observable<void> {
        const { strategyId, ...updateData } = DateUtils.convertDatesToFirestoreTimestamps(strategy);
        const stategyDocRef = doc(this.firestore, `Strategies/${strategy.strategyId}`);
        return from(updateDoc(stategyDocRef, updateData));
    }

    deleteStrategy(strategyId: string): Observable<void> {
        const stategyDocRef = doc(this.firestore, `Strategies/${strategyId}`);
        return from(deleteDoc(stategyDocRef));
    }
}