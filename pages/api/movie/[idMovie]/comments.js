import clientPromise from "../../../../lib/mongodb";


/**
 * @swagger
 * /api/movie/[idMovie]/comments:
 *   get:
 *     description: Returns all comments
 *     responses:
 *       200:
 *         description: Hello comments
 *       405:
 *         description: Wrong HTTP Method
 *   post:
 *     requestBody:
 *       description: Endpoint for adding a comment
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: comment infos
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
            const commentsFind = await db.collection("comments").find({}).limit(10).toArray();
            res.json({ status: 200, data: commentsFind });
            break;
        case 'POST':
            const commentCreate = await db.collection("comments").insertOne({ plot: body });
            res.json({ status: 200, data: { comment: commentCreate } });
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
