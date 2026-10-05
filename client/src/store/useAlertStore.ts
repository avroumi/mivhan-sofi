import { create } from "zustand";
import type { MapAlert, UpdateMapAlert } from "../types/MapTypes";

interface AlertStore {
  alerts: MapAlert[];
  setAlerts: (alerts: MapAlert[]) => void;
  add: (alert: MapAlert) => void;
  delete: (_id: string) => void;
  update: (_id: string, alert: UpdateMapAlert) => void;
}

const useAlertStore = create<AlertStore>((set) => ({
  alerts: [],
  setAlerts: (alerts: MapAlert[]) => set({ alerts }),
  add: (alert: MapAlert) =>
    set((state) => ({
      alerts: [...state.alerts, alert],
    })),
  delete: (_id: string) =>
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert._id !== _id),
    })),
  update: (_id, alert: UpdateMapAlert) =>
    set((state) => ({
      alerts: state.alerts.map((al) =>
        al._id === _id ? { ...al, ...alert } : al,
      ),
    })),
}));

export default useAlertStore;
