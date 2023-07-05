import express from 'express';

import { deleteUser, getAllUsers, updateUser } from '../controllers/users';
import { isAuthenicated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    router.get('/users',isAuthenicated, getAllUsers);
    router.patch('/users/:id', isAuthenicated, isOwner, updateUser)
    router.delete('/users/:id', isAuthenicated, isOwner, deleteUser);
}