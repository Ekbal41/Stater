class TypeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'TypeError';
        this.message = message;
    }
}

class InstanceError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InstanceError';
        this.message = message;
    }
}

class State {
    value
    onChange
    constructor(value) {
        this.value = value;
    }
    verifyValue(newValue) {
        const recievedType = typeof newValue;
        const valueType = typeof this.value;
        if (typeof newValue !== valueType) {
            throw new TypeError(
                `Expected type of ${valueType} but recieved ${recievedType}`
            );
        }
        return this.value !== newValue;
    }


    set(newValue) {
        if (this.verifyValue(newValue)) {
            this.value = newValue;
            if (this.onChange) {
                this.onChange(() => this.value);
            }
        }
    }


    get() {
        return this.value;
    }
}

function createState(value) {
    const state = new State(value);
    return state;
}


function createStateWith(
    extendedState
) {
    if (extendedState instanceof State) {
        return extendedState;
    } else {
        throw new InstanceError(
            `${extendedState} is not an instance of the State class.`
        );
    }
}


// export { State, createState, createStateWith };
