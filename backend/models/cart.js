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
const mongoose_1 = __importDefault(require("mongoose"));
// Define the Cart schema (if not already defined)
const cartSchema = new mongoose_1.default.Schema({
    items: [
        {
            productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
    totalPrice: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
// Method to update the total price
cartSchema.methods.updateTotalPrice = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let total = 0;
        for (let item of this.items) {
            const product = yield mongoose_1.default.model('Product').findById(item.productId);
            if (product) {
                total += product.price * item.quantity;
            }
        }
        this.totalPrice = total;
        yield this.save();
    });
};
exports.default = mongoose_1.default.model('Cart', cartSchema);
