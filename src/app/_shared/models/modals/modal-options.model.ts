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