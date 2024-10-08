const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const argon2 = require("argon2");
require("dotenv").config();

const Seller = require("./models/Seller");
const Client = require("./models/Client");
const Report = require("./models/Report");

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    seedDatabase();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const seedDatabase = async () => {
  try {
    await Seller.deleteMany({});
    await Client.deleteMany({});
    await Report.deleteMany({});

    ///Creation du compte admin/////////////////////////////////////////////
    const hashingOptions = {
      type: argon2.argon2id,
      memoryCost: 19 * 2 ** 10,
      timeCost: 2,
      parallelism: 1,
    };

    const hash = await argon2.hash("!!Clorigay11", hashingOptions);
    const admin = new Seller({
      name: "Tristan",
      email: "tristanlaroye@hotmail.com",
      phone: "0612345678",
      password: hash,
      isAdmin: true,
    });
    await admin.save();

    /////////////////////////////////////////////////////////////////////////

    const sellers = [];
    for (let i = 0; i < 5; i++) {
      const seller = new Seller({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        password: hash,
        isAdmin: false,
      });
      sellers.push(seller);
      await seller.save();
    }

    const clients = [];
    for (let i = 0; i < 30; i++) {
      const client = new Client({
        name: faker.company.name(),
        address: faker.address.streetAddress(),
        contact: faker.name.fullName(),
      });
      clients.push(client);
      await client.save();
    }

    for (let i = 0; i < 40; i++) {
      const report = new Report({
        seller: sellers[faker.datatype.number({ min: 0, max: sellers.length - 1 })]._id,
        client: clients[faker.datatype.number({ min: 0, max: clients.length - 1 })]._id,
        visitDate: faker.date.past(),
        reportText: faker.lorem.paragraphs({ min: 5, max: 15 }),
        orderDetails: {
          articlesOrdered: faker.datatype.number({ min: 1, max: 100 }),
          revenueGenerated: faker.finance.amount(100, 10000, 2),
        },
        nextVisit: {
          expectedDate: faker.date.future(),
          expectedArticles: faker.datatype.number({ min: 1, max: 100 }),
          expectedRevenue: faker.finance.amount(100, 10000, 2),
        },
      });
      await report.save();
    }

    console.log("Database seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding the database", error);
  }
};
