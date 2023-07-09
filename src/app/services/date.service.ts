import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DateService {
  formatRelativeTime(date: Date | string | number): string {
    const now = new Date();
    const dateObj = new Date(date);

    const diffInMilliseconds = now.getTime() - dateObj.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

    if (diffInSeconds < 60) {
      return 'Il y a quelques secondes';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    }
  }

}
