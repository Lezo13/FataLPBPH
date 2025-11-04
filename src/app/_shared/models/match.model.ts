export interface Match {
  matchId?: string;
  matchStartDate: Date;
  matchEndDate: Date;
  matchFormat: string;
  matchPhase: string;
  tournamentName: string;
  teamOneName: string;
  teamOneLogoUrl?: string;
  teamOneScore: number;
  teamTwoName: string;
  teamTwoLogoUrl?: string;
  teamTwoScore: number;
  matchStatus?: string;
  vodUrl?: string;

  //Fe use only
  isLoading?: boolean;
}