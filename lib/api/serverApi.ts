import { cookies } from "next/headers";
import { NextServer } from "./api";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    "http://localhost:3000"
  );
}

// fetch notes
export const fetchServerNotes = async (page: number, perPage: number, search?: string, tag?: string): Promise<Note[]> => {
  const cookieStore = await cookies();
  const baseUrl = getBaseUrl();

  const res = await NextServer.get(`${baseUrl}/api/notes`, {
    params: { page, perPage, search, tag },
    headers: { Cookie: cookieStore.toString() },
  });

  return res.data;
};

// fetch note by id
export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const baseUrl = getBaseUrl();

  const res = await NextServer.get(`${baseUrl}/api/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });

  return res.data;
};

// session
export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const baseUrl = getBaseUrl();

  const res = await NextServer.get(`${baseUrl}/api/auth/session`, {
    headers: { Cookie: cookieStore.toString() },
  });

  return res; 
};

// me
export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const baseUrl = getBaseUrl();

  const res = await NextServer.get(`${baseUrl}/api/users/me`, {
    headers: { Cookie: cookieStore.toString() },
  });

  return res.data;
};
