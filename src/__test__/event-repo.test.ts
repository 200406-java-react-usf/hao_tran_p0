  
import { DailyEventRepository } from '../repos/dailyEvent-repo';
import { connectionPool } from '..';
import * as mockMapper from '../util/result-set-mapper';
import { DailyEvent } from '../models/dailyEvent';
import {     
    ResourceNotFoundError,
    ResourcePersistenceError,
    BadRequestError,
    AuthenticationError,
    NotImplementedError,
    AuthorizationError,
    InternalServerError
 } from '../errors/errors';
/*
    We need to mock the connectionPool exported from the main module
    of our application. At this time, we only use one exposed method
    of the pg Pool API: connect. So we will provide a mock function 
    in its place so that we can mock it in our tests.
*/
jest.mock('..', () => {
    return {
        connectionPool: {
            connect: jest.fn()
        }
    }
});


// The result-set-mapper module also needs to be mocked
jest.mock('../util/result-set-mapper', () => {
    return {
        mapEventResultSet: jest.fn()
    }
});

describe('Event Repo', () => {

    let sut = new DailyEventRepository();
    let mockConnect = connectionPool.connect;
    beforeEach(() => {

        /*
            We can provide a successful retrieval as the default mock implementation
            since it is very verbose. We can provide alternative implementations for
            the query and release methods in specific tests if needed.
        */
        (mockConnect as jest.Mock).mockClear().mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return {
                        rows: [
                            {
                                id: 1,
                                title: 'test_title',
                                content: 'test_content',
                                groupname: "test_group",
                                selected: false
                            }
                        ]
                    }
                }), 
                release: jest.fn()
            }
        });
        (mockMapper.mapEventResultSet as jest.Mock).mockClear();
    });

    test('should resolve to an array of event when getAll retrieves records from data source', async () => {
        
        // Arrange
        // expect.hasAssertions();

        let mockEvent = new DailyEvent(2, 'test', 'test', 'test', false);
        (mockMapper.mapEventResultSet as jest.Mock).mockReturnValue(mockEvent);

        // Act
        let result = await sut.getAll();

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(1);
    });

    test('no connection', async () => {

        // Arrange
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { }), 
                release: jest.fn()
            }
        });

        // Act
        try{
        let result = await sut.getAll();
        }
        // Assert
        catch(e){
            expect(e instanceof InternalServerError).toBe(true);
        }
    });
    test('select unselected event should return true', async () => {
        
        // Arrange
        // expect.hasAssertions();

        let mockEvent = new DailyEvent(2, 'test', 'test', 'test', false);
        (mockMapper.mapEventResultSet as jest.Mock).mockReturnValue(mockEvent);

        // Act
        let result = await sut.listUnselected();

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(1);
    });

    test('no connection', async () => {

        // Arrange
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { }), 
                release: jest.fn()
            }
        });

        // Act
        try{
        let result = await sut.listUnselected();
        }
        // Assert
        catch(e){
            expect(e instanceof InternalServerError).toBe(true);
        }
    });
    test('get event by id', async () => {
        
        // Arrange
        // expect.hasAssertions();

        let mockEvent = new DailyEvent(2, 'test', 'test', 'test', false);
        (mockMapper.mapEventResultSet as jest.Mock).mockReturnValue(mockEvent);

        // Act
        let result = await sut.getById(2);

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof DailyEvent).toBe(true);
    });

    test('no connection', async () => {

        // Arrange
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { }), 
                release: jest.fn()
            }
        });

        // Act
        try{
        let result = await sut.getById(2);
        }
        // Assert
        catch(e){
            expect(e instanceof InternalServerError).toBe(true);
        }
    });
    test('update unselect to selected', async () => {
        
        // Arrange
        // expect.hasAssertions();

        let mockEvent = new DailyEvent(2, 'test', 'test', 'test', false);
        (mockMapper.mapEventResultSet as jest.Mock).mockReturnValue(mockEvent);

        // Act
        let result = await sut.updateSelected(2);

        // Assert
        expect(result).toBeTruthy();
    });

    test('no connection', async () => {

        // Arrange
        // (mockConnect as jest.Mock).mockImplementation(() => {
        //     return {
        //         query: jest.fn().mockImplementation(() => { }), 
        //         release: jest.fn()
        //     }
        // });

        // Act
        try{
        let result = await sut.updateSelected(2);
        }
        // Assert
        catch(e){
            expect(e instanceof InternalServerError).toBe(true);
        }
    });

    test('reset event', async () => {
        
        // Arrange
        // expect.hasAssertions();

        let mockEvent = new DailyEvent(2, 'test', 'test', 'test', false);
        (mockMapper.mapEventResultSet as jest.Mock).mockReturnValue(mockEvent);

        // Act
        let result = await sut.resetEvent();

        // Assert
        expect(result).toBeTruthy();
    });

    test('no connection', async () => {

        // Arrange
        // (mockConnect as jest.Mock).mockImplementation(() => {
        //     return {
        //         query: jest.fn().mockImplementation(() => { }), 
        //         release: jest.fn()
        //     }
        // });

        // Act
        try{
        let result = await sut.resetEvent();
        }
        // Assert
        catch(e){
            expect(e instanceof InternalServerError).toBe(true);
        }
    });
    test('not implemented', async () => {

        // Arrange
        // expect.hasAssertions();

        let mockEvent = new DailyEvent(2, 'test', 'test', 'test', false);
        (mockMapper.mapEventResultSet as jest.Mock).mockReturnValue(mockEvent);

        // Act
        try{
        let result = await sut.save(mockEvent);
        }
        // Assert
        catch(e){
        expect(e instanceof NotImplementedError).toBe(true);
        }
    });
    test('not implemented', async () => {

        // Arrange
        // expect.hasAssertions();

        let mockEvent = new DailyEvent(2, 'test', 'test', 'test', false);
        (mockMapper.mapEventResultSet as jest.Mock).mockReturnValue(mockEvent);

        // Act
        try{
        let result = await sut.update(mockEvent);
        }
        // Assert
        catch(e){
        expect(e instanceof NotImplementedError).toBe(true);
        }
    });
    test('not implemented', async () => {

        // Arrange
        // expect.hasAssertions();

        let mockEvent = new DailyEvent(2, 'test', 'test', 'test', false);
        (mockMapper.mapEventResultSet as jest.Mock).mockReturnValue(mockEvent);

        // Act
        try{
        let result = await sut.deleteById(5);
        }
        // Assert
        catch(e){
        expect(e instanceof NotImplementedError).toBe(true);
        }
    });
});