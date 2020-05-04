import { PassportService } from '../services/passportService';
import { PassportRepository } from '../repos/passport-repo';
import Validator from '../util/tools';
import { Passport } from "../models/passport";
import { ResourceNotFoundError, BadRequestError, ResourcePersistenceError } from '../errors/errors';

jest.mock('../repos/user-repo', () => {
    
    return new class PassportRepository {
            getAll = jest.fn();
            getById = jest.fn();
            listUnselected = jest.fn();
            updateSelected = jest.fn();
            resetPassport = jest.fn();
            save = jest.fn();
            update = jest.fn();
            deleteById = jest.fn();
    }

});
describe('Passport Service', () => {

    let sut: PassportService;
    let mockRepo;

    let mockPassports = [
        new Passport(1, 'Nikolaos', 'Adamos', 'Consantinuoplis', 'Poet', 'Greek', 'Orthodox', 'Roman Empire', 500, false),
        new Passport(2, 'Nikolaos', 'Adamos', 'Consantinuoplis', 'Poet', 'Greek', 'Orthodox', 'Roman Empire', 500, false),
        new Passport(3, 'Nikolaos', 'Adamos', 'Consantinuoplis', 'Poet', 'Greek', 'Orthodox', 'Roman Empire', 500, false),
        new Passport(4, 'Nikolaos', 'Adamos', 'Consantinuoplis', 'Poet', 'Greek', 'Orthodox', 'Roman Empire', 500, false),
        new Passport(5, 'Nikolaos', 'Adamos', 'Consantinuoplis', 'Poet', 'Greek', 'Orthodox', 'Roman Empire', 500, false)
    ];

    beforeEach(() => {

        mockRepo = jest.fn(() => {
            return {
                getAll : jest.fn(),
                getById  :  jest.fn(),
                getUnselected  :  jest.fn(),
                updateSelected  :  jest.fn(),
                resetPassport  :  jest.fn(),
                getPassportInGroup  :  jest.fn(),
                save  :  jest.fn(),
                update  :  jest.fn(),
                deleteById  :  jest.fn()
            }
        });

        // @ts-ignore
        sut = new PassportService(mockRepo);
    
    });




    test('should get all listed passport', async () => {

        // Arrange
        expect.assertions(2);

        mockRepo.getAll = jest.fn().mockImplementation(() => {
            return new Promise<Passport[]>((resolve) => resolve(mockPassports));
        });
        // Act
        let result = await sut.getAll();
        // Assert
        expect(result).toBeTruthy();
        expect(result.length).toBe(5);
    });

    test('should get nothing with no event provided', async () => {

        // Arrange
        expect.assertions(0);

        mockRepo.getAll = jest.fn().mockImplementation(() => {
            return new Promise<any>((resolve) => resolve({}));
        });
        // Act
        try{
        let result = await sut.getAll();}
        // Assert
        catch(e){
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }

    });

    test('should get 1 unselected random event', async () => {

        // Arrange
        expect.assertions(2);

        mockRepo.getUnselected = jest.fn().mockImplementation(() => {
            return new Promise<Passport[]>((resolve) => resolve(mockPassports));
        });
        mockRepo.getById = jest.fn().mockImplementation(() => {
            return new Promise<Passport>((resolve) => resolve(mockPassports[1]));
        });
        mockRepo.updateSelected = jest.fn().mockImplementation(() => {
            return new Promise<boolean>((resolve) => resolve(true));
        });
        // Act
        let result = await sut.getNextPassport();
        // Assert
        expect(result).toBeTruthy();
        expect(result.selected).toBeFalsy();
    });

    test('should get error with no list', async () => {

        // Arrange
        expect.assertions(1);

        mockRepo.getUnselected = jest.fn().mockImplementation(() => {
            return new Promise<Passport[]>((resolve) => resolve([]));
        });
        mockRepo.getById = jest.fn().mockImplementation(() => {
            return new Promise<Passport>((resolve) => resolve(mockPassports[1]));
        });
        mockRepo.updateSelected = jest.fn().mockImplementation(() => {
            return new Promise<boolean>((resolve) => resolve(true));
        });
        // Act
        try{
        let result = await sut.getNextPassport();}
        // Assert
        catch(e){
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }
    });

    test('should get error with no chosen', async () => {

        // Arrange
        expect.assertions(1);

        mockRepo.getUnselected = jest.fn().mockImplementation(() => {
            return new Promise<Passport[]>((resolve) => resolve(mockPassports));
        });
        mockRepo.getById = jest.fn().mockImplementation(() => {
            return new Promise<any>((resolve) => resolve({}));
        });
        mockRepo.updateSelected = jest.fn().mockImplementation(() => {
            return new Promise<boolean>((resolve) => resolve(true));
        });
        // Act
        try{
        let result = await sut.getNextPassport();}
        // Assert
        catch(e){
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }
    });
    test('should get error with cannot update', async () => {

        // Arrange
        expect.assertions(0);

        mockRepo.getUnselected = jest.fn().mockImplementation(() => {
            return new Promise<Passport[]>((resolve) => resolve(mockPassports));
        });
        mockRepo.getById = jest.fn().mockImplementation(() => {
            return new Promise<Passport>((resolve) => resolve(mockPassports[1]));
        });
        mockRepo.updateSelected = jest.fn().mockImplementation(() => {
            return new Promise<boolean>((resolve) => resolve(false));
        });
        // Act
        try{
        let result = await sut.getNextPassport();}
        // Assert
        catch(e){
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }
    });
    test('should get ExclusionGrouplist', async () => {

        // Arrange
        mockRepo.getPassportInGroup = jest.fn().mockReturnValue(false);

        expect.assertions(1);

        mockRepo.resetPassport = jest.fn().mockImplementation(() => {
            return new Promise<boolean>((resolve) => resolve(true));
        });
        // Act
        let result = await sut.resetPassportList();
        // Assert
        expect(result).toBeTruthy();
    });

        test('should get error with cannot update', async () => {

        // Arrange
        expect.assertions(0);

        mockRepo.getUnselected = jest.fn().mockImplementation(() => {
            return new Promise<Passport[]>((resolve) => resolve(mockPassports));
        });
        mockRepo.getById = jest.fn().mockImplementation(() => {
            return new Promise<Passport>((resolve) => resolve(mockPassports[1]));
        });
        mockRepo.updateSelected = jest.fn().mockImplementation(() => {
            return new Promise<boolean>((resolve) => resolve(false));
        });
        // Act
        try{
        let result = await sut.getNextPassport();}
        // Assert
        catch(e){
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }
    });
    // test('should get false with no event provided', async () => {

    //     // Arrange
    //     expect.assertions(1);
    //     mockRepo.resetPassport = jest.fn().mockImplementation(() => {
    //         return new Promise<boolean>((resolve) => resolve(false));
    //     });

    //     // Act
    //     try{
    //     let result = await sut.resetPassportList();}
    //     // Assert
    //     catch(e){
            
    //         expect(e instanceof ResourceNotFoundError).toBe(true);
    //     }

    // });
});