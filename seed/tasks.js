/* eslint-disable @typescript-eslint/no-var-requires */

const { MongoClient } = require('mongodb')
const { Types } = require('mongoose')

const getRandomCollaborators = (collaborators, count) => {
  const shuffled = [...collaborators].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedTasks = async (project, assignee, collaborators) => {
  const uri = 'mongodb+srv://john:d7mJfLCPvlt7uH8p@cluster0.v2jex.mongodb.net/kanban'
  const client = new MongoClient(uri, {})
  const tasks = [
    {
      title: 'Design Dashboard UI',
      description: 'Create the visual design for the front-end dashboard, focusing on user experience and clean layout.',
      priority: 'high',
      startDate: '2025-03-01',
      dueDate: '2025-03-05',
      projectId: project._id,
      columnId: project.columns[0]._id,
      order: 1,
      assignedTo: assignee._id,
      collaborators: getRandomCollaborators(collaborators, 2) ,
      attachments: [],
      comments: [
        {
          userId: getRandomElement(collaborators),
          text: 'Initial design layout is being created.',
          createdAt: new Date(),
        },
      ],
      subtasks: [],
      tags: ['UI', 'Design'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Set Up Data Visualization Components',
      description: 'Implement data visualization components such as charts, graphs, and tables to display analytics data.',
      priority: 'medium',
      startDate: '2025-03-06',
      dueDate: '2025-03-10',
      projectId: project._id,
      columnId: project.columns[1]._id,
      order: 2,
      assignedTo: assignee._id,
      collaborators: getRandomCollaborators(collaborators, 2),
      attachments: [],
      comments: [],
      subtasks: [],
      tags: ['Data Visualization'],
    },
    {
      title: 'Develop API Integration for Data Fetching',
      description: 'Build the integration for fetching analytics data from the back-end API and display it on the dashboard.',
      priority: 'high',
      startDate: '2025-03-06',
      dueDate: '2025-03-12',
      projectId: project._id,
      columnId: project.columns[1]._id,
      order: 3,
      assignedTo: assignee._id,
      collaborators: getRandomCollaborators(collaborators, 1),
      attachments: [],
      comments: [],
      subtasks: [],
      tags: ['API', 'Backend'],
    },
    {
      title: 'Implement User Authentication',
      description: 'Add user authentication features, allowing users to log in and view personalized analytics data.',
      priority: 'medium',
      startDate: '2025-03-11',
      dueDate: '2025-03-15',
      projectId: project._id,
      columnId: project.columns[2]._id, // Done column
      order: 4,
      assignedTo: assignee._id,
      collaborators: getRandomCollaborators(collaborators, 3),
      attachments: [],
      comments: [],
      subtasks: [],
      tags: ['Authentication'],
    },
    {
      title: 'Conduct Cross-Browser Testing',
      description: 'Test the dashboard on multiple browsers to ensure compatibility and fix any display issues.',
      priority: 'low',
      startDate: '2025-03-16',
      dueDate: '2025-03-18',
      projectId: project._id,
      columnId: project.columns[2]._id,
      order: 5,
      assignedTo: assignee._id,
      collaborators: getRandomCollaborators(collaborators, 2),
      attachments: [],
      comments: [],
      subtasks: [],
      tags: ['Testing'],
    },
  ]
  try {
    const db = client.db('kanban')
    const taskCollection = db.collection('tasks')
    await taskCollection.drop().catch(() => console.log('No existing collection to drop'))
    await taskCollection.insertMany(tasks)
    return taskCollection.find().toArray()
  } catch (e) {
    console.error('error in tasks: ', e)
  }
}

module.exports = { seedTasks }