import { DailyEventService } from '../services/eventService';
import { DailyEventRepository } from '../repos/dailyEvent-repo';
import Validator from '../util/tools';
import { DailyEvent } from "../models/dailyEvent";
import { ResourceNotFoundError, BadRequestError, ResourcePersistenceError } from '../errors/errors';

jest.mock('../repos/user-repo', () => {
    
    return new class DailyEventRepository {
            getAll = jest.fn();
            getById = jest.fn();
            listUnselected = jest.fn();
            updateSelected = jest.fn();
            resetEvent = jest.fn();
            save = jest.fn();
            update = jest.fn();
            deleteById = jest.fn();
    }

});
describe('Event Service', () => {

    let sut: DailyEventService;
    let mockRepo;

    let mockEvents = [
        new DailyEvent(1, 'title', 'content', "grpname", false),
        new DailyEvent(2, 'title', 'content', "grpname", false),
        new DailyEvent(3, 'title', 'content', "grpname", false),
        new DailyEvent(4, 'title', 'content', "grpname", false),
        new DailyEvent(5, 'title', 'content', "grpname", false)
    ];

    beforeEach(() => {

        mockRepo = jest.fn(() => {
            return {
                getAll : jest.fn(),
                getById  :  jest.fn(),
                listUnselected  :  jest.fn(),
                updateSelected  :  jest.fn(),
                resetEvent  :  jest.fn(),
                save  :  jest.fn(),
                update  :  jest.fn(),
                deleteById  :  jest.fn()
            }
        });

        // @ts-ignore
        sut = new DailyEventService(mockRepo);
    
    });




    test('should get all listed event', async () => {

        // Arrange
        expect.assertions(2);

        mockRepo.getAll = jest.fn().mockImplementation(() => {
            return new Promise<DailyEvent[]>((resolve) => resolve(mockEvents));
        });
        // Act
        let result = await sut.getEvents();
        // Assert
        expect(result).toBeTruthy();
        expect(result.length).toBe(5);
    });

    test('should get nothing with no event provided', async () => {

        // Arrange
        expect.assertions(1);

        mockRepo.getAll = jest.fn().mockImplementation(() => {
            return new Promise<any>((resolve) => resolve({}));
        });
        // Act
        try{
        let result = await sut.getEvents();}
        // Assert
        catch(e){
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });

    test('should get 1 unselected random event', async () => {

        // Arrange
        expect.assertions(2);

        mockRepo.listUnselected = jest.fn().mockImplementation(() => {
            return new Promise<DailyEvent[]>((resolve) => resolve(mockEvents));
        });
        mockRepo.updateSelected = jest.fn().mockImplementation(() => {
            return new Promise<boolean>((resolve) => resolve(true));
        });
        // Act
        let result = await sut.getNextEvent();
        // Assert
        expect(result).toBeTruthy();
        expect(result.selected).toBeFalsy();
    });

    test('should get no resource with no event provided', async () => {

        // Arrange
        expect.assertions(1);

        mockRepo.listUnselected = jest.fn().mockImplementation(() => {
            return new Promise<any>((resolve) => resolve({}));
        });

        // Act
        try{
        let result = await sut.getNextEvent();}
        // Assert
        catch(e){
            
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });
    test('should reset all events', async () => {

        // Arrange
        mockRepo.resetEvent = jest.fn().mockReturnValue(false);

        expect.assertions(1);

        mockRepo.resetEvent = jest.fn().mockImplementation(() => {
            return new Promise<boolean>((resolve) => resolve(true));
        });
        // Act
        let result = await sut.resetEventList();
        // Assert
        expect(result).toBeTruthy();
    });
    test('should get false with no event provided', async () => {

        // Arrange
        expect.assertions(1);
        mockRepo.resetEvent = jest.fn().mockImplementation(() => {
            return new Promise<boolean>((resolve) => resolve(false));
        });

        // Act
        try{
        let result = await sut.resetEventList();}
        // Assert
        catch(e){
            
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });
});