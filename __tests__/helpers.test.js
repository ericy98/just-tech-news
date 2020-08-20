const {format_date, format_plural} = require('../utils/helpers');

test('format_date() returns a date string', () => {
    const date = new Date('2020-08-20 15:48:12');

    expect(format_date(date)).toBe('8/20/2020');
});

test('format_plural() correctly pluralizes words', () => {
    const word1 = format_plural('lion', 1)
    const word2 = format_plural('tiger', 2)

    expect(word1).toBe('lion');
    expect(word2).toBe('tigers');
});