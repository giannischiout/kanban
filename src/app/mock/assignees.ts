export type IAssignee = {
	id: number;
	firstName: string;
	lastName: string;
	avatarColor: string;
	role: string;
	initials: string;
};

const assigneeColors: Record<string, string> = {
	Ethan: "#c3a60d",
	Sophia: "#1E90FF",
	Liam: "#32CD32",
	Isabella: "#8A2BE2",
	Noah: "#FF4500",
	Ava: "#FFA500",
	Mason: "#FF69B4",
	Olivia: "#4682B4",
	Elijah: "#20B2AA",
	Charlotte: "#A52A2A",
	James: "#17A2B8",
	Emma: "#007BFF",
	Oliver: "#007BFF",
	Mia: "#FFC300"
};

export const mock_assignees: Record<string, IAssignee> = {
	Ethan: { id: 1, firstName: "Ethan", lastName: "Reynolds", avatarColor: assigneeColors.Ethan, role: "Frontend Developer", initials: 'ER' },
	Sophia: { id: 2, firstName: "Sophia", lastName: "Carter", avatarColor: assigneeColors.Sophia, role: "Full Stack Developer", initials: 'SC' },
	Liam: { id: 3, firstName: "Liam", lastName: "Patel", avatarColor: assigneeColors.Liam, role: "Backend Developer", initials: 'LP' },
	Isabella: { id: 4, firstName: "Isabella", lastName: "Nguyen", avatarColor: assigneeColors.Isabella, role: "UI/UX Developer", initials: 'IN' },
	Noah: { id: 5, firstName: "Noah", lastName: "Kim", avatarColor: assigneeColors.Noah, role: "Mobile Developer", initials: 'NK' },
	Ava: { id: 6, firstName: "Ava", lastName: "Martinez", avatarColor: assigneeColors.Ava, role: "Software Engineer", initials: 'AM' },
	Mason: { id: 7, firstName: "Mason", lastName: "Rivera", avatarColor: assigneeColors.Mason, role: "DevOps Engineer", initials: 'MR' },
	Olivia: { id: 8, firstName: "Olivia", lastName: "Hernandez", avatarColor: assigneeColors.Olivia, role: "Cloud Developer", initials: 'OH' },
	Elijah: { id: 9, firstName: "Elijah", lastName: "Gomez", avatarColor: assigneeColors.Elijah, role: "Security Engineer", initials: 'EG' },
	Charlotte: { id: 10, firstName: "Charlotte", lastName: "Bennett", avatarColor: assigneeColors.Charlotte, role: "AI Engineer", initials: 'CB' }
};