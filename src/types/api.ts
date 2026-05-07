import type { User } from './entities';

/* API RESPONSE */
// generic wrapper  - all API responses follow { status, message, data }
export interface ApiResponse<T> {
    status: 'success' | 'error';
    message: string;
    data: T | null;
}

/* DTO RESPONSE */
// auth response  - { user: { id, name, email }, token }
export interface AuthData {
    user: User;
    token: string;
}


/* DTO REQUESTS */
// payloads sent to the API
export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface NotePayload {
    text: string;
    tag_id: number;
}

export interface TagPayload {
    name: string;
}

