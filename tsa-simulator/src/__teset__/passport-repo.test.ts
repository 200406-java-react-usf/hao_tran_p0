import { PassportService } from '../services/passportService';
import { PassportRepository } from '../repos/passport-repo';
import { Passport } from '../models/passport';
import tools from '../util/tools';
import { ResourceNotFoundError, BadRequestError } from '../errors/errors';

//connect to passport db


//
describe('userService', () => {

    let sut: PassportService;
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
        new Passport(1, 'Nikolai', 'Adamos', 'Consantinuoplis', 'Poet', 'Greek', 'Orthodox', 'Greek', 100, false),
        new Passport(2, 'Halfdan', 'Bjornsson', 'Birka', 'Soldier', 'Norse', 'Germanic', 'Thule', 100, true)
    ];

    //repo-db method connection testing
    test('repo/getAll: should retrieves all  users from the data source', async () => {
        expect.hasAssertions();

        let result = await this.passportRepo.getAll();

        expect(result.length).toBeGreaterThan(0);
        expect(result.length).toEqual(passports.length);
    });

    test('repo/getAll: empty de: should retrieves no unselected users from the data source', async () => {
        expect.hasAssertions();
        // break connection


        //
        let result = await this.passportRepo.getAll();

        expect(result.length).toBeGreaterThan(0);
        expect(result.length).toEqual(passports.length);
    });

    test('repo/getById: should retrieves 1 users by id from the data source', async () => {
        // Arrange
        expect.hasAssertions();
        // Act
        let result: Passport = await this.passportRepo.getById(1);
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
            await this.passportRepo.getById(0);
        } catch (e) {

            // Assert
            expect(e instanceof BadRequestError).toBe(true);
        }
    });

    test('repo/getById: id out of range, should return ResourceNotFoundError', async () => {
        // Arrange
        expect.hasAssertions();
        // Act
        try {
            await this.passportRepo.getById(999);
        } catch (e) {

            // Assert
            expect(e instanceof ResourceNotFoundError).toBe(true);
        }
    });

    test('repo/getUnselected: should retrieves all unselected users from the data source', async () => {
        // Arrange
        expect.hasAssertions();
        // Act
        let result: number[] = await this.passportRepo.getUnselected();
        // Assert
        expect(result).toBeTruthy();
        //check if
        result.forEach(element => {
            expect(typeof element).toBe("number");
        });
        result.forEach(async element => {
            let newPassport: Passport = await this.passportRepo.getById(element);
            expect(newPassport.id).toBeFalsy();
        });
    });

    test('repo/getUnselected: should retrieves all unselected users from the data source', async () => {
        // Arrange
        expect.hasAssertions();
        // Act
        let result: number[] = await this.passportRepo.getUnselected();
        // Assert
        expect(result).toBeTruthy();
        //check if
        result.forEach(element => {
            expect(typeof element).toBe("number");
        });
        result.forEach(async element => {
            let newPassport: Passport = await this.passportRepo.getById(element);
            expect(newPassport.id).toBeFalsy();
        });
    });

    test('repo/updateSelected: should change unselected to selected', async () => {
        // Arrange
        expect.hasAssertions();
        // Act
        await this.passportRepo.updateSelected(1);
        // Assert
        expect(result).toBeTruthy();
        //check if
        result.forEach(element => {
            expect(typeof element).toBe("number");
        });
        result.forEach(async element => {
            let newPassport: Passport = await this.passportRepo.getById(element);
            expect(newPassport.id).toBeFalsy();
        });
    });
})