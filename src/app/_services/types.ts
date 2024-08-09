export type Response<T = any> = { data: T[] } & PageOptions;

export interface PageOptions {
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
  type: ReportType;
}

export type ReportType = Run;
export type Source = Run;

export interface Run {
  id: number;
  name: string;
}

export enum Trigger {
  Reports = 'reports',
  Runs = 'runs',
  Sources = 'sources',
}
