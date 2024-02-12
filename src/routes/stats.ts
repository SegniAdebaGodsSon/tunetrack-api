import express, { Request, Response } from 'express';
import { Song, ISong } from '../models/song';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const totalSongs = await Song.countDocuments();
        const totalArtists = await Song.aggregate([
            { $group: { _id: '$artist' } },
            { $group: { _id: null, count: { $sum: 1 } } }
        ]).then((result: { count: number }[]) => result[0]?.count || 0);

        const totalAlbums = await Song.aggregate([
            { $group: { _id: '$album' } },
            { $group: { _id: null, count: { $sum: 1 } } }
        ]).then((result: { count: number }[]) => result[0]?.count || 0);

        const totalGenres = await Song.aggregate([
            { $group: { _id: '$genre' } },
            { $group: { _id: null, count: { $sum: 1 } } }
        ]).then((result: { count: number }[]) => result[0]?.count || 0);


        const songsInGenres = await Song.aggregate([
            { $group: { _id: '$genre', count: { $sum: 1 } } }
        ]);

        const songsPerArtist = await Song.aggregate([
            { $group: { _id: '$artist', count: { $sum: 1 } } }
        ]);

        const songsPerAlbum = await Song.aggregate([
            { $group: { _id: '$album', count: { $sum: 1 } } }
        ]);

        res.json({
            totalSongs,
            totalArtists,
            totalAlbums,
            totalGenres,
            songsInGenres,
            songsPerArtist,
            songsPerAlbum
        });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
});

export default router;
