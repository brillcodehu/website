// Countdown to 23:59:59 of the current day
export function getCountdownEnd(): Date {
  const now = new Date();
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );
  return endOfDay;
}

export function formatCountdown(endTime: Date): {
  hours: string;
  minutes: string;
  seconds: string;
  expired: boolean;
} {
  const now = Date.now();
  const diff = endTime.getTime() - now;

  if (diff <= 0) {
    return { hours: "00", minutes: "00", seconds: "00", expired: true };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
    expired: false,
  };
}

// Random capacity between 1-3 on each page load (no persistence)
export function getRandomCapacity(): number {
  return Math.floor(Math.random() * 3) + 1;
}
