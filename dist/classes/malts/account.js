import Malt from "../malt";
export default class AccountMalt extends Malt {
    id = '';
    class = 'individual';
    status = 'new';
    type = 'standard';
    login = '';
    code = '';
    full = '';
    email = '';
    phone = '';
    zip = '';
    photo = '';
    hash = '';
    password = '';
    crypt = '';
    secret = '';
    lat = 0;
    lon = 0;
    nonce = 1;
    dob = '';
    createdon = '';
    updatedon = '';
    activities = [];
    balances = [];
    contacts = [];
    fields = [];
    invitations = [];
    issuers = [];
    options = [];
    perms = [];
    rewards = [];
    types = [];
    values = [];
    constructor() { super({}); }
    getAccountActivity(activity_id) { return this.getAccountActivityByKey('activity_id', activity_id); }
    getAccountActivityByKey(k, v) { return this.getObjectByKey(this.activities, k, v); }
    getAccountBalance(balance_id) { return this.getAccountBalanceByKey('balance_id', balance_id); }
    getAccountBalanceByKey(k, v) { return this.getObjectByKey(this.balances, k, v); }
    getAccountContact(contact_id) { return this.getAccountContactByKey('contact_id', contact_id); }
    getAccountContactByKey(k, v) { return this.getObjectByKey(this.contacts, k, v); }
    getAccountField(field_id) { return this.getAccountFieldByKey('field_id', field_id); }
    getAccountFieldByKey(k, v) { return this.getObjectByKey(this.fields, k, v); }
    getAccountInvitation(invite_id) { return this.getAccountInvitationByKey('invite_id', invite_id); }
    getAccountInvitationByKey(k, v) { return this.getObjectByKey(this.invitations, k, v); }
    getAccountIssuer(issuer_id) { return this.getAccountIssuerByKey('issuer_id', issuer_id); }
    getAccountIssuerByKey(k, v) { return this.getObjectByKey(this.issuers, k, v); }
    getAccountOption(option_id) { return this.getAccountOptionByKey('option_id', option_id); }
    getAccountOptionByKey(k, v) { return this.getObjectByKey(this.options, k, v); }
    getAccountPerm(perm_id) { return this.getAccountPermByKey('perm_id', perm_id); }
    getAccountPermByKey(k, v) { return this.getObjectByKey(this.perms, k, v); }
    getAccountReward(reward_id) { return this.getAccountRewardByKey('reward_id', reward_id); }
    getAccountRewardByKey(k, v) { return this.getObjectByKey(this.rewards, k, v); }
    getAccountType(type_id) { return this.getAccountTypeByKey('type_id', type_id); }
    getAccountTypeByKey(k, v) { return this.getObjectByKey(this.types, k, v); }
    getAccountValue(value_id) { return this.getAccountValueByKey('value_id', value_id); }
    getAccountValueByKey(k, v) { return this.getObjectByKey(this.values, k, v); }
    is2fa() {
        let p = false;
        let f = this.getAccountFieldByKey('field_key', '2fa');
        if (this.isSet(f, 'field_id')) {
            let o = this.getAccountValueByKey('value_field', f.field_id);
            if (this.isSet(o, 'value_id')) {
                let p = Boolean(o['value_free']);
            }
        }
        return p;
    }
    isPremium() {
        let p = false;
        let f = this.getAccountFieldByKey('field_key', 'premium');
        if (this.isSet(f, 'field_id')) {
            let o = this.getAccountValueByKey('value_field', f.field_id);
            if (this.isSet(o, 'value_id')) {
                let p = Boolean(o['value_free']);
            }
        }
        return p;
    }
    mergeUser(user) {
        if (this.isObject(user)) {
            if (this.isSet(user, 'id')) {
                this.id = user['id'];
            }
            if (this.isSet(user, 'email')) {
                this.email = user['email'];
            }
            if (this.isSet(user, 'name')) {
                this.full = user['name'];
            }
        }
    }
}
//# sourceMappingURL=account.js.map