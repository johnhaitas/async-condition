## Promise Condition

### Basic Usage

#### Promise syntax

```JavaScript
// and()
and(promiseA, promiseB)
    .then(condition => {
        if (condition) {
            // do something if `A && B`
        }
        else {
            // do something else
        }
    });

// or()
or(promiseA, promiseB)
    .then(condition => {
        if (condition) {
            // do something if `A || B`
        }
        else {
            // do something else
        }
    });

// not()
not(promiseA)
    .then(condition => {
        if (condition) {
            // do something if `!A`
        }
        else {
            // do something else
        }
    });
```

#### `async` / `await` syntax
The most familiar way to use this for conditional evaluation.
```JavaScript
// and()
if (await and(promiseA, promiseB)) {
    // do something if `A && B`
}
else {
    // do something else
}

// or()
if (await or(promiseA, promiseB)) {
    // do something if `A || B`
}
else {
    // do something else
}

// not()
if (await not(promiseA)) {
    // do something if `!A`
}
else {
    // do something else
}
```

### Compound Statements
You can express compound statements without nested `await` statements.
```JavaScript
// (us && them) || (me && you) can be expressed as.
if (await or( and(us, them), and(me, you) )) {
    // do something
}

// `else if` also works
if (await not( and(us, them) )) {
    // its not `us && them`
}
else if (await and(me, you)) {
    // its `me && you`
}
else {
    // who knows?
}
```

## Acknowledgements

Massive credit and thanks to [@patgoley](https://github.com/patgoley) for his collaboration.
