function onCreateTicket(state) {
    var ticketId = Ticket.createTicket(state.partner.id, state.email.body, state.email.subject);
    if (!ticketId) {
        return notify((0, _t)("Could not create the ticket"));
    }
    var cids = state.odooCompaniesParameter;
    var ticketUrl =
        State.odooServerUrl +
        "/web#id="
            .concat(
                ticketId,
                "&action=helpdesk_mail_plugin.helpdesk_ticket_action_form_edit&model=helpdesk.ticket&view_type=form"
            )
            .concat(cids);
    return openUrl(ticketUrl);
}
function onLogEmailOnTicket(state, parameters) {
    var ticketId = parameters.ticketId;
    if (State.checkLoggingState(state.email.messageId, "tickets", ticketId)) {
        state.error = logEmail(ticketId, "helpdesk.ticket", state.email);
        if (!state.error.code) {
            State.setLoggingState(state.email.messageId, "tickets", ticketId);
        }
        return updateCard(buildView(state));
    }
    return notify((0, _t)("Email already logged on the ticket"));
}
function onEmailAlreradyLoggedOnTicket() {
    return notify((0, _t)("Email already logged on the ticket"));
}
function buildTicketsView(state, card) {
    var odooServerUrl = State.odooServerUrl;
    var partner = state.partner;
    var tickets = partner.tickets;
    if (!tickets) {
        return;
    }
    var loggingState = State.getLoggingState(state.email.messageId);
    var ticketsSection = CardService.newCardSection().setHeader(
        "<b>" + (0, _t)("Tickets (%s)", tickets.length) + "</b>"
    );
    if (state.partner.id) {
        ticketsSection.addWidget(
            CardService.newTextButton()
                .setText((0, _t)("Create"))
                .setOnClickAction(actionCall(state, "onCreateTicket"))
        );
        var cids = state.odooCompaniesParameter;
        for (var _i = 0, tickets_1 = tickets; _i < tickets_1.length; _i++) {
            var ticket = tickets_1[_i];
            var ticketButton = null;
            if (loggingState["tickets"].indexOf(ticket.id) >= 0) {
                ticketButton = CardService.newImageButton()
                    .setAltText((0, _t)("Email already logged on the ticket"))
                    .setIconUrl(UI_ICONS.email_logged)
                    .setOnClickAction(actionCall(state, "onEmailAlreradyLoggedOnTicket"));
            } else {
                ticketButton = CardService.newImageButton()
                    .setAltText((0, _t)("Log the email on the ticket"))
                    .setIconUrl(UI_ICONS.email_in_odoo)
                    .setOnClickAction(
                        actionCall(state, "onLogEmailOnTicket", {
                            ticketId: ticket.id
                        })
                    );
            }
            ticketsSection.addWidget(
                createKeyValueWidget(
                    null,
                    ticket.name,
                    null,
                    null,
                    ticketButton,
                    odooServerUrl + "/web#id=".concat(ticket.id, "&model=helpdesk.ticket&view_type=form").concat(cids)
                )
            );
        }
    } else if (state.canCreatePartner) {
        ticketsSection.addWidget(
            CardService.newTextParagraph().setText((0, _t)("Save the contact to create new tickets."))
        );
    } else {
        ticketsSection.addWidget(
            CardService.newTextParagraph().setText((0, _t)("The Contact needs to exist to create Ticket."))
        );
    }
    card.addSection(ticketsSection);
    return card;
}
