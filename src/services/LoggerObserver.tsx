// LoggerObserver.ts
import { AuthObserver } from "./AuthObserver";

export class LoggerObserver implements AuthObserver {
  accessToken: string | null = null;
  onTokenSet(accessToken: string | null): void {
    if (accessToken) {
      console.log("Access token set:", accessToken);
      this.accessToken = accessToken;
    } else {
      console.log("Access token removed.");
      this.accessToken = null;
    }
  }
}
