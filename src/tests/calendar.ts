// import CalendarController from './calendarController';
// import DatabaseImpl from './db';

// const db = new DatabaseImpl();
// const calendarController = new CalendarController(db);

// async function main() {
//     const eventData: Calendar = {
//         title: 'New Event',
//         date: '2024-01-01',
//         time: '10:00',
//         description: 'This is a new event'
//     };

//     try {
//         const eventId = await calendarController.addEvent(eventData);
//         console.log(`Event added with ID: ${eventId}`);

//         const events = await calendarController.getEvents();
//         console.log('Events:');
//         console.log(events);
//     } catch (error) {
//         console.error(error);
//     }
// }

// main();