const { MongoClient } = require('mongodb');

class Mongo {
    constructor() {
        const DB_URL = process.env.DB_URL || 'mongodb://mongodb:27017/Cookmaster';
        const OPTIONS = {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      };

        this.client = new MongoClient(DB_URL, OPTIONS);
    }

    async main() {
        const DB_NAME = 'Cookmaster';
        
        await this.client.connect();

        console.log('Connected to MongoDB');

        this.db = this.client.db(DB_NAME);
    }
}

module.exports = new Mongo();