import clientPromise from "../../lib/mongodb";

/**
 * @swagger
 * /api/movies:
 *   get:
 *     description: Returns all movies
 *     responses:
 *       200:
 *         description: Hello Movies
 *       405:
 *         description: Wrong HTTP Method
 *   post:
 *     requestBody:
 *       description: Endpoint for adding a movie
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Movies infos
 *       405:
 *         description: Wrong HTTP Method
 *
 */
export default async function handler(req, res) {
    const { method } = req;
    const body = req.body;
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    switch (method) {
        case 'GET':
            const moviesFind = await db.collection("movies").find({}).limit(10).toArray();
            res.json({ status: 200, data: moviesFind });
            break;
        case 'POST':
            const movieCreate = await db.collection("movies").insertOne({ plot: body });
            res.json({ status: 200, data: { movie: movieCreate } });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
