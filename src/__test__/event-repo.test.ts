  
import { DailyEventRepository } from '../repos/dailyEvent-repo';
import { connectionPool } from '..';
import * as mockMapper from '../util/result-set-mapper';
import { DailyEvent } from '../models/dailyEvent';

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
});