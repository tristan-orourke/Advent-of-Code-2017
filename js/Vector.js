class Vector{
    constructor(values) {
        this.values = values;
    }
    set values(values) {
        this._values = values;
        for(var i=0; i<values.length; i++) {
            this[i] = values[i];
        }
    }
    get values() {
        return this._values;
    }
    add(vector) {
        if (vector.values.length != this.values.length) {
            throw new Error("Trying to add vectors of different length!");
        }
        var newValues = new Array(this.values.length);
        for(var i = 0; i<vector.values.length; i++) {
            newValues[i] = this.values[i] + vector.values[i];
        }
        return new Vector(newValues);
    }
    equals(vector) {
        if (vector.values.length != this.values.length) {
            return false;
        }
        for(var i = 0; i<vector.values.length; i++) {
            if (this.values[i] != vector.values[i]) {
                return false;
            }
        }
        return true;
    }
}