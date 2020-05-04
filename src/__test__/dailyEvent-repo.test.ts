import { UserRepository } from '../repos/user-repo';
import { DailyEventRepository } from '../repos/dailyEvent-repo';
import * as mockIndex from '..';
import { 
    mapEventResultSet
 }from '../util/result-set-mapper';
import { User } from '../models/user';
import { DailyEvent } from '../models/dailyEvent';

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
        mapUserResultSet: jest.fn()
    }
});

describe('Event Repo', () => {

    let sut = new UserRepository();
    let mockConnect = mockIndex.connectionPool.connect;

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
                                title: 'test',
                                content: 'test',
                                group: 'test',
                                selected: true,
                            }
                        ]
                    }
                }), 
                release: jest.fn()
            }
        });
        (mapEventResultSet as jest.Mock).mockClear();
    });

    test('should resolve to an array of Users when getAll retrieves records from data source', async () => {
        
        // Arrange
        //expect.hasAssertions();

        let mockUser = new DailyEvent(1, 'Title', 'Content', "groupname", false);
        (mapEventResultSet as jest.Mock).mockReturnValue(mockUser);

        // Act
        let result = await sut.getAll();

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(result.length).toBe(1);
        expect(mockConnect).toBeCalledTimes(1);

    });

    // test('should resolve to an empty array when getAll retrieves no records from data source', async () => {
        
    //     // Arrange
    //     expect.hasAssertions();
    //     (mockConnect as jest.Mock).mockImplementation(() => {
    //         return {
    //             query: jest.fn().mockImplementation(() => { return { rows: [] } }), 
    //             release: jest.fn()
    //         }
    //     });

    //     // Act
    //     let result = await sut.getAll();

    //     // Assert
    //     expect(result).toBeTruthy();
    //     expect(result instanceof Array).toBe(true);
    //     expect(result.length).toBe(0);
    //     expect(mockConnect).toBeCalledTimes(1);

    // });

    // test('should resolve to a User object when getById retrieves a record from data source', async () => {

    //     // Arrange
    //     expect.hasAssertions();

    //     let mockUser = new User(1, 'un', 'pw', 'fn', 'ln', 'email', 'locked');
    //     (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

    //     // Act
    //     let result = await sut.getById(1);

    //     // Assert
    //     expect(result).toBeTruthy();
    //     expect(result instanceof User).toBe(true);

    // });

});