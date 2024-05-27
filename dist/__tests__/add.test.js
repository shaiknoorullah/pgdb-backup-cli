"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const add_1 = require("../utils/add");
const sinon_1 = __importDefault(require("sinon"));
describe('add function', () => {
    it('should add two numbers correctly', () => {
        (0, chai_1.expect)((0, add_1.add)(1, 2)).to.equal(3);
        (0, chai_1.expect)((0, add_1.add)(-1, 1)).to.equal(0);
    });
    it('should handle zero correctly', () => {
        (0, chai_1.expect)((0, add_1.add)(0, 0)).to.equal(0);
        (0, chai_1.expect)((0, add_1.add)(0, 5)).to.equal(5);
    });
    it('should call the add function with correct arguments', () => {
        const spy = sinon_1.default.spy(add_1.add);
        spy(1, 2);
        (0, chai_1.expect)(spy.calledOnce).to.be.true;
        (0, chai_1.expect)(spy.calledWith(1, 2)).to.be.true;
    });
});
