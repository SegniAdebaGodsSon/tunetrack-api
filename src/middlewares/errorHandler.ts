import { Request, Response, NextFunction } from 'express';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    // Handle SyntaxError for invalid JSON
    if (err instanceof SyntaxError && err.message.includes('JSON')) {
        return res.status(400).json({ error: 'Invalid JSON' });
    }

    console.error("errorHandler middleware: ", err.message);

    res.status(500).json({ error: 'Internal Server Error' });
}

export default errorHandler;
