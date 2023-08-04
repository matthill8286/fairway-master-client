// LoggerObserver.ts
import { AuthObserver } from "./AuthObserver";

export class LoggerObserver implements AuthObserver {
  onTokenSet(accessToken: string | null): void {
    if (accessToken) {
      console.log("Access token set:", accessToken);
    } else {
      console.log("Access token removed.");
    }
  }
}
