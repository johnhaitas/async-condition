const assert = require('assert');
const { and, or, not } = require('../index.js');

const truePromise = () => Promise.resolve(true),
  falsePromise = () => Promise.resolve(false),
  rejectPromise = () => Promise.reject(new Error('Promise rejected!')),
  assertConditionTrue = (conditional, done) => conditional.then(r => r ? done() : done(new Error('This condition should have returned `true`'))),
  assertConditionFalse = (conditional, done) => conditional.then(r => r ? done(new Error('This condition should have returned `false`!')) : done()),
  assertConditionRejected = (conditional, done) => conditional.then(() => done(new Error('This conditional failed to throw an exception!'))).catch(_ => done());

describe('AsyncCondition', function () {

  describe('#and()', function () {

    it('`true AND true` should evaluate true', function (done) {
      assertConditionTrue(
        and(truePromise, truePromise),
        done
      )
    });

    it('`true AND false` should evaluate false', function (done) {
      assertConditionFalse(
        and(truePromise, falsePromise),
        done
      )
    });

    it('`false AND true` should evaluate false', function (done) {
      assertConditionFalse(
        and(falsePromise, truePromise),
        done
      )
    });

    it('`false AND false` should evaluate false', function (done) {
      assertConditionFalse(
        and(falsePromise, falsePromise),
        done
      )
    });

    it('`true AND REJECTED` should need to be caught', function (done) {
      assertConditionRejected(
        and(truePromise, rejectPromise),
        done
      )
    });

    it('`REJECTED AND true` should need to be caught', function (done) {
      assertConditionRejected(
        and(rejectPromise, truePromise),
        done
      )
    });

    it('`false AND REJECTED` should need to be caught', function (done) {
      assertConditionRejected(
        and(falsePromise, rejectPromise),
        done
      )
    });

    it('`REJECTED AND false` should need to be caught', function (done) {
      assertConditionRejected(
        and(rejectPromise, falsePromise),
        done
      )
    });

    it('No arguments should need to be caught', function (done) {
      assertConditionRejected(
        and(),
        done
      )
    });

    it('Should work in an if statement with await syntax', async function () {
      if (await and(truePromise, truePromise)) {
        assert.ok(true);
      }
      else {
        assert.ok(false);
      }
    });
  });

  describe('#or()', function () {

    it('`true OR true` should evaluate true', function (done) {
      assertConditionTrue(
        or(truePromise, truePromise),
        done
      );
    });

    it('`false OR true` should evaluate true', function (done) {
      assertConditionTrue(
        or(falsePromise, truePromise),
        done
      );
    });

    it('`true OR false` should evaluate true', function (done) {
      assertConditionTrue(
        or(truePromise, falsePromise),
        done
      );
    });

    it('`false OR false` should evaluate false', function (done) {
      assertConditionFalse(
        or(falsePromise, falsePromise),
        done
      )
    });

    it('`true OR REJECTED` should need to be caught', function (done) {
      assertConditionRejected(
        or(truePromise, rejectPromise),
        done
      )
    });

    it('`REJECTED OR true` should need to be caught', function (done) {
      assertConditionRejected(
        or(rejectPromise, truePromise),
        done
      )
    });

    it('`false OR REJECTED` should need to be caught', function (done) {
      assertConditionRejected(
        or(falsePromise, rejectPromise),
        done
      )
    });

    it('`REJECTED OR false` should need to be caught', function (done) {
      assertConditionRejected(
        or(rejectPromise, falsePromise),
        done
      )
    });

    it('No arguments should need to be caught', function (done) {
      assertConditionRejected(
        or(),
        done
      )
    });

    it('Should work in an if statement with await syntax', async function () {
      if (await or(truePromise, falsePromise)) {
        assert.ok(true);
      }
      else {
        assert.ok(false);
      }
    });

  });

  describe('#not()', function () {

    it('`NOT false` should evaluate true', function (done) {
      assertConditionTrue(
        not(falsePromise),
        done
      );
    });

    it('`NOT true` should evaluate false', function (done) {
      assertConditionFalse(
        not(truePromise),
        done
      );
    });

    it('`NOT REJECTED` should need to be caught', function (done) {
      assertConditionRejected(
        not(rejectPromise),
        done
      );
    });

    it('Multiple arguments should need to be caught', function (done) {
      assertConditionRejected(
        not(truePromise, falsePromise),
        done
      )
    });

    it('No arguments should need to be caught', function (done) {
      assertConditionRejected(
        not(),
        done
      )
    });

    it('Should work in an if statement with await syntax', async function () {
      if (await not(falsePromise)) {
        assert.ok(true);
      }
      else {
        assert.ok(false);
      }
    });

  });

  describe('compound statements', function () {

    it('`(true OR false) AND (false OR false)` should evaluate false', function (done) {
      assertConditionFalse(
        and(
          or(truePromise, falsePromise),
          or(falsePromise, falsePromise)
        ),
        done
      );
    });

    it('Should work in an if statement with await syntax', async function () {
      if (await not( and( or(truePromise, falsePromise), or(falsePromise, falsePromise) ) )) {
        assert.ok(true);
      }
      else {
        assert.ok(false);
      }
    });


    it('Should work in an if/else if statement with await syntax', async function () {
      if (await not( truePromise )) {
        assert.ok(false);
      }
      else if (await not( and( or(truePromise, falsePromise), or(falsePromise, falsePromise) ) )) {
        assert.ok(true);
      }
      else {
        assert.ok(false);
      }
    });

  });

});