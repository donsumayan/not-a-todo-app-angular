export type SetupQueryOptions = Partial<
  { name: string } & Omit<SetupResponse, 'data'>
>;

export interface SetupResponse {
  data: Setup[];
  page: number;
  pageSize: number;
  count: number;
}

export interface Setup {
  id: number;
  name: string;
  description: string;
  plannerType: PlannerType;
  externalSystemConfig: ExternalSystemConfig;
  triggers: Trigger[];
  funds: Fund[];
  sources: Run[];
  runs: Run[];
  reports: Report[];
}

export enum ExternalSystemConfig {
  ConfigA = 'config-a',
  ConfigB = 'config-b',
}

export interface Fund {
  id: number;
  name: string;
  alias: string;
}

export enum PlannerType {
  NonSpecific = 'non-specific',
  Specific = 'specific',
}

export interface Report {
  id: number;
  name: string;
  type: Run;
}

export interface Run {
  id: number;
  name: string;
}

export enum Trigger {
  Reports = 'reports',
  Runs = 'runs',
  Sources = 'sources',
}
