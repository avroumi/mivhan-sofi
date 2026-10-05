TZOFIA EYE Project: Final Assessment

This project currently implements basic CRUD functionality for both the frontend and backend. It allows users to add alerts to the map and manage them (Create, Read, Update, Delete) with ease.

Technologies used and rationale:

Backend:

-- MongoDB (database): Chosen for its flexibility and ease of use, especially since relational links weren't required and future requirements are uncertain; it offers flexibility and better control over the implementation.

-- Zod (validation): Chosen for balancing flexibility with rigorous validation.

CORS, Helmet, Express, dotenv, etc.

Frontend:

React, react-router-dom, Axios, Zustand (included to facilitate future scaling, even if not strictly necessary right now).

Project structure and flow:

The frontend is divided into three pages:

HomePage: Displays the map and allows filtering by name.

InformationPage: Provides detailed views of alerts and allows adding new ones.

CurrentInformation: Focuses on a specific alert, enabling update and delete operations.

Rationale for division: Better code management and separation of concerns.

Flow:

Example: Create => Form/Submit => axios.create / useAlertApi => API request (dynamic API handler) => Backend HTTP => Route => Zod middleware => Controller => Service => Repository => MongoDB => Response => useAlertApi (using Zustand for state management) => Update data on the page.

Status codes:

400/422: Invalid data

401: Unauthorized

403: Forbidden

404: Not found

409: Duplicate

500: Server error Defined

Error response:
All responses follow this format:
{
success: bool,
data: {data} or error
}
The `errorHandler` middleware handles errors optimally, returning the most precise or relevant error.

On the frontend, `axios.error` (or the default error handler) manages displaying the error or logging it to the console as needed.
