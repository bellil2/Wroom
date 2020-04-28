module.exports.VerifierEstConnecter = function (request, response, next) {
    if (!request.session.isConnected) {
        response.redirect('/');
        return;
    }

    next();
}