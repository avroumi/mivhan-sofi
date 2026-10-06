export interface User {
  id: string;
  username: string;
  email: string;
  assignedArea: "North" | "South" | "Center" | "All";
  role: "arena_user" | "general_user" | "admin";
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  username: string;
  email: string;
  assignedArea: "North" | "South" | "Center" | "All";
  role: "arena_user" | "general_user" | "admin";
  password: string;
}

export interface ResponseUserMe {
  success: boolean;
  data: { user: User };
}
export interface ResponseLoginRegister {
  success: boolean;
  data: { user: User; token: string };
}

export interface ResponseAllUser {
  success: boolean;
  data: { user: User[] };
}
