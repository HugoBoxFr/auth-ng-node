import { User } from './../models/user';
import { MysqlConnection } from './../loaders/mysql';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
export class UsersRepository {

    private static instance: UsersRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'user';

    static getInstance() {
        if (!this.instance) {
            this.instance = new UsersRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve one user by its id in parameter. 
     * Return the user found in a promise.
     * @param id user id
     */
    findByEmail(email: string): Promise<User> {
      return this.connection.query(`SELECT * FROM ${this.table} WHERE email = ?`, [email])
        .then((results: any) => new User(results[0]));
    }

    /**
     * Make a query to the database to retrieve all Users and return it in a promise.
     */
    findAll(): Promise<User[]> {
        return this.connection.query(`SELECT * from ${this.table}`)
          .then((results: any) => {
            return results.map((user: any) => new User(user));
          });
    }

    /**
     * Make a query to the database to retrieve one User by its id in parameter. 
     * Return the User found in a promise.
     * @param id User id
     */
    findById(id: number): Promise<User> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new User(results[0]));
    }


    /**
     * Make a query to the database to insert a new User and return the created User in a promise.
     * @param User User to create
     */
    insert(user: User) {
      return this.connection.query(
        `INSERT INTO ${this.table} (email, password, role) VALUES (?,?,?)`,
        [user.email, user.password, user.role]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing User and return the updated User in a promise.
     * @param User User to update
     */
    update(user: User) {
      return this.connection.query(
        `UPDATE ${this.table} SET email = ?, password = ?, role = ? WHERE id = ?`,
        [user.email, user.password, user.role]
      ).then(() => {
        return this.findById(user.id);
      });
    }

    /**
     * Make a query to the database to delete an existing User and return an empry promise
     * @param id User id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}
