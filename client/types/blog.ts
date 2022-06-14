export interface ICommentBlog {
    _id: string;
    userId: string;
    username: string;
    avatar: string;
    text: string;
    rating: number;
}

export interface IBlog {
    _id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    seo: string;
    like: number;
    dislike: number;
    comments: ICommentBlog[];
}

export interface BlogState {
    blogs: IBlog[];
    error: string;
}

export enum BlogActionTypes {
    FETCH_BLOGS = 'FETCH_BLOGS',
    DELETE_BLOGS = 'DELETE_BLOGS',
    FETCH_BLOGS_ERROR = 'FETCH_BLOGS_ERROR'
}

interface FetchBlogAction {
    type: BlogActionTypes.FETCH_BLOGS;
    payload: IBlog[]
}

interface DeleteBlogAction {
    type: BlogActionTypes.DELETE_BLOGS;
    payload: IBlog[]
}

interface FetchBlogErrorAction {
    type: BlogActionTypes.FETCH_BLOGS_ERROR;
    payload: string
}

export type BlogAction = FetchBlogAction | DeleteBlogAction | FetchBlogErrorAction
