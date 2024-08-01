declare module 'jsmediatags' {
    interface Tag {
        type: string;
        version: string;
        tags: {
            title?: string;
            artist?: string;
            album?: string;
            year?: string;
            genre?: string;
            [key: string]: any;
        };
    }

    interface ReadOptions {
        onSuccess: (tag: { tags: Tag['tags'] }) => void;
        onError: (error: { type: string; info: string }) => void;
    }

    export function read(file: Blob | File, options: ReadOptions): void;
}
