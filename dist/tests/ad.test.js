"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ad_record_1 = require("../records/ad.record");
const db_1 = require("../utils/db");
const defaultObj = {
    id: '',
    name: 'test name',
    description: 'basdf',
    url: 'https://megak.pl',
    lat: 9,
    lon: 9,
    price: 0,
};
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.pool.end();
}));
test('AdRecord returns data from database for 1 object', () => __awaiter(void 0, void 0, void 0, function* () {
    const ad = yield ad_record_1.AdRecord.getOne('72438811-4b49-11ee-8fb8-309c2343ef55');
    expect(ad).toBeDefined();
    expect(ad.id).toBe('72438811-4b49-11ee-8fb8-309c2343ef55');
    expect(ad.name).toBe('Testowa');
}));
test('AdRecord returns null from database for unexisting entry', () => __awaiter(void 0, void 0, void 0, function* () {
    const ad = yield ad_record_1.AdRecord.getOne('---');
    expect(ad).toBeNull();
}));
test('AdRecord returns array of found entries.', () => __awaiter(void 0, void 0, void 0, function* () {
    const ad = yield ad_record_1.AdRecord.findAll('e');
    expect(ad).not.toEqual([]);
    expect(ad[0].id).toBeDefined();
}));
test('AdRecord returns array of found entries when searching for "e".', () => __awaiter(void 0, void 0, void 0, function* () {
    const ad = yield ad_record_1.AdRecord.findAll('e');
    expect(ad).not.toEqual([]);
    expect(ad[0].id).toBeDefined();
}));
test('AdRecord returns empty array when searching for smth that does not exist.', () => __awaiter(void 0, void 0, void 0, function* () {
    const ad = yield ad_record_1.AdRecord.findAll('-------------------');
    expect(ad).toEqual([]);
}));
test('AdRecord returns smaller amount of data', () => __awaiter(void 0, void 0, void 0, function* () {
    const ad = yield ad_record_1.AdRecord.findAll('');
    expect(ad[0].price).toBeUndefined();
    expect(ad[0].description).toBeUndefined(); //as ad... żeby TS puścił test
}));
test('AdRecord.insert returns UUID', () => __awaiter(void 0, void 0, void 0, function* () {
    const ad = new ad_record_1.AdRecord(defaultObj);
    yield ad.insert();
    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');
}));
test('AdRecord.insert inserts new data to database', () => __awaiter(void 0, void 0, void 0, function* () {
    const ad = new ad_record_1.AdRecord(defaultObj);
    yield ad.insert();
    const foundAd = yield ad_record_1.AdRecord.getOne(ad.id);
    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id);
}));
//# sourceMappingURL=ad.test.js.map