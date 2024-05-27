import { expect } from 'chai';
import { add } from '../utils/add';
import sinon from 'sinon';

describe('add function', () => {
  it('should add two numbers correctly', () => {
    expect(add(1, 2)).to.equal(3);
    expect(add(-1, 1)).to.equal(0);
  });

  it('should handle zero correctly', () => {
    expect(add(0, 0)).to.equal(0);
    expect(add(0, 5)).to.equal(5);
  });

  it('should call the add function with correct arguments', () => {
    const spy = sinon.spy(add);
    spy(1, 2);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith(1, 2)).to.be.true;
  });
});
