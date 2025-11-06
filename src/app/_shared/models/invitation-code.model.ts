export interface InvitationCode {
  inviteCode?: string;
  expirationDate: Date;
  isUsed?: boolean;
  createdBy: string;
  usedBy?: string;
  
  // Fe use only
  isLoading?: boolean;
}