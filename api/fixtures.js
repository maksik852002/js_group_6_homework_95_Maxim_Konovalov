const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Coctail = require('./models/Coctail');
const nanoid = require("nanoid");

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, admin] = await User.create({
    username: 'user',
    password: '123',
    token: nanoid(),
    displayName: 'Пользователь'
  }, {
    username: 'admin',
    password: '123',
    role: 'admin',
    token: nanoid(),
    displayName: 'Администратор'
  });

  await Coctail.create({
    published: false,
    name: 'Lemon Shot',
    user: user,
    recipe: 'Mix Galliano and Absolut Citron in a shot glass, lay lemon wedge sprinkled with sugar over glass and pour a rum over wedge and glass. light rum with a lighter and let burn for a second. Do shot quickly and suck on lemon. If it is done correctly, this will taste like a shot of sweet lemonade.',
    "ingredients" : [
      {
        "ingName" : "Galliano",
        "amount" : "1/2oz"
      },
      {
        "ingName" : "Absolut citron",
        "amount" : "1/2oz"
      },
      {
        "ingName" : "Lemon",
        "amount" : "wedge"
      },
      {
        "ingName" : "Sugar",
        "amount" : "pinch"
      },
      {
        "ingName" : "151 proof rum",
        "amount" : "1/2oz"
      },
    ],
    image: 'uploads/fixtures/lemonShot.jpg',
  }, {
    published: false,
    name: 'Sex on the Beach ',
    user: user,
    recipe: 'Build all ingredients in a highball glass filled with ice. Garnish with orange slice.',
    "ingredients" : [
      {
        "ingName" : "Vodka",
        "amount" : "1 oz"
      },
      {
        "ingName" : "Peach Schnapps",
        "amount" : "3/4oz"
      },
      {
        "ingName" : "Cranberry Juice",
        "amount" : "some"
      },
      {
        "ingName" : "Grapefruit Juice",
        "amount" : "some"
      },
    ],
    image: 'uploads/fixtures/sexOnTheBeach.jpg',
  }, {
    published: true,  
    name: 'Loch Lomond',
    user: admin,
    recipe: 'In a mixing glass half-filled with ice cubes, combine the Scotch, Drambuie, and vermouth. Stir well. Strain into a cocktail glass. Garnish with the lemon twist.',
    "ingredients" : [
      {
        "ingName" : "Scotch",
        "amount" : "2 oz"
      },
      {
        "ingName" : "Drambuie",
        "amount" : "1/2oz"
      },
      {
        "ingName" : "Dry Vermouth",
        "amount" : "1/2oz"
      },
      {
        "ingName" : "Lemon Peel",
        "amount" : "1 twist of"
      },
    ],
    image: 'uploads/fixtures/lochLomond.jpg',
  }, {
    published: true,  
    name: 'Martini',
    user: user,
    recipe: 'Straight: Pour all ingredients into mixing glass with ice cubes. Stir well. Strain in chilled martini cocktail glass. Squeeze oil from lemon peel onto the drink, or garnish with olive.',
    "ingredients" : [
      {
        "ingName" : "Gin",
        "amount" : "1 2/3 oz"
      },
      {
        "ingName" : "Dry Vermouth",
        "amount" : "1/3 oz"
      },
      {
        "ingName" : "Olive",
        "amount" : "1pc"
      },
    ],
    image: 'uploads/fixtures/martitni.jpg',
  });

  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});
