export interface MapAlert {
  _id: string;
  description: string;
  arena: string;
  displayName: string;
  priority: string;
  status: string;
  lon: number;
  lat: number;
}

export interface UpdateMapAlert {
  description?: string;
  arena?: string;
  displayName?: string;
  priority?: string;
  lon?: number;
  lat?: number;
  status?: string;
}

export interface AlertsMapProps {
  alerts: MapAlert[];
  height?: number | string;
  className?: string;
}

export interface ResponseMap {
  success: boolean;
  data: MapAlert;
}

export interface createMapAlert {
  description: string;
  arena: string;
  displayName: string;
  priority: string;
  status: string;
  lon: number;
  lat: number;
}
