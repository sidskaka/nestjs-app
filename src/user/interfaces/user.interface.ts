import * as mongoose from 'mongoose';

export interface User extends Document {
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly products: object,
    readonly created_at: Date;
}