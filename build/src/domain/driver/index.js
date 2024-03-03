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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRandomDriver = exports.createDriver = void 0;
const utils_1 = require("../../utils");
const driver_1 = __importDefault(require("../orm/sequelize/models/driver"));
const sequelize_1 = require("sequelize");
/**
 * @swagger
 * tags:
 *   - name: Driver
 *     description: Operations related to driver creation
 *
 * /api/v1/driver/driver:
 *   post:
 *     summary: Create a new driver.
 *     description: Creates a new driver and stores it in the database.
 *     tags:
 *       - Driver
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ccDriver:
 *                 type: string
 *                 description: The driver's identification number.
 *               driverName:
 *                 type: string
 *                 description: The name of the driver.
 *     responses:
 *       '200':
 *         description: Driver created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idDriverRide:
 *                   type: integer
 *                   description: The ID of the newly created driver.
 *                 driverName:
 *                   type: string
 *                   description: The name of the driver.
 *                 ccDriver:
 *                   type: string
 *                   description: The driver's identification number.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp indicating when the driver was created.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp indicating when the driver was last updated.
 *       '400':
 *         description: Bad request. Missing required fields in the request body.
 *       '500':
 *         description: Internal server error. Failed to create the driver.
 */
const createDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ccDriver, driverName } = req.body;
        // Verifica si los campos requeridos son undefined o null
        if (ccDriver === undefined || ccDriver === null || driverName === null) {
            (0, utils_1.LogWarning)('Missing required fields in request body');
            const response = yield (0, utils_1.ResponseService)('Failure', utils_1.CODE_BAD_REQUEST, 'Missing required fields', '');
            return res.status(utils_1.CODE_BAD_REQUEST).send(response);
        }
        // Crea el conductor en la base de datos
        const createdDriver = yield driver_1.default.create({
            driverName,
            ccDriver
        });
        // Retorna la respuesta exitosa con el conductor creado
        return res.status(utils_1.CODE_OK).send(createdDriver);
    }
    catch (error) {
        console.error('Error:', error);
        (0, utils_1.LogDanger)('Error creating driver');
        const response = yield (0, utils_1.ResponseService)('Failure', 'CRASH_LOGIC', error, error);
        return res.status(utils_1.CODE_INTERNAL_SERVER_ERROR).send(response);
    }
});
exports.createDriver = createDriver;
/**
 * Busca un conductor aleatorio en la base de datos.
 * @version 1.0.0
 * @async
 * @function findRandomDriver
 * @returns {Promise<number | null>} El ID del conductor aleatorio si se encuentra, o null si hay un error.
 * @throws {Error} Error si no se puede encontrar un conductor aleatorio.
 */
const findRandomDriver = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idDriverRide = 'idDriverRide';
        const randomDriver = yield driver_1.default.findOne({
            order: (0, sequelize_1.fn)('RAND'),
            attributes: [idDriverRide]
        });
        const idRandomDriverRide = randomDriver === null || randomDriver === void 0 ? void 0 : randomDriver.get(idDriverRide);
        return idRandomDriverRide;
    }
    catch (error) {
        (0, utils_1.LogDanger)('Error finding random driver');
        return null;
    }
});
exports.findRandomDriver = findRandomDriver;
//# sourceMappingURL=index.js.map