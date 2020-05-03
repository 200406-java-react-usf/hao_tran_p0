import { UserRepository } from '../repos/user-repo';
import { User } from '../models/user';
import tools from '../util/tools';
import { ResourceNotFoundError, BadRequestError } from '../errors/errors';

//connect to passport db


//
describe('user-repo', () => {
    let mockRepo: UserRepository = new UserRepository();
    let mockUsers = [
        // id: number,   
        // firstName: string,  
        // lastName: string, 
        // nationality: string,
        // occupation: string,
        // race: string,
        // religion: string,
        // culture: string,
        // property: number
        // selected: boolean;

    ];

    //repo-db method connection testing
    test('repo/getAll: should retrieves all  users from the data source', async () => {
        expect.hasAssertions();

        let result = await mockRepo.getAll();
        expect(result.length).toBeGreaterThan(0);
    });

    test('repo/getById: should retrieves 1 users by id from the data source', async () => {
        // Arrange
        expect.hasAssertions();
        // Act
        let result: User = await mockRepo.getById(1);
        // Assert
        expect(result).toBeTruthy();
        //check if
        expect(result.id).toBe(1);
    });

    test('repo/getById: id error, should return BadRequest', async () => {
        // Arrange
        expect.hasAssertions();
        // Act
        try {
            await mockRepo.getById(1);
        // Assert
        } catch (e) {
            expect(e instanceof BadRequestError).toBe(true);
        }
    });

    test('repo/getById: id out of range, should return ResourceNotFoundError', async () => {
        // Arrange
        expect.hasAssertions();
        // Act
        try {
            await mockRepo.getById(999);
        } catch (e) {

            // Assert
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }
    });

    test('repo/save: should save user', async () => {
        // Arrange
        expect.hasAssertions();
        let mockUser: User = {
            id: 0,
            username: "test2",
            userpassword: "test2",
            score: 0,
            userrole: "test2"
        }
        // Act
        let result:User = await mockRepo.save(mockUser);
        // Assert
        expect(result).toBeGreaterThan(0);
    });

    test('repo/checkCredentials: should get user', async () => {
        // Arrange
        expect.hasAssertions();
        // Act
        let result:User = await mockRepo.checkCredentials("test", "test");
        // Assert
        expect(result).toBeTruthy();
        expect(result.username).toEqual("test");
    });

    test('repo/checkCredentials: should return none', async () => {
        // Arrange
        expect.hasAssertions();
        // Act
        let result:User = await mockRepo.checkCredentials("aaa", "aaa");
        // Assert
        expect(result).toBeTruthy();
        expect(result.username).toBeFalsy();
    });

    test('repo/update: should return NotImplementedError', async () => {
        // Arrange
        expect.hasAssertions();
        let mockUser: User = {
            id: 0,
            username: "test2",
            userpassword: "test2",
            score: 0,
            userrole: "test2"
        }
        // Act
        try {
            await mockRepo.update(mockUser);
        } catch (e) {
            // Assert
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }
    });

    test('repo/checkCredentials: should return none', async () => {
        // Arrange
        expect.hasAssertions();
        // Act
        try {
            await mockRepo.deleteById(1);
        } catch (e) {
            // Assert
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }
    });

})