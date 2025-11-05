export interface InvitationCode {
  inviteCode?: string;
  expirationDate: Date;
  isUsed?: boolean;
  createdBy: string;
  
  // Fe use only
  isLoading?: boolean;
}