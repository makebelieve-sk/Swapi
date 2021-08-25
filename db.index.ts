import { Pool } from 'pg'

// Создаем новый экземпляр класса Pool
const pool = new Pool({
    user: 'postgres',
    password: '228228',
    host: 'localhost',
    port: 5432,
    database: 'star_db'
})

export default pool