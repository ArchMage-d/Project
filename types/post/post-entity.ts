export interface NewPostEntity extends Omit<PostEntity, 'id'> {
	id?: string;
}

export interface SimplePostEntity {
	id: string;
}

export interface PostEntity extends SimplePostEntity {
	name: string;
	description: string;
}
