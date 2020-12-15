import Sqlite from 'sqlite3';
import Article from '../Model/Article'
const sqlite3 = Sqlite.verbose();
const db = new sqlite3.Database('article');


db.serialize(() => {
    const sql = `
    CREATE TABLE IF NOT EXISTS articles
    (id integer primary key, title, content TEXT)
    `;
    db.run(sql);
});

export default class Articles {
    static all(): Promise<any>{
        return new Promise((reslove,reject)=>{
            db.all('SELECT * FROM articles', (err,data)=>{
                // resolve会返回信息，但是reject不会，会报Internal Server Error
                if(err) return reject(err);
                reslove(data);
            });
        })
    }

    static create(data:Article) {
        const sql = 'INSERT INTO articles(title, content) VALUES (?, ?)';
        return new Promise((reslove,reject)=>{
            db.run(sql, data.title, data.content,(err:Error|null,data:any)=>{
                if(err) return reject(err);
                reslove(data);
            });
        })
    }

    static find(id:number){
        return new Promise((reslove,reject)=>{
            db.get('SELECT * FROM articles WHERE id = ?', id, (err,row)=>{
                if(err) return reject(err);
                reslove(row);
            });
        })
    }

    static delete(id:number){
        return new Promise((reslove,reject)=>{
            db.run('DELETE FROM articles WHERE id = ?', id,(err:Error|null,data:any)=>{
                if(err) return reject(err);
                reslove(data);
            } );
        })
    }

    static update(data:Article){
        return new Promise((reslove,reject)=>{
            db.run('UPDATE articles SET title = ?,content = ? WHERE ID = ?', data.title,data.content,data.id,(err:Error|null,data:any)=>{
                if(err) return reject(err);
                reslove(data);
            } );
        })
    }
}
