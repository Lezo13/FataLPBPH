export interface CurrentStateData {
  portalId: number;
  dashboard: DashboardStateData;
}

export interface DashboardStateData {
  adminCollapsed: boolean;
  programsCoordinatorCollapsed: boolean;
  communityManagerCollapsed: boolean;
  portalCollapsed: boolean;
  rewardsCoordinatorCollapsed: boolean;
  rewardsValidatorCollapsed: boolean;
  rewardsManagerCollapsed: boolean;
  rewardsManagementCollapsed: boolean;
  coachCollapsed: boolean;
}

