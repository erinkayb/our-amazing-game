module.exports = {
  port: process.env.PORT || 8081,

  db: {
    database: process.env.DB_NAME || 'ourgame', //name of database
    user: process.env.DB_USER || 'ourgame',
    password: process.env.DB_PASS || 'ourgame',
    options: {
        // tells what type of database connecting to
      dialect: process.env.DIALECT || 'sqlite',
       // location of database
      host: process.env.HOST || 'localhost',
      // where to store blogapp files
      storage: './ourgame.sqlite'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
