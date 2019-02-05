const promisify = val => (typeof val === 'function') ? Promise.resolve().then(val) : Promise.resolve(val),
    promiseAll = conditions => Promise.all(conditions.map(promisify));

module.exports = {
    not: (...conditions) => conditions.length === 1 ? promisify(conditions[0]).then(value => !value) : Promise.reject('You must provide exactly 1 argument to not()'),
    and: (...conditions) => conditions.length ? promiseAll(conditions).then(values => values.reduce((acc, v) => acc && v, true)) : Promise.reject('You must provide arguments to and()'),
    or: (...conditions) => conditions.length ? promiseAll(conditions).then(values => values.reduce((acc, v) => acc || v, false)) : Promise.reject('You must provide arguments to or()')
};
