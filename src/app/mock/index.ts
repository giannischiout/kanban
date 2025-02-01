import {mock_assignees} from "@/app/mock/assignees";

export const TASKS = {
	"task-1": {
		id: "task-1",
		title: "Design Homepage Layout",
		description: "Create a wireframe and UI design for the new homepage layout.",
		priority: "high",
		color: "#FF5733", // Red-orange
		comments: 2,
		attachments: 2,
		contributors: [mock_assignees.Ethan, mock_assignees.Sophia]
	},
	"task-2": {
		id: "task-2",
		title: "Fix Login Bug",
		description: "Investigate and resolve the login authentication issue for returning users.",
		priority: "medium",
		color: "#FFC300", // Yellow
		comments: 2,
		attachments: 4,
		contributors: [mock_assignees.Ethan, mock_assignees.Ava]
	},
	"task-3": {
		id: "task-3",
		title: "Optimize Database Queries",
		description: "Improve database queries to enhance app performance and reduce load times.",
		priority: "medium",
		color: "#28A745", // Green
		comments: 2,
		attachments: 4,
		contributors: [mock_assignees.Charlotte, mock_assignees.Liam]
	},
	"task-4": {
		id: "task-4",
		title: "Develop User Profile Page",
		description: "Create a user profile page with editable fields and profile picture upload.",
		priority: "high",
		color: "#007BFF", // Blue
		comments: 3,
		attachments: 2,
		contributors:  [mock_assignees.Elijah, mock_assignees.Olivia]
	},
	"task-5": {
		id: "task-5",
		title: "Write API Documentation",
		description: "Document the authentication, user, and payment APIs with examples.",
		priority: "low",
		color: "#6C757D", // Gray
		comments: 1,
		attachments: 3,
		contributors:  [mock_assignees.Ava]

	},
	"task-6": {
		id: "task-6",
		title: "Implement Dark Mode",
		description: "Allow users to switch between light and dark themes.",
		priority: "medium",
		color: "#343A40", // Dark Gray
		comments: 2,
		attachments: 1,
		contributors: [mock_assignees.Isabella]
	},
	"task-7": {
		id: "task-7",
		title: "Set Up CI/CD Pipeline",
		description: "Automate the deployment process using GitHub Actions and Docker.",
		priority: "high",
		color: "#17A2B8", // Cyan
		comments: 4,
		attachments: 2,
		contributors: [mock_assignees.Isabella, mock_assignees.Liam, mock_assignees.Noah,  mock_assignees.Mason]

	}
}


export const DETAILED_TASKS = {
	"task-1": {
		...TASKS['task-1'],
		status: "open",
		color: "#FF5733",
		dueDate: "2024-10-05",
		createdAt: "2024-09-20",
		updatedAt: "2024-09-22",
		comments: [
			{ ...mock_assignees.Ethan, text: 'Do not forget to increase the LOGO'  },
			{ ...mock_assignees.Ethan,  text: "Don't forget to make the CTA buttons prominent."  },
		],
		attachments: [
			{ id: 501, name: "wireframe.png", url: "/files/wireframe.png" },
			{ id: 502, name: "design.docx", url: "/files/design.docx" }
		],
		contributors: [mock_assignees.Ethan, mock_assignees.Sophia]	},
	"task-2": {
		...TASKS['task-2'],
		status: "progress",
		color: "#FFC300",
		dueDate: "2024-10-02",
		createdAt: "2024-09-18",
		updatedAt: "2024-09-21",
		comments: [
			{ ...mock_assignees.Ethan, text: 'Do not forget to increase the LOGO'  },
			{ ...mock_assignees.Ava,  text: "Don't forget to make the CTA buttons prominent."  },
		],
		attachments: [
			{ id: 503, name: "error-log.txt", url: "/files/error-log.txt" }
		],
		contributors: [mock_assignees.Ethan, mock_assignees.Ava]
	},
	"task-3": {
		...TASKS['task-3'],
		status: "done",
		color: "#28A745",
		dueDate: "2024-09-30",
		createdAt: "2024-09-15",
		updatedAt: "2024-09-29",
		comments: [
			{ ...mock_assignees.Charlote, text: 'Do not forget to increase the LOGO'  },
			{ ...mock_assignees.Liam,  text: "Don't forget to make the CTA buttons prominent."  },
		],
		attachments: [],
		contributors: [mock_assignees.Charlote, mock_assignees.Liam]
	},
	"task-4": {
		...TASKS['task-4'],
		status: "open",
		color: "#007BFF",
		dueDate: "2024-10-08",
		createdAt: "2024-09-25",
		updatedAt: "2024-09-28",
		comments: [
			{ ...mock_assignees.Elija, text: 'Do not forget to increase the LOGO'  },
			{ ...mock_assignees.Olivia,  text: "Don't forget to make the CTA buttons prominent."  },
		],
		attachments: [
			{ id: 504, name: "profile-design.png", url: "/files/profile-design.png" }
		],
		contributors:  [mock_assignees.Elija, mock_assignees.Olivia]

	},
	"task-5": {
		...TASKS['task-5'],
		status: "progress",
		color: "#6C757D",
		dueDate: "2024-10-10",
		createdAt: "2024-09-22",
		updatedAt: "2024-09-29",
		comments: [{ ...mock_assignees.Ava, text: 'Do not forget to increase the LOGO'  },],
		attachments: [
			{ id: 505, name: "api-docs-draft.md", url: "/files/api-docs-draft.md" }
		],
		contributors:  [mock_assignees.Ava]
	},
	"task-6": {
		...TASKS['task-6'],
		status: "done",
		color: "#343A40",
		dueDate: "2024-10-01",
		createdAt: "2024-09-15",
		updatedAt: "2024-09-30",
		comments: [
			{ ...mock_assignees.Isabell, text: 'Do not forget to increase the LOGO'  },
		],
		attachments: [],
		contributors: [mock_assignees.Isabella]	},
	"task-7": {
		...TASKS['task-7'],
		status: "open",
		color: "#17A2B8",
		dueDate: "2024-10-12",
		createdAt: "2024-09-27",
		updatedAt: "2024-09-29",
		comments: [
			{ ...mock_assignees.Isabella, text: 'Do not forget to increase the LOGO'  },
			{ ...mock_assignees.Liam,  text: "Don't forget to make the CTA buttons prominent."  },
			{ ...mock_assignees.Noah,  text: "I am almost done. Just a few refactors"  },
		],
		attachments: [
			{ id: 506, name: "ci-cd-config.yaml", url: "/files/ci-cd-config.yaml" }
		],
		contributors: [mock_assignees.Isabella, mock_assignees.Liam, mock_assignees.Noah]
	}
}


export const INITIAL_KANBAN_STATE = {
	columns: {
		'open': {
			id: 'open',
			color: 'yellow',
			title: 'open',
			taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
		},
		'progress': {
			id: 'progress',
			color: 'orange',
			title: 'progress',
			taskIds: ['task-5', 'task-6']
		},
		'done': {
			id: 'done',
			title: 'done',
			color: 'green',
			taskIds: ['task-7']
		}
	},
	tasks: TASKS,
	columnOrder: ["open", "progress", "done"]
}










