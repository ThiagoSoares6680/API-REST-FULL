import User from "../models/user.model";
import db from "../db";
import  DatabaseError  from "../models/erros/database.error.model";



class UserRepository {

    // Consultar todos usuarios

    async findAllUsers():Promise<User[]> {
        const query = `
            SELECT uuid, username
            FROM aplication_user
        `;

        const {rows} = await db.query<User>(query);
        return rows || [];
    }

    // Consultar usurios por ID


    async findById(uuid: string): Promise<User>{
        const query = `
            SELECT uuid, username
            FROM aplication_user
            WHERE uuid = $1
        `;
            const values = [uuid];
            const { rows } = await db.query<User>(query, values);
            const [user] = rows;
            return user;
    }

    //Token 

    async findByUsernameAndPassword(username: string, password: string): Promise< User | null> {
        try{
            const query = `
                SELECT uuid, username
                FROM aplication_user
                WHERE username = $1
                AND password = crypt($2, 'my_salt')
            `;
            const values = [username, password];
            const response = await db.query<User>(query, values);
            const [user] = response.rows;
            return user || null;
        } catch(error) {
            throw new DatabaseError('Erro na consulta por username e passoword', error);
        }

    }

    // Criação de usuarios

    async create(user: User): Promise<string>{
        const script = `
        INSERT INTO aplication_user (
            username,
            password
        )
        VALUES ($1, crypt($2, 'my_salt'))
        RETURNING uuid
        `;
        const values = [user.username, user.password];

        const {rows} =  await db.query<{uuid: string}>(script, values);
        const [newUser] = rows;
        return newUser.uuid;
    }

    // Alteração de usuarios

    async update(user: User): Promise<void>{
        const script = `
        UPDATE aplication_user 
        SET
            username = $1,
            password = crypt($2, 'my_salt')
        WHERE uuid = $3
        
        `;
        const values = [user.username, user.password, user.uuid];
        await db.query(script, values);
    }

    // Remover usuarios

    async remove(uuid: string): Promise<void>{
        const cript = `
        DELETE
        FROM aplication_user
        WHERE uuid = $1
        `;
        const values = [uuid]

        await db.query(cript, values);
    }

}




export default new UserRepository();