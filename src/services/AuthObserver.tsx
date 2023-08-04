// AuthObserver.ts
interface AuthObserver {
  onTokenSet(accessToken: string): void;
}

export type { AuthObserver };
