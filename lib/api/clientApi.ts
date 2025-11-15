import type { Note } from "@/types/note";
import { NextServer } from "./api";
import { User } from "@/types/user";

// ===== TYPES =====
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface requestBodyData {
  title: string;
  content: string;
  tag: string;
}

export type registerRequest = {
  email: string;
  password: string;
};

interface UpdateMeRequest {
  username: string;
}

type CheckSessionRequest = {
  success: boolean;
};

// ===== NOTES =====
export const fetchNotes = async (
  page: number,
  perPage: number,
  search?: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const res = await NextServer.get<FetchNotesResponse>("/api/notes", {
    params: { page, perPage, search: search ?? "", tag: tag ?? "" },
  });
  return res.data;
};

export const getSingleNote = async (id: string): Promise<Note> => {
  const res = await NextServer.get<Note>(`/api/notes/${id}`);
  return res.data;
};

export const createNote = async (requestBody: requestBodyData): Promise<Note> => {
  const res = await NextServer.post<Note>("/api/notes", requestBody);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await NextServer.delete<Note>(`/api/notes/${id}`);
  return res.data;
};

// ===== AUTH =====
export const register = async (data: registerRequest): Promise<User> => {
  const res = await NextServer.post("/api/auth/register", data);
  return res.data;
};

export const login = async (data: registerRequest): Promise<User> => {
  const res = await NextServer.post("/api/auth/login", data);
  return res.data;
};

export const checkSession = async (): Promise<boolean> => {
  try {
    const res = await NextServer.get<CheckSessionRequest>("/api/auth/session");
    return res.data.success;
  } catch (error) {
    
    return false;
  }
};

export const logout = async (): Promise<void> => {
  await NextServer.post("/api/auth/logout");
};

// ===== ME =====
export const getMe = async (): Promise<User> => {
  const res = await NextServer.get<User>("/api/users/me");
  return res.data;
};

export const updateMe = async (dataUser: UpdateMeRequest): Promise<User> => {
  const res = await NextServer.patch("/api/users/me", dataUser);
  return res.data;
};
