// AuthObserver.ts
interface AuthObserver {
  onTokenSet(accessToken: string): void;
  accessToken: string | null;
}

export type { AuthObserver };
