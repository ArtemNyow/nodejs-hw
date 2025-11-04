import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import {
  createNoteSchema,
  getAllNotesSchema,
  noteIdSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use('/notes', authenticate);
/**
 * @openapi
 * tags:
 *   name: Notes
 *   description: CRUD нотаток
 */
/**
 * @openapi
 * /notes:
 *   get:
 *     summary: Отримати всі нотатки
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Список нотаток
 */
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
/**
 * @openapi
 * /notes/{noteId}:
 *   get:
 *     summary: Отримати нотатку за id
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/NoteId'
 *     responses:
 *       200:
 *         description: Нотатку знайдено
 */
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);

router.post('/notes', celebrate(createNoteSchema), createNote);
/**
 * @openapi
 * /notes/{noteId}:
 *   delete:
 *     summary: Видалити нотатку
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/NoteId'
 *     responses:
 *       200:
 *         description: Нотатку видалено
 */
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);
/**
 * @openapi
 * /notes/{noteId}:
 *   patch:
 *     summary: Оновити нотатку
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/NoteId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateNote'
 *     responses:
 *       200:
 *         description: Нотатку оновлено
 */
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
