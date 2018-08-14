function Model() {
    this.data = [];
}

Model.prototype.isUnique = function(value) {
    if (this.data.indexOf(value) === -1) {
        return true;
    } else {
        return false;
    }
};

Model.prototype.getIndex = function(value) {
    return this.data.indexOf(value);
};

Model.prototype.add = function(value) {
    this.data.push(value);
};

Model.prototype.edit = function(index, value) {
    this.data[index] = value;
};

Model.prototype.delete = function(value) {
    var index = this.getIndex(value);
    this.data.splice(index, 1);
};
