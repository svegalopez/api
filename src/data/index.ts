import { config } from './config/db-config';
import { createConnection } from 'typeorm';

export async function connectToDb(): Promise<void> {
    await createConnection(config)
}