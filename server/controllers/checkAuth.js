module.exports.checkAuth = async function(token) {
    if (token) {
        return token.split(' ')[1] === 'null' ? false : true;
    } else {
        return false
    }
}