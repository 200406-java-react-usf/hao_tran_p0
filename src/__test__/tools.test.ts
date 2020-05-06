import {     
    ValidId,
    isStrings,
    isObject,
    isEmptyObject,
    isValidObject } from "../util/tools";
import { User } from "../models/user";


describe('validator', () => {
    test('should return true when isValidId is provided a valid id', () => {
        
        // Arrange
        expect.assertions(3);

        // Act
        let result1 = ValidId(1);
        let result2 = ValidId(999999);
        let result3 = ValidId(Number('123'));

        // Assert
        expect(result1).toBe(true);
        expect(result2).toBe(true);
        expect(result3).toBe(true);

    });


    test('should return false when isValidId is provided a invalid id (falsy)', () => {

        // Arrange
        expect.assertions(3);

        // Act
        let result1 = ValidId(NaN);
        let result2 = ValidId(0);
        let result3 = ValidId(Number(null));

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);

    });

    test('should return false when isValidId is provided a invalid id (decimal)', () => {

        // Arrange
        expect.assertions(3);

        // Act
        let result1 = ValidId(3.14);
        let result2 = ValidId(0.01);
        let result3 = ValidId(Number(4.20));

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);

    });

    test('should return false when isValidId is provided a invalid id (non-positive)', () => {

        // Arrange
        expect.assertions(3);

        // Act
        let result1 = ValidId(0);
        let result2 = ValidId(-1);
        let result3 = ValidId(Number(-23));

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);

    });

    test('should return true when isStrings is provided valid string(s)', () => {

        // Arrange
        expect.assertions(3);

        // Act
        let result1 = isStrings('valid');
        let result2 = isStrings('valid', 'string', 'values');
        let result3 = isStrings(String('weird'), String('but valid'));

        // Assert
        expect(result1).toBe(true);
        expect(result2).toBe(true);
        expect(result3).toBe(true);

    });

    test('should return false when isStrings is provided invalid string(s)', () => {

        // Arrange
        expect.assertions(3);

        // Act
        let result1 = isStrings('');
        let result2 = isStrings('some valid', '', 'but not all');
        let result3 = isStrings(String(''), String('still weird'));

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(false);
        expect(result3).toBe(false);
    });

    test('isobject: return obj[key]', () => {

        // Arrange
        expect.assertions(2);

        // Act
        let result1 = isObject({test: "test", test2: "test2"});
        let result2 = isObject({test: "test", test2: null}, "test2");

        // Assert
        expect(result1).toBe(true);
        expect(result2).toBe(true);

    });

    test('isEmptyObject: boolean', () => {

        // Arrange
        expect.assertions(2);

        // Act
        let mockUser = new User(5, 'eeinstein', 'password', 0, 'User');
        let result1 = isEmptyObject(mockUser);
        let mockUser2 = {};
        let result2 = isEmptyObject(mockUser2);

        // Assert
        expect(result1).toBe(false);
        expect(result2).toBe(true);
    });

    test('isValidObject: return obj[key]', () => {

        // Arrange
        expect.assertions(2);

        // Act
        let mockUser = {test: "test", test2: "test2"};
        let result1 = isValidObject(mockUser);
        let mockUser2 = {test: null};
        let result2 = isValidObject(mockUser2);

        // Assert
        expect(result1).toBe(true);
        expect(result2).toBe(false);
    });
})