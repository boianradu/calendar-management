/*
import { CalendarController } from '../components/calendar/calendar.controller';
import { CalendarService } from '../components/calendar/calendar.service';
import { Request, Response, NextFunction } from 'express';
import { mock } from 'jest-mock-extended';

jest.mock('./calendar.service');

describe('CalendarController', () => {
    let calendarService: CalendarService;
    let calendarController: CalendarController;
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        calendarService = new CalendarService();
        calendarController = new CalendarController(calendarService);
        req = mock<Request>();
        res = mock<Response>();
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('createCalendar', () => {
        it('should create a new calendar', async () => {
            const calendar = { name: 'Test Calendar' };
            req.body = calendar;

            await calendarController.createCalendar(req, res, next);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(calendar);
        });

        it('should return an error if the service throws an error', async () => {
            const error = new Error('Test error');
            jest.spyOn(calendarService, 'createCalendar').mockRejectedValue(error);

            await calendarController.createCalendar(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getCalendar', () => {
        it('should get a calendar by id', async () => {
            const calendarId = 1;
            const calendar = { id: calendarId, name: 'Test Calendar' };
            req.params.id = calendarId.toString();

            calendarController.getCalendar(req, res, next);

            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(calendar);
        });

        it('should return an error if the service throws an error', async () => {
            const error = new Error('Test error');
            jest.spyOn(calendarService, 'getCalendar').mockRejectedValue(error);

            await calendarController.getCalendar(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

});

*/