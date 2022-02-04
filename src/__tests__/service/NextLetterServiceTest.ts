import NextLetterService from '../../service/NextLetterService';
import ILetterBag from '../../service/interfaces/ILetterBag';
import { ILetter } from '../../types';

const testData: ILetter[] = [
    {
        char: 'A',
        count: 1,
        points: 1
    },
    {
        char: 'B',
        count: 2,
        points: 2
    },
    {
        char: 'C',
        count: 3,
        points: 3
    },
    {
        char: 'D',
        count: 4,
        points: 4
    }
]

describe('NextLetterService Tests', () => {
    let nextLetterService: NextLetterService;

    beforeEach(() => {
        nextLetterService = new NextLetterService(2, 1, 3, mockLetterBag());
    });

    it('Should peek next letters correctly', () => {
        const expected = testData.slice(0, 2);
        const actual = nextLetterService.peekNextLetters(2);

        expect(expected).toEqual(actual);
    })

    it('Should pop letters correctly', () => {
        let expected = testData.slice(0, 2);
        let actual = nextLetterService.popNextLetters(2);

        expect(expected).toEqual(actual);

        expected = testData.slice(2, 4);
        actual = nextLetterService.popNextLetters(2);

        expect(expected).toEqual(actual);
    })
    
});

function mockLetterBag() : ILetterBag {
    
    let callNum : number = 0;

    return {
        getLetter: jest.fn(() => {
            const ret = testData[callNum];
            callNum++;
            return ret;
        })
    };
}
