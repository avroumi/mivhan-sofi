export interface MapAlert {
  _id: string;
  description: string;
  arena: string;
  displayName: string;
  priority: string; // בדרך כלל Low, Medium, High או Critical
  status: string;
  lon: number; // קו אורך (longitude)
  lat: number; // קו רוחב (latitude)
}

export interface UpdateMapAlert {
 
  description?: string;
  arena?: string;
  displayName?: string;
  priority?: string; // בדרך כלל Low, Medium, High או Critical
  lon?: number; // קו אורך (longitude)
  lat?: number;
  status?: string;
}

export interface AlertsMapProps {
  alerts: MapAlert[];
  height?: number | string; // ברירת מחדל: 520. למפה חייב להיות גובה מוגדר
  className?: string;
}

export interface ResponseMap {
  success: boolean;
  data: MapAlert | MapAlert[];
}

export interface createMapAlert {
  description: string;
  arena: string;
  displayName: string;
  priority: string; // בדרך כלל Low, Medium, High או Critical
  lon: number; // קו אורך (longitude)
  lat: number; // קו רוחב (latitude)
  status: string;
}
