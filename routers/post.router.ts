// Make sure the delete route is correct in the backend
import {Router} from "express";
import {PostRecord} from "../records/post.record";

export const postRouter = Router()

	.get('/search/:name?', async (req, res) => {
		const posts = await PostRecord.findAll(req.params.name ?? '');

		res.json(posts);
	})
	//:id musi być pod /search/:name żeby nie łapało 'search' jako id
	.get('/:id', async (req, res) => {
		const post = await PostRecord.findOne(req.params.id);
		res.json(post);
	})

	.post('/:id', async (req, res) => {
		const post = new PostRecord(req.body);
		await post.insert();
		res.json(post);
	})

	.post('/', async (req, res) => {
		try {
			const post = new PostRecord(req.body);
			await post.insert();
			res.json(post);
		} catch (error) {
			console.error('Error saving post:', error);
			res.status(500).json({error: 'Failed to save post'});
		}
	});