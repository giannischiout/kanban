/* eslint-disable @typescript-eslint/no-var-requires */
const { MongoClient } = require("mongodb");
const { faker } = require('@faker-js/faker');

 async function seedEmployees() {
  const uri = "mongodb+srv://john:d7mJfLCPvlt7uH8p@cluster0.v2jex.mongodb.net/kanban";
  const client = new MongoClient(uri, {});

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db("kanban");
    const employeesCollection = db.collection("employees");

    // Drop the collection if it exists
    await employeesCollection.drop().catch(() => console.log("No existing collection to drop"));

    // Create the initial employee (John Chioutakos)
    const initialEmployee = {
      firstName: "John",
      lastName: "Chioutakos",
      avatarColor: faker.color.rgb(),
      email: "johnchiout.dev@gmail.com  ",
      role: "admin",
      position: "Front End Developer",
      department: "Web Development",
      projects: [],
      assignedTasks: []
    };

    // Generate random employees
    const randomEmployees = Array.from({ length: 10 }).map(() => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      avatarColor: faker.color.rgb(),
      email: faker.internet.email(),
      role: faker.helpers.arrayElement(['admin', 'manager', 'member']),
      position: faker.person.jobTitle(),
      department: faker.commerce.department(),
    }))

    // Insert all employees
    await employeesCollection.insertMany([initialEmployee, ...randomEmployees])
    const employees = await employeesCollection.find().toArray();
    console.log(`Inserted ${employees.length} employees`);
    return employees;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

module.exports = { seedEmployees };
