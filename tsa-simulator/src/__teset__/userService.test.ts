import { UserService } from '../services/userService';
import { UserRepository } from '../repos/user-repo';
import { User } from '../models/user';
import tool from '../util/tools';
import { ResourceNotFoundError, BadRequestError } from '../errors/errors';

describe('userService', () => {

    let sut: UserService;
    let mockRepo: UserRepository = new UserRepository();

    let mockUsers = [
        // provide id, username, passowrd, score, role
        new User(1, 'aanderson', 'password', 100, 'Admin'),
    ];

    beforeEach(() => {
        sut = new UserService(mockRepo);
        // Reset all external methods
        for (let method in UserRepository.prototype) {
            UserRepository.prototype[method] = jest.fn().mockImplementation(() => {
                throw new Error(`Failed to mock external method: UserRepository.${method}!`);
            });
        }
    });

    test('should resolve to User[] (without passwords) when getAllUsers() successfully retrieves users from the data source', async () => {

        // Arrange
        expect.hasAssertions();
        UserRepository.prototype.getAll = jest.fn().mockReturnValue(mockUsers);

        // Act
        let result = await sut.getAllUsers();

        // Assert
        expect(result).toBeTruthy();
        expect(result.length).toBe(5);
        result.forEach(val => expect(val.password).toBeUndefined());

    });
});