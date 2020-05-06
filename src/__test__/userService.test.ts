import { UserService } from '../services/userService';
import { UserRepository } from '../repos/user-repo';
import Validator from '../util/tools';
import { User } from '../models/user';
import { ResourceNotFoundError, BadRequestError, AuthenticationError, ResourcePersistenceError } from '../errors/errors';

jest.mock('../repos/user-repo', () => {

    return new class UserRepository {
        getAll = jest.fn();
        getById = jest.fn();
        getByUsername = jest.fn();
        save = jest.fn();
        checkCredentials = jest.fn();
        update = jest.fn();
        deleteById = jest.fn();
    }

});
describe('userService', () => {

    let sut: UserService;
    let mockRepo;

    let mockUsers = [
        new User(1, 'aanderson', 'password', 0, 'Admin'),
        new User(2, 'bbailey', 'password', 0, 'User'),
        new User(3, 'ccountryman', 'password', 0, 'User'),
        new User(4, 'ddavis', 'password', 0, 'User'),
        new User(5, 'eeinstein', 'password', 0, 'User')
    ];

    beforeEach(() => {

        mockRepo = jest.fn(() => {
            return {
                getAll: jest.fn(),
                getById: jest.fn(),
                getUserByUniqueKey: jest.fn(),
                getUserByCredentials: jest.fn(),
                save: jest.fn(),
                update: jest.fn(),
                deleteById: jest.fn()
            }
        });

        // @ts-ignore
        sut = new UserService(mockRepo);

    });

    test('should resolve to User when getUserById is given a valid an known id', async () => {

        // Arrange
        expect.assertions(3);

        Validator.isStrings = jest.fn().mockReturnValue(true);

        mockRepo.getByUsername = jest.fn().mockImplementation((username: string) => {
            return new Promise<User>((resolve) => resolve(mockUsers[0]));
        });
        // Act
        let result = await sut.getByUsername("aanderson");
        // Assert
        expect(result).toBeTruthy();
        expect(result.id).toBe(1);
        expect(result.userpassword).toBeUndefined();

    });
    test('should ResourceNotFoundError', async () => {

        // Arrange
        expect.assertions(1);

        Validator.isStrings = jest.fn().mockReturnValue(true);

        mockRepo.getByUsername = jest.fn().mockImplementation((username: string) => {
            return new Promise<any>((resolve) => resolve(null));
        });
        // Act
        try {
            let result = await sut.getByUsername("test");
        }
        // Assert
        catch (e) {
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });
    test('should reject with BadRequestError when username is given a incorrect one', async () => {

        // Arrange
        mockRepo.getByUsername = jest.fn().mockReturnValue(false);

        // Act
        try {
            await sut.getByUsername("no one");
        } catch (e) {
            // Assert
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });

    test('should authenticate the user with correct crdential', async () => {

        // Arrange
        expect.assertions(3);

        Validator.isStrings = jest.fn().mockReturnValue(true);

        mockRepo.checkCredentials = jest.fn().mockImplementation((username: string, password: string) => {
            return new Promise<User>((resolve) => resolve(mockUsers[0]));
        });
        // Act
        let result = await sut.authenticateUser("aanderson", "password");
        // Assert
        expect(result).toBeTruthy();
        expect(result.id).toBe(1);
        expect(result.userpassword).toBeUndefined();

    });

    test('should reject with AuthenticationError when credential is wrong', async () => {

        // Arrange
        mockRepo.checkCredentials = jest.fn().mockReturnValue(mockUsers[0]);

        // Act
        try {
            await sut.authenticateUser("aanderson", "notpassword");
        } catch (e) {
            // Assert
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });
    test('should reject with AuthenticationError with empty', async () => {

        // Arrange
        mockRepo.checkCredentials = jest.fn().mockReturnValue({});

        // Act
        try {
            await sut.authenticateUser("aanderson", "notpassword");
        } catch (e) {
            // Assert
            expect(e instanceof AuthenticationError).toBe(true);
        }

    });

    test('should addNewUser successfully', async () => {
        expect.assertions(1);

        // Arrange
        let newUser = new User(6, 'test', 'password', 0, 'User')
        mockRepo.save = jest.fn().mockReturnValue(newUser);

        // Act

        let result = await sut.addNewUser(newUser.username, newUser.userpassword);
        expect(result).toBeTruthy();

    });
    test('should not addNewUser for invalid input', async () => {
        // Act
        expect.assertions(1);
        try {
            // empty invalid user
            let user: User;
            await sut.addNewUser(null, null);
        } catch (e) {
            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }

    });

    test('should update successfully', async () => {

        expect.assertions(1);

        mockRepo.updateScore = jest.fn().mockReturnValue(true);
 
        let result = await sut.updateScore(1, 100);

        expect(result).toBe(true);

    });

    test('should not update for invalid input', async () => {

        expect.assertions(1);
        try {
            await sut.updateScore(null, null);
        } catch (e) {

            expect(e instanceof BadRequestError).toBe(true);
        }

    });
});