function buildView(state) {
    var card = CardService.newCardBuilder();
    if (state.error.code) {
        buildErrorView(state, card);
    }
    buildPartnerView(state, card);
    buildCompanyView(state, card);
    buildCardActionsView(state, card);
    if (!State.isLogged) {
        card.setFixedFooter(
            CardService.newFixedFooter().setPrimaryButton(
                CardService.newTextButton()
                    .setText((0, _t)("Login"))
                    .setBackgroundColor("#00A09D")
                    .setOnClickAction(actionCall(state, "buildLoginMainView"))
            )
        );
    }
    return card.build();
}
