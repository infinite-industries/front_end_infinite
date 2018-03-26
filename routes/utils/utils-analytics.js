const sqlite = require('sqlite')
const fs = require('fs')
const dbFilePath = __dirname + '/analytics.sqlite'
let dbCache = null

module.exports =  {
  getDBForAnalytics() {
    const hasSQLDB = () => new Promise((resolve, reject) => {
      fs.stat(dbFilePath, err => {
        if (err && err.code === 'ENOENT') {
          resolve(false)
        } else if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })

    const createTable = () => new Promise(async (resolve, reject) => {
      try {
        const db = await sqlite.open(dbFilePath, { Promise })
        await db.get(
          `CREATE TABLE analytics
					(
					  id INTEGER PRIMARY KEY,
						time_stamp TEXT,
						event_id TEXT,
						calendar_type TEXT,
						user_agent TEXT,
						action_type TEXT,
						view_type TEXT
					);`)
        console.log('created db: ' + db)
        resolve(db)
      } catch (ex) {
        reject(ex)
      }
    })

    return new Promise(async (resolve, reject) => {
      if (dbCache)
        return resolve(dbCache)

      let hasDB = false
      try {
        hasDB = await hasSQLDB()

        if (!hasDB) {
          console.log('create the sqlite db')
          fs.closeSync(fs.openSync(dbFilePath, 'w'))
          const db = await createTable()
          dbCache = db
          resolve(db)
        } else {
          try {
            const db = await sqlite.open(dbFilePath, { Promise })
            dbCache = db
            resolve(db)
          } catch (ex) {
            reject(ex)
          }
        }
      } catch(ex) {
        reject(ex)
      }
    })
  }
}
