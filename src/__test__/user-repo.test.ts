
import { UserRepository } from '../repos/user-repo';
import * as mockIndex from '..';
import * as mockMapper from '../util/result-set-mapper';
import { User } from '../models/user';
import {
    InternalServerError, ResourceNotFoundError,
    BadRequestError, AuthenticationError,
    ResourcePersistenceError, NotImplementedError
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
        mapUserResultSet: jest.fn()
    }
});

describe('userRepo', () => {

    let sut = new UserRepository();
    let mockConnect = mockIndex.connectionPool.connect;
    beforeEach(() => {

        (mockConnect as jest.Mock).mockClear().mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => {
                    return {
                        rows: [
                            {
                                id: 1,
                                username: 'aanderson',
                                password: 'password',
                                score: 0,
                                role: "tester"
                            }
                        ]
                    }
                }),
                release: jest.fn()
            }
        });
        (mockMapper.mapUserResultSet as jest.Mock).mockClear();
    });

    test('should resolve none of Users when getAll retrieves records from data source', async () => {

        // Arrange
        expect.hasAssertions();
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { return { rows: [] } }),
                release: jest.fn()
            }
        });

        // Act
        let result = await sut.getAll();

        // Assert
        expect(result).toBeTruthy();
        expect(result instanceof Array).toBe(true);
        expect(mockConnect).toBeCalledTimes(1);

    });

    test('no connection, return service error', async () => {

        // Arrange
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { }),
                release: jest.fn()
            }
        });

        // Act
        try {
            let result = await sut.getAll();
        }
        // Assert
        catch (e) {
            expect(e instanceof InternalServerError).toBe(true);
        }
    });
    test('not implemented', async () => {
        //Arrange
        expect.hasAssertions();

        let mockUser = new User(5, 'eeinstein', 'password', 0, 'User');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        // Act
        try {
            let result = await sut.getById(5);
        }
        // Assert
        catch (e) {
            expect(e instanceof NotImplementedError).toBe(true);
        }
    });
    test('get by username, should return user', async () => {

        //Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'aanderson', 'password', 0, 'Admin');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        //Act
        let result = await sut.getByUsername('aanderson');

        //Assert
        expect(result).toBeTruthy();
        expect(result instanceof User).toBeTruthy();
    });
    test('no connetion ,server error', async () => {

        //Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'aanderson', 'password', 0, 'Admin');
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { }),
                release: jest.fn()
            }
        });
        //Assert
        try {
            let result = await sut.getByUsername('aanderson');
        }
        // Assert
        catch (e) {
            expect(e instanceof InternalServerError).toBe(true);
        }
    });
    test('save new user, will return success', async () => {

        //Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'aanderson', 'password', 0, 'Admin');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        //Act
        let result = await sut.save(mockUser);

        //Assert
        expect(result).toBeTruthy();
        expect(result instanceof User).toBeTruthy();
    });
    test('no connetion ,server error', async () => {

        //Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'aanderson', 'password', 0, 'Admin');
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { }),
                release: jest.fn()
            }
        });
        //Assert
        try {
            let result = await sut.save(mockUser);
        }
        // Assert
        catch (e) {
            expect(e instanceof InternalServerError).toBe(true);
        }
    });
    test('save new user, will return success', async () => {

        //Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'aanderson', 'password', 0, 'Admin');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        //Act
        let result = await sut.checkCredentials('aanderson', 'password');

        //Assert
        expect(result).toBeTruthy();
        expect(result instanceof User).toBeTruthy();
    });
    test('no connetion ,server error', async () => {

        //Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'aanderson', 'password', 0, 'Admin');
        (mockConnect as jest.Mock).mockImplementation(() => {
            return {
                query: jest.fn().mockImplementation(() => { }),
                release: jest.fn()
            }
        });
        //Assert
        try {
            let result = await sut.checkCredentials('aanderson', 'password');
        }
        // Assert
        catch (e) {
            expect(e instanceof InternalServerError).toBe(true);
        }
    });
    test('Will update the score of user', async () => {

        //Arrange
        expect.hasAssertions();

        let mockUser = new User(1, 'aanderson', 'password', 0, 'Admin');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        //Act
        let result = await sut.updateScore(1, 100);

        //Assert
        expect(result).toBe(true);
    });
    test('no connetion ,server error', async () => {

        //Arrange
        expect.hasAssertions();
        //no connection
		(mockConnect as jest.Mock).mockImplementation( () => {
			return {
				query: jest.fn().mockImplementation( () => { return null; }),
				release: jest.fn()
			};
		});
        //Assert
        try {
            let result = await sut.updateScore(1, 100);
        }
        // Assert
        catch (e) {
            expect(e instanceof InternalServerError).toBe(true);
        }
    });
    test('not implemented', async () => {

        // Arrange
        // expect.hasAssertions();

        let mockUser = new User(5, 'eeinstein', 'password', 0, 'User');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        // Act
        try {
            let result = await sut.update(mockUser);
        }
        // Assert
        catch (e) {
            expect(e instanceof NotImplementedError).toBe(true);
        }
    });
    test('not implemented', async () => {

        // Arrange
        // expect.hasAssertions();

        let mockUser = new User(5, 'eeinstein', 'password', 0, 'User');
        (mockMapper.mapUserResultSet as jest.Mock).mockReturnValue(mockUser);

        // Act
        try {
            let result = await sut.deleteById(5);
        }
        // Assert
        catch (e) {
            expect(e instanceof NotImplementedError).toBe(true);
        }
    });
});