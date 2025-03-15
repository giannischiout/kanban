/* eslint-disable @typescript-eslint/no-var-requires */

const { MongoClient,  ObjectId } = require("mongodb");
const { faker } = require('@faker-js/faker');

async function seedProjects() {
  const uri = "mongodb+srv://john:d7mJfLCPvlt7uH8p@cluster0.v2jex.mongodb.net/kanban";
  const client = new MongoClient(uri, {});

  try {
    await client.connect();
    console.log("Connected to server");

    const db = client.db("kanban");
    const projectsCollection = db.collection("projects");

    // Drop the collection if it exists
    await projectsCollection.drop().catch(() => console.log("No existing collection to drop"));

    const projects = [
      {
        name: "Front-end Dashboard",
        slug: "front-end-dashboard",
        description: "A modern front-end dashboard for analytics.",
        status: "pending",
        color: '#FF9671',
        startDate: new Date(),
        columns: [
          { _id: new ObjectId(), name: "Todo", color: "#FF6B6B", taskIds: [] },
          { _id: new ObjectId(), name: "In Progress", color: "#FFD93D", taskIds: [] },
          { _id: new ObjectId(), name: "Done", color: "#6BCB77", taskIds: [] },
        ],
      },
      {
        name: "Marketing Website Redesign",
        slug: "marketing-website-redesign",
        description: "Revamping the front-end for the company website.",
        status: "pending",
        startDate: faker.date.past(),
        endDate: faker.date.future(),
        color: '#845EC2',
        columns: [
          {_id: new ObjectId(), name: "Design", color: "#845EC2", taskIds: [] },
          {_id: new ObjectId(), name: "Development", color: "#D65DB1", taskIds: [] },
          {_id: new ObjectId(), name: "QA", color: "#FF9671", taskIds: [] },
        ],
      },
      {
        name: "E-commerce UI",
        slug: "e-commerce-ui",
        description: "Building a responsive front-end for an e-commerce app.",
        status: "pending",
        color: '#D65DB1',
        startDate: faker.date.past(),
        columns: [
          {_id: new ObjectId(), name: "Planning", color: "#FF6F61", taskIds: [] },
          {_id: new ObjectId(), name: "Implementation", color: "#FF9A76", taskIds: [] },
          {_id: new ObjectId(), name: "Review", color: "#8FC1E3", taskIds: [] },
        ],
      }
    ];

    const result = await projectsCollection.insertMany(projects);
    console.log("Projects inserted:", result.insertedIds);
    return await projectsCollection.find().toArray();
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

module.exports = { seedProjects };
