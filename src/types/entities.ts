// domain entities — mirrors Laravel models fields

/* USER */
export interface User {
    id: number;
    name: string;
    email: string;
}

/* TAG */
export interface Tag {
    id: number;
    user_id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

/* NOTE */
export interface Note {
    id: number;
    user_id: number;
    tag_id: number;
    text: string;
    created_at: string;
    updated_at: string;
}
