module.exports = theFunct => (req, res, next) => {

    // it will take a function and resolve it (try)
    // if failed, it will go to catch
    Promise.resolve(theFunct(req, res, next)).catch(next);
}