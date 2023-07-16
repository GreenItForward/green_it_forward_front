import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DateService {
  formatRelativeTime(date: Date | string | number, startWord: string): string {
    const now = new Date();
    const dateObj = new Date(date);
    let diffInMilliseconds = dateObj.getTime() - now.getTime();
  
    const isFuture = diffInMilliseconds >= 0;
    if (!isFuture) {
      diffInMilliseconds = now.getTime() - dateObj.getTime();
    }

    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);

    if (!startWord) {
      startWord = 'Il y a';
    }

    if (diffInSeconds < 60) {
      return `${startWord} quelques secondes`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${startWord} ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${startWord} ${hours} heure${hours > 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${startWord} ${days} jour${days > 1 ? 's' : ''}`;
    }
  }
  
}