import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';



/**
 * @swagger
 * /api/movie/{idMovie}:
 *   get:
 *     description: Returns the movies with the [idMovie]
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID movie
 *     responses:
 *       200:
 *         description: Hello Movies
 *       404:
 *         description: Movie's not found
 *       405:
 *         description: Wrong HTTP Method
 *   put:
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID movie
 *     requestBody:
 *       required: true
 *       description: Endpoint for edit a movie
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           description:
 *     responses:
 *       201:
 *         description: Movies infos
 *       404:
 *         description: Movie's not found
 *       405:
 *         description: Wrong HTTP Method
 *   delete:
 *     description: Returns the movies with the [idMovie]
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: ID movie
 *     responses:
 *       200:
 *         description: Hello Movie
 *       404:
 *         description: Movie not found
 *       405:
 *         description: Wrong HTTP Method
 *
 */
export default async function handler(req, res) {
    const { method } = req;
    const { idMovie } = req.query;
    const body = req.body;
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    switch (method) {
        case 'GET':
            const movieFind = await db.collection("movies").findOne({ _id: new ObjectId(idMovie) });
            res.json({ status: 200, data: { movie: movieFind } });
            break;
        case 'PUT':
            const movieEdit = await db.collection("movies").updateOne({ _id: new ObjectId(idMovie) }, { $set: body });
            res.json({ status: 200, data: { movie: movieEdit } });
            break;
        case 'DELETE':
            const movieDel = await db.collection("movies").deleteOne({ _id: new ObjectId(idMovie) });
            res.json({ status: 200, data: { movie: movieDel } });
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
