import express from 'express';

import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../db/users';

export const isAuthenicated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['sessionToken'];
        if (!sessionToken) {
            return res.sendStatus(401);
        }
        const user = await getUserBySessionToken(sessionToken);
        if (!user) {
            return res.sendStatus(401);
        }
        merge(req, { identity: user });

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(401);
    }
    }

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string
        if (!currentUserId) {
            return res.sendStatus(403);
        }
        if (currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(401);
    }
}    