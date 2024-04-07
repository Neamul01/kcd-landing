import { create } from "zustand";

interface TimerStore {
  timeLeft: number | null;
  timerFinished: boolean;
  intervalId: NodeJS.Timeout | null;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  formatTime: (time: number) => string;
  setTimeLeft: (time: number | null) => void;
  setTimerFinished: (finished: boolean) => void;
}

export const useTimerStore = create<TimerStore>((set) => ({
  timeLeft: null,
  timerFinished: false,
  intervalId: null,
  startTimer: () => {
    const initialTime = 15 * 60; // 15 minutes in seconds
    let currentTime = initialTime;
    const intervalId = setInterval(() => {
      currentTime--;
      if (currentTime <= 0) {
        clearInterval(intervalId);
        set({ timerFinished: true });
        console.log("Time is up!");
      } else {
        set((state) => ({ ...state, timeLeft: currentTime }));
      }
    }, 1000);
    set((state) => ({ ...state, timeLeft: initialTime, intervalId }));
  },
  stopTimer: () => {
    set((state) => {
      if (state.intervalId) {
        clearInterval(state.intervalId);
        return { ...state, intervalId: null };
      }
      return state;
    });
  },
  resetTimer: () => {
    set((state) => {
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      return {
        ...state,
        timeLeft: null,
        timerFinished: false,
        intervalId: null,
      };
    });
  },
  formatTime: (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  },
  setTimeLeft: (time: number | null) =>
    set((state) => ({ ...state, timeLeft: time })),
  setTimerFinished: (finished: boolean) =>
    set((state) => ({ ...state, timerFinished: finished })),
}));
