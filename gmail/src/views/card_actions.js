function onLogout(state) {
    resetAccessToken();
    clearTranslationCache();
    var _a = Partner.enrichPartner(state.email.contactEmail, state.email.contactName),
        partner = _a[0],
        odooUserCompanies = _a[1],
        canCreatePartner = _a[2],
        canCreateProject = _a[3],
        error = _a[4];
    var newState = new State(
        partner,
        canCreatePartner,
        state.email,
        odooUserCompanies,
        null,
        null,
        canCreateProject,
        error
    );
    return pushToRoot(buildView(newState));
}
function buildCardActionsView(state, card) {
    var canContactOdooDatabase = state.error.canContactOdooDatabase && State.isLogged;
    if (State.isLogged) {
        card.addCardAction(
            CardService.newCardAction()
                .setText((0, _t)("Logout"))
                .setOnClickAction(actionCall(state, "onLogout"))
        );
    }
    card.addCardAction(
        CardService.newCardAction()
            .setText((0, _t)("Debug"))
            .setOnClickAction(actionCall(state, "buildDebugView"))
    );
}
