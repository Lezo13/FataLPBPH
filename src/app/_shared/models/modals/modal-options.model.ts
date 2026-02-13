export interface ModalOptions {
    title?: string;
    confirmText?: string;
    declineText?: string;
    message?: string;
    result?: boolean;
}

export interface PlayerFormModalOptions extends ModalOptions {
    playerId?: string;
}

export interface MatchFormModalOptions extends ModalOptions {
    matchId?: string;
}

export interface SpawnPointFormModalOptions extends ModalOptions {
    spawnPointId?: string;
}

export interface MapFormModalOptions extends ModalOptions {
    mapId?: string;
}