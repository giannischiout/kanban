/* eslint-disable @typescript-eslint/no-var-requires */

const { MongoClient } = require('mongodb')
const { seedEmployees } = require('./employees');
const { seedProjects } = require('./projects');
const {seedTasks} = require('./tasks')
async function seedDB() {
  // Connection URL
  const uri = "mongodb+srv://john:d7mJfLCPvlt7uH8p@cluster0.v2jex.mongodb.net/kanban";
  const client = new MongoClient(uri, {});
  try {
    const db = client.db("kanban");
    //
    const employees = await seedEmployees()
    const projects = await seedProjects()
    const collaborators = employees.slice(1).map((employee) => employee._id);

    //seed tasks:
    const tasks = await seedTasks( projects[0], employees[0], collaborators )

    // add tasks to the correct project column:
    const projectsCollection = db.collection("projects");
    const updatePromises = tasks.map((task) =>
      projectsCollection.updateOne(
        { _id: task.projectId, "columns._id": task.columnId },
        { $addToSet: { "columns.$.taskIds": task._id } }
      )
    );

    await Promise.all(updatePromises);
  } catch (e) {
    console.log(e)
  }
}

seedDB()