import LetterBag from "../../service/LetterBag";
import IShuffler from "../../service/interfaces/IShuffler";

const A = {
    char: 'A',
    count: 1,
    points: 1
};

const B = {
    char: 'B',
    count: 1,
    points: 1
};

const C = {
    char: 'C',
    count: 1,
    points: 1
};

const D = {
    char: 'D',
    count: 1,
    points: 1
};
 
const testData = [A, B, C, D];

describe('LetterBag Tests', () => {

    let letterBag: LetterBag;

    beforeEach(() => {
        letterBag = new LetterBag(3, testData, mockShuffler());
    });

    it('get letters correctly', () => {
        // Bag should be [D, C, B, A]
        let letter = letterBag.getLetter();
        expect(letter).toEqual(D);

        // Bag should be [C, B, A]
        letter = letterBag.getLetter();
        expect(letter).toEqual(C);

        // Should add a new bag and call shuffle here
        // Bag should be [D, C, B, A, B, A]
        letter = letterBag.getLetter();
        expect(letter).toEqual(D);

        // Bag should be [C, B, A, B, A]
        letter = letterBag.getLetter();
        expect(letter).toEqual(C);

        // Bag should be [B, A, B, A]
        letter = letterBag.getLetter();
        expect(letter).toEqual(B);
    })
});


function mockShuffler() : IShuffler {
    return {
        shuffle: jest.fn(arr => arr.reverse())
    };
}