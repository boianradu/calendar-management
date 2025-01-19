import { CalendarEntryController } from './calendar-entry.controller';
import { CalendarEntryService } from './calendar-entry.service';
import { Request, Response, NextFunction } from 'express';
import { HttpCode } from '../../utils/constants';
import { CalendarEntry } from './calendar-entry.model';
import { PrismaClient } from '@prisma/client';

jest.mock('./calendar-entry.service');

describe('CalendarEntryController', () => {
    let calendarEntryController: CalendarEntryController;
    let calendarEntryService: jest.Mocked<CalendarEntryService>;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;
    const prisma = new PrismaClient();

    beforeAll(async () => {
        await prisma.$connect();
    });

    beforeEach(() => {
        calendarEntryService = new CalendarEntryService() as jest.Mocked<CalendarEntryService>;
        calendarEntryController = new CalendarEntryController(calendarEntryService);

        req = {
            body: {},
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        next = jest.fn();
    });

    afterAll(async () => {
        try {
            await prisma.$disconnect();
        } catch (error) {
            console.error('Error disconnecting from Prisma:', error);
        }
    });

    describe('createCalendarEntry', () => {
        it('should create a new calendar entry', async () => {
            const dateEntry: Date = new Date();
            const calendarEntryData: CalendarEntry = new CalendarEntry('Entry 1', dateEntry, 60);
            calendarEntryData.id_calendar = 1;
            calendarEntryData.setId(1);
            req.body = {}
            req.body.title = "Entry 1";
            req.body.start = dateEntry.toISOString();
            req.body.duration = 60;
            req.params = {};
            req.params.calendarId = calendarEntryData.id_calendar.toString();

            calendarEntryService.createCalendarEntry.mockResolvedValue(1);

            await calendarEntryController.createCalendarEntry(req as Request, res as Response, next);

            expect(calendarEntryService.createCalendarEntry).toHaveBeenCalledWith("Entry 1", dateEntry, 60, calendarEntryData.id_calendar);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(1);
        });

        it('should return an error if the calendar entry data is invalid', async () => {
            const calendarEntryData = {
                title: '',
                start: new Date(),
                duration: 60,
                calendarId: 1,
                id_calendar: 1
            };
            req.body = calendarEntryData;
            req.params = {};
            req.params.calendarId = calendarEntryData.id_calendar.toString();
            await expect(calendarEntryController.createCalendarEntry(req as Request, res as Response, next)).rejects.toThrow('Invalid title');

        });
    });

    // describe('getCalendarEntries', () => {
    //     it('should retrieve a list of calendar entries', async () => {
    //         const calendarId = "1";
    //         req.body.calendarId = calendarId;
    //         const ce1: CalendarEntry = new CalendarEntry('Entry 1', new Date(), 60);
    //         const ce2: CalendarEntry = new CalendarEntry('Entry 2', new Date(), 75);
    //         calendarEntryService.getCalendarEntries.mockResolvedValue([ce1, ce2]);

    //         await calendarEntryController.getCalendarEntries(req as Request, res as Response, next);

    //         expect(calendarEntryService.getCalendarEntries).toHaveBeenCalledWith(calendarId);
    //         expect(res.status).toHaveBeenCalledWith(200);
    //         expect(res.json).toHaveBeenCalledWith([{ id: 1, title: 'Entry 1' }]);
    //     });

    //     it('should return an error if the calendar ID is invalid', async () => {
    //         const calendarId = 'invalidId';
    //         req.body.calendarId = calendarId;

    //         await calendarEntryController.getCalendarEntries(req as Request, res as Response, next);

    //         expect(next).toHaveBeenCalledWith(new Error('Invalid calendar ID'));
    //     });
    // });

    // describe('updateCalendarEntry', () => {
    //     it('should update a calendar entry', async () => {
    //         const entryId = 1;
    //         const updates = { title: 'Updated Entry' };
    //         req.body.entryId = entryId;
    //         req.body = updates;
    //         const ce1: CalendarEntry = new CalendarEntry('Entry 1', new Date(), 60);
    //         calendarEntryService.updateCalendarEntry.mockResolvedValue(ce1);

    //         await calendarEntryController.updateCalendarEntry(req as Request, res as Response, next);

    //         expect(calendarEntryService.updateCalendarEntry).toHaveBeenCalledWith(entryId, updates);
    //         expect(res.status).toHaveBeenCalledWith(200);
    //         expect(res.json).toHaveBeenCalledWith({ id: 1, title: 'Updated Entry' });
    //     });

    //     it('should return an error if the entry ID is invalid', async () => {
    //         const entryId = 'invalidId';
    //         req.body.entryId = entryId;

    //         await calendarEntryController.updateCalendarEntry(req as Request, res as Response, next);

    //         expect(next).toHaveBeenCalledWith(new Error('Invalid entry ID'));
    //     });
    // });

    // describe('deleteCalendarEntry', () => {
    //     it('should delete a calendar entry', async () => {
    //         const entryId = 1;
    //         req.body.entryId = entryId;

    //         const ce1: CalendarEntry = new CalendarEntry('Entry 1', new Date(), 60);
    //         calendarEntryService.deleteCalendarEntry.mockResolvedValue(ce1);

    //         await calendarEntryController.deleteCalendarEntry(req as Request, res as Response, next);

    //         expect(calendarEntryService.deleteCalendarEntry).toHaveBeenCalledWith(entryId);
    //         expect(res.status).toHaveBeenCalledWith(204);
    //         expect(res.send).toHaveBeenCalledTimes(1);
    //     });

    //     it('should return an error if the entry ID is invalid', async () => {
    //         const entryId = 'invalidId';
    //         req.body.entryId = entryId;

    //         await calendarEntryController.deleteCalendarEntry(req as Request, res as Response, next);

    //         expect(next).toHaveBeenCalledWith(new Error('Invalid entry ID'));
    //     });
    // });
});