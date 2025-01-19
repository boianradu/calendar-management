import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { Calendar } from './calendar.model';
import { Request, Response, NextFunction } from 'express';
import { HttpCode } from '../../utils/constants';
import { PrismaClient } from '@prisma/client';


jest.mock('./calendar.service'); // Mock the CalendarService class

describe('CalendarController', () => {
    let calendarController: CalendarController;
    let calendarService: jest.Mocked<CalendarService>;
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;
    const prisma = new PrismaClient();

    beforeAll(async () => {
        await prisma.$connect();
    });
    beforeEach(() => {
        calendarService = new CalendarService() as jest.Mocked<CalendarService>;
        calendarController = new CalendarController(calendarService);

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

    describe('createCalendar', () => {
        it('should create a calendar and return the response', async () => {
            req.body.name = 'Valid Name';
            calendarService.createCalendar.mockResolvedValue(1); // Returning just the id, as per the type.

            await calendarController.createCalendar(req as Request, res as Response, next);

            expect(calendarService.createCalendar).toHaveBeenCalledWith('Valid Name', expect.any(Date));
            expect(res.status).toHaveBeenCalledWith(HttpCode.CREATED);
            expect(res.json).toHaveBeenCalledWith(1); // Matching the expected return value.
        });
    });

    describe('getCalendar', () => {
        it('should return an error if the calendarId is invalid', async () => {
            req.body.calendarId = 'invalidId';
            await calendarController.getCalendar(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(new Error('Invalid calendar id'));
        });

        it("should return a calendar if it exists", async () => {
            req.body.calendarId = 1;

            // Mocking a Calendar object
            const mockCalendar: Calendar = new Calendar("Test Calendar");
            mockCalendar.setId(1);
            calendarService.getCalendar.mockResolvedValueOnce(mockCalendar);

            await calendarController.getCalendar(req as Request, res as Response, next);

            expect(calendarService.getCalendar).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockCalendar);
        });
    });


    describe('updateCalendarName', () => {
        it('should return an error if the name is invalid', async () => {
            req.body.name = 'Invalid@Name';
            req.body.calendarId = 1;
            await calendarController.updateCalendarName(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(new Error('Invalid calendarName'));
        });

        it('should update the calendar name', async () => {
            req.body.name = 'Updated Name';
            req.body.calendarId = 1;
            const updatedCalendar: Calendar = new Calendar("Updated Name")
            updatedCalendar.setId(1);
            calendarService.updateCalendarName.mockResolvedValue(1);

            await calendarController.updateCalendarName(req as Request, res as Response, next);

            expect(calendarService.updateCalendarName).toHaveBeenCalledWith(1, 'Updated Name');
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(updatedCalendar.getId());
        });
    });

    describe('deleteCalendar', () => {
        it('should return an error if the calendarId is invalid', async () => {
            req.body.calendarId = 'invalidId';
            await calendarController.deleteCalendar(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(new Error('Invalid calendar id'));
        });

        it('should delete the calendar', async () => {
            req.body.calendarId = 1;
            calendarService.deleteCalendar.mockResolvedValue(true);

            await calendarController.deleteCalendar(req as Request, res as Response, next);

            expect(calendarService.deleteCalendar).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(true);
        });
    });
});
