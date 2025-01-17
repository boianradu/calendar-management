// // calendar.controller.spec.ts
// import { CalendarController } from '../components/calendar/calendar.controller';
// import { CalendarService } from '../components/calendar/calendar.service';
// import { Request, Response, NextFunction } from 'express';
// import { mock } from 'jest-mock-extended';
// import { PrismaClient } from '@prisma/client';
// describe('CalendarController', () => {
//     let calendarService: jest.Mocked<CalendarService>;
//     let calendarController: CalendarController;
//     let mockRequest: Partial<Request>;
//     let mockResponse: Partial<Response>;
//     let mockNext: jest.Mock;

//     beforeEach(() => {
//         calendarService = {
//             createCalendar: jest.fn(),
//             getCalendar: jest.fn(),
//             updateCalendarName: jest.fn(),
//             deleteCalendar: jest.fn(),
//         } as jest.Mocked<CalendarService>;

//         calendarController = new CalendarController(calendarService);

//         mockRequest = {};
//         mockResponse = {
//             status: jest.fn().mockReturnThis(),
//             send: jest.fn(),
//         };
//         mockNext = jest.fn();
//     });

//     describe('createCalendar', () => {
//         it('should create a calendar and return 201 with the result', async () => {
//             const mockName = 'Test Calendar';
//             const mockResult = { id: '123', name: mockName };

//             mockRequest.body = { name: mockName };
//             calendarService.createCalendar.mockResolvedValue(mockResult);

//             await calendarController.createCalendar(
//                 mockRequest as Request,
//                 mockResponse as Response,
//                 mockNext
//             );

//             expect(calendarService.createCalendar).toHaveBeenCalledWith(mockName);
//             expect(mockResponse.status).toHaveBeenCalledWith(201);
//             expect(mockResponse.send).toHaveBeenCalledWith(mockResult);
//             expect(mockNext).not.toHaveBeenCalled();
//         });

//         it('should call next with an error if createCalendar fails', async () => {
//             const mockError = new Error('Create failed');
//             const mockName = 'Test Calendar';

//             mockRequest.body = { name: mockName };
//             calendarService.createCalendar.mockRejectedValue(mockError);

//             await calendarController.createCalendar(
//                 mockRequest as Request,
//                 mockResponse as Response,
//                 mockNext
//             );

//             expect(calendarService.createCalendar).toHaveBeenCalledWith(mockName);
//             expect(mockNext).toHaveBeenCalledWith(mockError);
//             expect(mockResponse.status).not.toHaveBeenCalled();
//             expect(mockResponse.send).not.toHaveBeenCalled();
//         });
//     });

//     describe('getCalendar', () => {
//         it('should get a calendar by ID and return 201 with the result', async () => {
//             const mockCalendarId = '123';
//             const mockResult = { id: mockCalendarId, name: 'Test Calendar' };

//             mockRequest.body = { calendarId: mockCalendarId };
//             calendarService.getCalendar.mockResolvedValue(mockResult);

//             await calendarController.getCalendar(
//                 mockRequest as Request,
//                 mockResponse as Response,
//                 mockNext
//             );

//             expect(calendarService.getCalendar).toHaveBeenCalledWith(mockCalendarId);
//             expect(mockResponse.status).toHaveBeenCalledWith(201);
//             expect(mockResponse.send).toHaveBeenCalledWith(mockResult);
//             expect(mockNext).not.toHaveBeenCalled();
//         });

//         it('should call next with an error if getCalendar fails', async () => {
//             const mockError = new Error('Get failed');
//             const mockCalendarId = '123';

//             mockRequest.body = { calendarId: mockCalendarId };
//             calendarService.getCalendar.mockRejectedValue(mockError);

//             await calendarController.getCalendar(
//                 mockRequest as Request,
//                 mockResponse as Response,
//                 mockNext
//             );

//             expect(calendarService.getCalendar).toHaveBeenCalledWith(mockCalendarId);
//             expect(mockNext).toHaveBeenCalledWith(mockError);
//             expect(mockResponse.status).not.toHaveBeenCalled();
//             expect(mockResponse.send).not.toHaveBeenCalled();
//         });
//     });