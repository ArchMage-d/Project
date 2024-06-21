import {NewPostEntity, PostEntity, SimplePostEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

type PostRecordResults = [PostEntity[], FieldPacket[]];

export class PostRecord implements PostEntity {
	public id: string;
	public name: string;
	public description: string;

	constructor(obj: NewPostEntity) {
		if (!obj.name || obj.name.length > 100) {
			throw new ValidationError("Name of the post shouldn't be empty or longer than 100 chars.")
		}

		if (obj.description.length > 1000) {
			throw new ValidationError("Content of the post shouldn't be longer than 1000 chars.");
		}

		this.id = obj.id;
		this.name = obj.name;
		this.description = obj.description;
	}

	static async findOne(id: string): Promise<PostRecord | null> {
		const [result] = await pool.execute("SELECT * FROM `posts` WHERE id = :id", {
			id,
		}) as PostRecordResults;
		return result.length === 0 ? null : new PostRecord(result[0]);
	}

	static async findAll(name: string): Promise<SimplePostEntity[]> {
		const [results] = await pool.execute("SELECT * FROM `posts` WHERE `name` LIKE :search", {
			search: `%${name}%`
		}) as PostRecordResults;

		return results.map(result => {
			const {
				id
			} = result;
			return {
				id
			}
        });
    }

    async insert() {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert that is already inserted')
        }

	    await pool.execute("INSERT INTO `posts`(`id`,`name`,`description`) VALUES(:id, :name, :description)", this);
    }
}
