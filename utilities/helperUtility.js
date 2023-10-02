function removeNewLineCharacters(value) {
    if (!value) {
        return value;
    }
    return value.toString().replace(/\n|\r|\t/g, "");
}

module.exports = { removeNewLineCharacters }