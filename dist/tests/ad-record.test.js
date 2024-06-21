"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ad_record_1 = require("../records/ad.record");
const defaultObj = {
    name: 'test name',
    description: 'basdf',
    url: 'https://megak.pl',
    lat: 9,
    lon: 9,
    price: 0,
};
test('can build AdRecord', () => {
    const ad = new ad_record_1.AdRecord(defaultObj);
    expect(ad.name).toBe('test name');
    expect(ad.description).toBe('basdf');
});
test('Validates invalid price', () => {
    expect(() => new ad_record_1.AdRecord(Object.assign(Object.assign({}, defaultObj), { price: -3 }))).toThrow('Cena nie może być mniejsza od 0 lub większa niż 9 999 999');
});
//# sourceMappingURL=ad-record.test.js.map