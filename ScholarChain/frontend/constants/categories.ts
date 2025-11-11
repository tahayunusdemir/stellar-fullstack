// Academic achievement categories used throughout the application
export const ACHIEVEMENT_CATEGORIES = [
  'Participation',
  'Homework',
  'Exam',
  'Project'
] as const;

export type AchievementCategory = typeof ACHIEVEMENT_CATEGORIES[number];

// Category colors for visual representation
export const CATEGORY_COLORS: Record<AchievementCategory, string> = {
  Participation: '#10B981',
  Homework: '#3B82F6',
  Exam: '#8B5CF6',
  Project: '#F59E0B',
};

// Category descriptions
export const CATEGORY_DESCRIPTIONS: Record<AchievementCategory, string> = {
  Participation: 'Class participation',
  Homework: 'Homework completion',
  Exam: 'Exam success',
  Project: 'Project submission',
};

