declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: string;
            DB_HOST?: 'localhost';
            NODE_ENV?: 'development' | 'production' | 'test';
            OPENAI_API_KEY?: string;
            // Add other custom environment variables here
        }
    }
}