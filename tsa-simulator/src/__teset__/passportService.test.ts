import { PassportService } from '../services/passportService';
import { PassportRepository } from '../repos/passport-repo';
import { Passport } from '../models/passport';
import tool from '../util/tools';
import { ResourceNotFoundError, BadRequestError } from '../errors/errors';

describe('userService', () => {

    let sut: PassportService;
    let mockRepo: PassportRepository = new PassportRepository();
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

    beforeEach(() => {
        sut = new PassportService(mockRepo);
        // Reset all external methods
        for (let method in PassportRepository.prototype) {
            PassportRepository.prototype[method] = jest.fn().mockImplementation(() => {
                throw new Error(`Failed to mock external method: UserRepository.${method}!`);
            });
        }
    });

    test('repo/getUnselected: should retrieves all unselected users from the data source', async () => {
        // Arrange
        expect.hasAssertions();
        PassportRepository.prototype.getUnselected = jest.fn().mockReturnValue(mockUsers);
        // Act
        let result: Passport[] = { ...await this.passportRepo.getUnselected() };
        // Assert
        expect(result).toBeTruthy();
        result.forEach(element => {
            expect(element.selected).toBeFalsy();
        });
    });
    test('service/getNextPassport:should retrieves random users from the data source', async () => {

        // Arrange
        expect.hasAssertions();
        PassportRepository.prototype.getUnselected = jest.fn().mockReturnValue(mockUsers);
        // Act
        let result = await sut.getNextPassport();
        // Assert
        expect(result).toBeTruthy();
    });
});