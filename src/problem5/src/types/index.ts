export interface IBookmark {
    url: string; // The bookmarked URL
    title: string; // Title of the bookmark
    tags?: string[]; // Optional tags for categorization
    createdAt: Date; // Timestamp of when the bookmark was created
    updatedAt: Date; // Timestamp of when the bookmark was last updated
}