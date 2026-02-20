export interface ModalOptions {
    title?: string;
    confirmText?: string;
    declineText?: string;
    message?: string;
    result?: boolean;
}

export interface ContentWindowModalOptions extends ModalOptions {
    content?: string;
}

export interface PlayerFormModalOptions extends ModalOptions {
    playerId?: string;
}

export interface UserFormModalOptions extends ModalOptions {
    username?: string;
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

export interface StrategyFormModalOptions extends ModalOptions {
    strategyId?: string;
}