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
exports.AdRecord = void 0;
const errors_1 = require("../utils/errors");
const db_1 = require("../utils/db");
const uuid_1 = require("uuid");
class AdRecord {
    constructor(obj) {
        if (!obj.name || obj.name.length > 100) {
            throw new errors_1.ValidationError('Nazwa ogłoszenia nie może być pusta ani przekraczać 100 znaków');
        }
        if (obj.description.length > 1000) {
            throw new errors_1.ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków');
        }
        if (obj.price < 0 || obj.price > 9999999) {
            throw new errors_1.ValidationError('Cena nie może być mniejsza od 0 lub większa niż 9 999 999');
        }
        if (!obj.url || obj.url.length > 100) {
            throw new errors_1.ValidationError('Link ogłoszenia nie może być pusty ani przekraczać 100 znaków');
        }
        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new errors_1.ValidationError('Nie można zlokalizować ogłoszenia');
        }
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }
    static findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield db_1.pool.execute("SELECT * FROM `ads` WHERE id = :id", {
                id,
            });
            return result.length === 0 ? null : new AdRecord(result[0]);
        });
    }
    static findAll(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = yield db_1.pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
                search: `%${name}%`
            });
            return results.map(result => {
                const { id, lat, lon, } = result;
                return {
                    id, lat, lon
                };
            });
        });
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                this.id = (0, uuid_1.v4)();
            }
            else {
                throw new Error('Cannot insert that is already inserted');
            }
            yield db_1.pool.execute("INSERT INTO `ads`(`id`,`name`,`description`,`price`,`url`,`lat`,`lon`) VALUES(:id, :name, :description, :price, :url, :lat, :lon)", this);
        });
    }
}
exports.AdRecord = AdRecord;
//# sourceMappingURL=ad.record.js.map