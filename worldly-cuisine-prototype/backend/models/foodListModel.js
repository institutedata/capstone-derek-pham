const database = require('../services/database');

class FoodListModel {
    constructor() {
      this.foodItems = [
        {
            name: 'Takoyaki',
            origin: 'Japan',
            thumbnailURL: '//upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Takoyaki.jpg/150px-Takoyaki.jpg',
            foodDescription: 'Japanese appetizer',        
            articleURL: 'https://en.wikipedia.org/wiki/takoyaki',
            isoCode: 'jp'
        },
        {
            name: 'Okonomiyaki',
            origin: 'Japan',
            thumbnailURL: '//upload.wikimedia.org/wikipedia/commons/thumb/5/59/Okonomiyaki_001.jpg/150px-Okonomiyaki_001.jpg',
            foodDescription: 'Japanese savory pancake',   
            articleURL: 'https://en.wikipedia.org/wiki/Okonomiyaki',
            isoCode: 'jp'
        },
        {
            name: 'Taco',
            origin: 'Mexico',
            thumbnailURL: '//upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/150px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg',
            foodDescription: 'Mexican filled tortilla food',
            articleURL: 'https://en.wikipedia.org/wiki/Taco',
            isoCode: 'mx'
        },
        {
            name: 'Nachos',
            origin: 'Mexico',
            thumbnailURL: '//upload.wikimedia.org/wikipedia/commons/thumb/8/87/Nachos-cheese.jpg/150px-Nachos-cheese.jpg',
            foodDescription: 'Tortilla chip dish',        
            articleURL: 'https://en.wikipedia.org/wiki/Nachos',
            isoCode: 'mx'
        },
        {
            name: 'Pizza',
            origin: 'Italy',
            thumbnailURL: '//upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/150px-Pizza-3007395.jpg',
            foodDescription: 'Italian dish with a flat dough-based base and toppings',
            articleURL: 'https://en.wikipedia.org/wiki/pizza',
            isoCode: 'it'
        },
      ]
    }
  
    async getFoodItems() {
        const db = database.getDb();
        const items = await db.collection('foodData').find({}).toArray();
        // console.log(items)
        return items
    }
  
    async addFoodItem(newItem) {
      const db = database.getDb();
      const items = await db.collection('foodData').find({}).toArray();
      const records = await db.collection('foodDataRecord').find({}).toArray();
      
      const isDuplicate = items.some(item => item.name === newItem.name);
      const isRecordDuplicate = records.some(item => item.name === newItem.name);

      let result = { added: false, message: '' };
      
      if (!isDuplicate) {
        console.log('Adding new item:', newItem.name);
        await db.collection('foodData').insertOne(newItem);
        result.added = true;
        result.message = 'New item added successfully.';
    } else {
        console.log('Item already exists:', newItem.name);
        result.message = 'Item already exists.';
    }

      if (!isRecordDuplicate) {
        console.log('Adding new item to record:', newItem.name);
        await db.collection('foodDataRecord').insertOne(newItem)
      } else {
          console.log('Item already exists in record:', newItem.name);
      }
      // console.log(this.foodItems)

      return result
    }
  
    async removeFoodItem(itemName) {
      const db = database.getDb();
      await db.collection('foodData').deleteOne({name:itemName})

      // this.foodItems = this.foodItems.filter(item => item.name !== itemName);
      // console.log(this.foodItems)
    }
}
  
module.exports = new FoodListModel();
  