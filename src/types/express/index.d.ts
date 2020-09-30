import { v4 as uuid } from 'uuid';
import { UserInterface } from '../../models/user';

declare global{
    namespace Express {
        interface Request {
            api_id: String,
            user: UserInterface
        }
    }
}
