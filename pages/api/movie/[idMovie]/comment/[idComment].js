import clientPromise from "../../../../../lib/mongodb";
import { ObjectId } from "mongodb";



/**
 * @swagger
 * /api/movie/[idMovie]/comment/{idComment}:
 *   get:
 *     description: Returns the movies with the [idComment]
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: ID comment
 *     responses:
 *       200:
 *         description: Hello Comments
 *       404:
 *         description: Comment not found
 *       405:
 *         description: Wrong HTTP Method
 *   put:
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: ID comment
 *     requestBody:
 *       required: true
 *       description: Endpoint for edit a comment
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           description:
 *     responses:
 *       201:
 *         description: Comment infos
 *       404:
 *         description: Comment not found
 *       405:
 *         description: Wrong HTTP Method
 *   delete:
 *     description: Returns the movies with the [idComment]
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: ID comment
 *     responses:
 *       200:
 *         description: Hello Comments
 *       404:
 *         description: Comment not found
 *       405:
 *         description: Wrong HTTP Method
 *
 */

export default async function handler(req, res) {
    const { method } = req;
    const { idComment } = req.query;
    const body = req.body;
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    switch (method) {
        case 'GET':
            const commentFind = await db.collection("comments").findOne({ _id: new ObjectId(idComment) });
            res.json({ status: 200, data: { comment: commentFind } });
            break;
        case 'PUT':
            const commentEdit = await db.collection("comments").updateOne({ _id: new ObjectId(idComment) }, { $set: body });
            res.json({ status: 200, data: { comment: commentEdit } });
            break;
        case 'DELETE':
            const commentDel = await db.collection("comments").deleteOne({ _id: new ObjectId(idComment) });
            res.json({ status: 200, data: { comment: commentDel } });
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
