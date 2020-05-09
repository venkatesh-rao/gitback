export interface Repository {
  id: number;
  nodeId?: string;
  name: string;
  fullName?: string;
  private?: boolean;
  description?: string | null | undefined;
}

export interface ListAppRepositoriesData {
  listAppRepositories: Repository[];
}
