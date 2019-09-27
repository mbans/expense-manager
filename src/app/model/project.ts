import { Expense } from './expense';
import { AppUser } from './user';

export interface Project {
    uid?: string;
    name: string;
    expenses: Expense[];
    owner: string;          // owner id
    users: string[];
    // users: [ {
    //         emailAddress: string,
    //         admin: boolean          // do they have admin rights for this project
    // }];
}

