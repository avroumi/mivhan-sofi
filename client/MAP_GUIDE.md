# מדריך למפה – `AlertsMap`

הקומפוננטה `AlertsMap` מציגה את ההתראות כנקודות על מפה אמיתית של ישראל, באמצעות ספריית [Leaflet](https://leafletjs.com) והעטיפה שלה ל-React, [react-leaflet](https://react-leaflet.js.org). הנקודות **אינן לחיצות**, ומעבר עם העכבר מעל נקודה מציג Tooltip עם שם ההתראה ורמת הדחיפות. נקודות `Critical` גדולות יותר וסביבן טבעת. הקומפוננטה רק מציירת את המערך שהיא מקבלת, ולכן סננו את ההתראות לפני שאתם מעבירים אותן אליה.

## התקנה

```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

הגרסה הנוכחית של `react-leaflet` (v5) דורשת React 19. אם הפרויקט שלכם על React 18, התקינו `react-leaflet@4`.

## קואורדינטות

השדות `lon` ו-`lat` הם קואורדינטות גיאוגרפיות אמיתיות (WGS84):

- `lon` הוא קו אורך (longitude), למשל `34.78` בתל אביב.
- `lat` הוא קו רוחב (latitude), למשל `32.08` בתל אביב.

**שימו לב:** Leaflet מצפה לסדר `[latitude, longitude]`, כלומר `[lat, lon]`. הקומפוננטה כבר מטפלת בכך, אבל אם תשתמשו ב-Leaflet ישירות, זו הטעות הנפוצה ביותר.

## ה-Interface שהקומפוננטה מצפה לקבל

```ts
export interface MapAlert {
  id: string | number;
  displayName: string;
  priority: string; // בדרך כלל Low, Medium, High או Critical
  lon: number; // קו אורך (longitude)
  lat: number; // קו רוחב (latitude)
}

export interface AlertsMapProps {
  alerts: MapAlert[];
  height?: number | string; // ברירת מחדל: 520. למפה חייב להיות גובה מוגדר
  className?: string;
}
```

`MapAlert` רק מתאר אילו שדות המפה קוראת. אין צורך להגדיר אותו אצלכם או להשתמש בו. הקומפוננטה מקבלת כל מערך של אובייקטים שיש בהם לפחות את חמשת השדות האלה, ולכן אפשר להעביר ישירות את מערך ה-`Alert` שהגדרתם בעצמכם, גם אם יש בו שדות נוספים כמו `description`, `arena`, `status` ו-`createdAt`. כמה דברים שכדאי לדעת:

- שמות השדות צריכים להיות בדיוק `id`, `displayName`, `priority`, `lon` ו-`lat`.
- `priority` יכול להיות מוגדר אצלכם כ-`string` או כאחד מארבעת הערכים. נקודה עם ערך אחר תוצג באפור.
- `id` יכול להיות מחרוזת או מספר.
- אם השדות אצלכם נקראים אחרת, למשל `x` ו-`y`, המירו אותם לפני ההעברה:

```tsx
<AlertsMap alerts={alerts.map((a) => ({ ...a, lon: a.x, lat: a.y }))} />
```

## דוגמת שימוש

```tsx
import AlertsMap from "../components/AlertsMap";
import { useAlertsStore } from "../store/alertsStore";

export default function HomePage() {
  const alerts = useAlertsStore((state) => state.alerts);

  return <AlertsMap alerts={alerts} height={600} />;
}
```

## 20 הנקודות

להלן 20 מיקומים אמיתיים עם הקואורדינטות שלהם. צרו התראה אחת לכל מיקום והזינו אותן למערכת. את `displayName`, `description`, `priority` ו-`status` בחרו בעצמכם (מומלץ לגוון ביניהם), ואת `arena` ו-`lon` ו-`lat` קחו מהטבלה.

| מיקום       | פיקוד  | lon (אורך) | lat (רוחב) |
| ----------- | ------ | ---------- | ---------- |
| מטולה       | North  | 35.5786    | 33.2806    |
| קריית שמונה | North  | 35.5697    | 33.2075    |
| שלומי       | North  | 35.1461    | 33.0761    |
| נהריה       | North  | 35.0947    | 33.0058    |
| צפת         | North  | 35.496     | 32.9646    |
| חיפה        | North  | 34.9896    | 32.794     |
| קצרין       | North  | 35.69      | 32.993     |
| נתניה       | Center | 34.8532    | 32.3215    |
| כפר סבא     | Center | 34.9066    | 32.175     |
| תל אביב     | Center | 34.7818    | 32.0853    |
| נתב"ג       | Center | 34.8854    | 32.0055    |
| ירושלים     | Center | 35.2137    | 31.7683    |
| מודיעין     | Center | 35.0104    | 31.8969    |
| שדרות       | South  | 34.5953    | 31.5253    |
| נחל עוז     | South  | 34.4936    | 31.4742    |
| אשקלון      | South  | 34.5743    | 31.6688    |
| באר שבע     | South  | 34.7915    | 31.253     |
| דימונה      | South  | 35.0326    | 31.0703    |
| מצפה רמון   | South  | 34.8008    | 30.6097    |
| אילת        | South  | 34.9519    | 29.5577    |

## טיפים

- אם המפה לא מופיעה או מוצגת כפסים אפורים, בדקו שיובא `leaflet/dist/leaflet.css` (הקומפוננטה עושה זאת בעצמה) ושלמפה יש גובה.
- אם ההתראות מופיעות בים או במקום לא צפוי, כנראה החלפתם בין `lon` ל-`lat`.
- אם נקודה לא מופיעה, בדקו ש-`lon` ו-`lat` הם מספרים ולא מחרוזות. אם היא מופיעה באפור, ה-`priority` שלה אינו אחד מארבעת הערכים Low, Medium, High ו-Critical.
- המפה טוענת אריחים מהאינטרנט (OpenStreetMap), ולכן נדרש חיבור לרשת.
