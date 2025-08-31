export interface Refresh {
  fetchMessage: (refresh?: boolean) => Promise<void>;
  isLoading: boolean;
}