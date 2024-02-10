import { Router, Request, Response, } from "express";
import mongoose from "mongoose";
import { ISong, Song, validatePost, validatePatch } from '../models/song';

const router = Router();

// create song
router.post('/', async (req: Request, res: Response) => {
    const { title, artist, album, genre } = req.body;

    if (title == undefined || artist == undefined || album == undefined || genre == undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const { error, value } = validatePost(req.body);

    if (error) return res.status(400).json({ error: error.message });

    const song = new Song({ ...value })

    try {
        let mongooseValidationError = song.validateSync()
        if (mongooseValidationError) return res.status(400).json({ error: mongooseValidationError.message });

        await song.save()
        return res.status(201).json({ song })

    } catch (err) {
        console.error("post route: ", err);
        return res.status(500).json({ message: "Internal server error" });
    }

})

// get one song
router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" })

    try {
        const song = await Song.findById(id);
        if (!song) return res.status(404).json({ error: 'Song not found' });
        return res.send({ song });

    } catch (err) {
        console.error("get one song route: ", err);
        return res.status(500).json({ error: "Internal server error" });
    }
})

// get songs
router.get('/', async (req: Request, res: Response) => {
    const { page = 1, pageSize = 10, search = '', genre = '' } = req.query;

    const query: { $or?: object[], genre?: string } = {};

    if (search && typeof search == "string") {
        query.$or = [
            { title: { $regex: search.trim(), $options: 'i' } },
            { artist: { $regex: search.trim(), $options: 'i' } },
            { album: { $regex: search.trim(), $options: 'i' } }
        ];
    }

    if (genre) {
        if (typeof genre == "string") query.genre = genre;
        else return res.status(400).json({ error: "genre can only be a string" })
    }

    if (Number.isNaN(Number(page)) || Number.isNaN(Number(pageSize))) {
        return res.status(400).json({ error: "page and pageSize can only be integer numbers" })
    }

    try {
        const totalCount = await Song.countDocuments(query);
        const songs = await Song.find(query)
            .skip((Number(page) - 1) * Number(pageSize))
            .limit(Number(pageSize));

        return res.json({
            page: Number(page),
            pageSize: Number(pageSize),
            totalCount,
            songs
        });
    } catch (err) {
        console.error("get song route: ", err);
        return res.status(500).json({ error: "Internal server error" });
    }

})

// update song
router.patch('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" })

    const { error, value } = validatePatch(req.body);
    if (error) return res.status(400).json({ error: error.message });

    try {
        const song = await Song.findByIdAndUpdate(id, req.body, { new: true });

        if (!song) return res.status(404).json({ error: "Song not found" });

        return res.send({ song });
    } catch (err) {
        console.error("patch song route: ", err);
        return res.status(500).json({ error: "Internal server error" });
    }
})

// delete song
router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json("Invalid ID")

    try {
        const song = await Song.findById(id);
        if (!song) return res.status(404).json({ error: "Song not found" });
        await song.deleteOne()

        return res.status(204).json({ message: "Song successsfully deleted" });

    } catch (err) {
        console.error("delete song route: ", err);
        return res.status(500).json({ error: "Internal server error" });
    }

})

export default router;