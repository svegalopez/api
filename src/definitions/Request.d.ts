import { QueryBuilder, SelectQueryBuilder, Repository } from "typeorm";
import { Story } from "../data/entities/Story";

export { }
declare global {
    namespace Express {
        // Extend the Request interface so we can add db access to the express context
        interface Request {
            queryBuilder: SelectQueryBuilder<Story>
            repo: Repository<Story>
        }
    }
}