export interface Category {
    id: number;
    name: string;
    description?: string;
}

export interface Location {
    id: number;
    name: string;
    description?: string;
}

export interface Item {
    id: number;
    category_id: number;
    location_id: number;
    name: string;
    description?: string;
    photo?: string;
    created_at: string;
}

export type ItemMutation = {
    category_id: number;
    location_id: number;
    name: string;
    description?: string;
    photo?: string;
}
