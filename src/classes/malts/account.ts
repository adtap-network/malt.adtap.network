import Malt from "../malt";
import { AccountMaltInterface } from "../../interfaces/malts/account";

export default class AccountMalt extends Malt implements AccountMaltInterface {

    id: string = '';
    class: string = 'individual';
    status: string = 'new';
    type: string = 'standard';
    login: string = '';
    code: string = '';
    full: string = '';
    email: string = '';
    phone: string = '';
    zip: string = '';
    photo: string = '';
    hash: string = '';
    password: string = '';
    crypt: string = '';
    secret: string = '';
    lat: number = 0;
    lon: number = 0;
    nonce: number = 1;
    dob: string = '';
    createdon: string = '';
    updatedon: string = '';

    activities: {[key: string]: any}[] = [];
    balances: {[key: string]: any}[] = [];
    contacts: {[key: string]: any}[] = [];
    fields: {[key: string]: any}[] = [];
    invitations: {[key: string]: any}[] = [];
    issuers: {[key: string]: any}[] = [];
    options: {[key: string]: any}[] = [];
    perms: {[key: string]: any}[] = [];
    rewards: {[key: string]: any}[] = [];
    types: {[key: string]: any}[] = [];
    values: {[key: string]: any}[] = [];

    constructor() { super({}); }

    getAccountActivity(activity_id: string): { [key: string]: any } { return this.getAccountActivityByKey('activity_id', activity_id); }

    getAccountActivityByKey(k: string, v: string): { [key: string]: any } { return this.getObjectByKey(this.activities, k, v); }

    getAccountBalance(balance_id: string): { [key: string]: any } { return this.getAccountBalanceByKey('balance_id', balance_id); }

    getAccountBalanceByKey(k: string, v: string): { [key: string]: any } { return this.getObjectByKey(this.balances, k, v); }

    getAccountContact(contact_id: string): { [key: string]: any } { return this.getAccountContactByKey('contact_id', contact_id); }

    getAccountContactByKey(k: string, v: string): { [key: string]: any } { return this.getObjectByKey(this.contacts, k, v); }

    getAccountField(field_id: string): { [key: string]: any } { return this.getAccountFieldByKey('field_id', field_id); }

    getAccountFieldByKey(k: string, v: string): { [key: string]: any } { return this.getObjectByKey(this.fields, k, v); }

    getAccountInvitation(invite_id: string): { [key: string]: any } { return this.getAccountInvitationByKey('invite_id', invite_id); }

    getAccountInvitationByKey(k: string, v: string): { [key: string]: any } { return this.getObjectByKey(this.invitations, k, v); }

    getAccountIssuer(issuer_id: string): { [key: string]: any } { return this.getAccountIssuerByKey('issuer_id', issuer_id); }

    getAccountIssuerByKey(k: string, v: string): { [key: string]: any } { return this.getObjectByKey(this.issuers, k, v); }

    getAccountOption(option_id: string): { [key: string]: any } { return this.getAccountOptionByKey('option_id', option_id); }

    getAccountOptionByKey(k: string, v: string): { [key: string]: any } { return this.getObjectByKey(this.options, k, v); }

    getAccountPerm(perm_id: string): { [key: string]: any } { return this.getAccountPermByKey('perm_id', perm_id); }

    getAccountPermByKey(k: string, v: string): { [key: string]: any } { return this.getObjectByKey(this.perms, k, v); }

    getAccountReward(reward_id: string): { [key: string]: any } { return this.getAccountRewardByKey('reward_id', reward_id); }

    getAccountRewardByKey(k: string, v: string): { [key: string]: any } { return this.getObjectByKey(this.rewards, k, v); }

    getAccountType(type_id: string): { [key: string]: any } { return this.getAccountTypeByKey('type_id', type_id); }

    getAccountTypeByKey(k: string, v: string): { [key: string]: any } { return this.getObjectByKey(this.types, k, v); }

    getAccountValue(value_id: string): { [key: string]: any } { return this.getAccountValueByKey('value_id', value_id); }

    getAccountValueByKey(k: string, v: string): { [key: string]: any } { return this.getObjectByKey(this.values, k, v); }

    is2fa(): boolean {
        let p = false;
        let f = this.getAccountFieldByKey('field_key', '2fa');
        if(this.isSet(f, 'field_id')) {
            let o = this.getAccountValueByKey('value_field', f.field_id);
            if(this.isSet(o, 'value_id')) {
                let p = Boolean(o['value_free']);
            }
        }
        return p;
    }

    isPremium(): boolean {
        let p = false;
        let f = this.getAccountFieldByKey('field_key', 'premium');
        if(this.isSet(f, 'field_id')) {
            let o = this.getAccountValueByKey('value_field', f.field_id);
            if(this.isSet(o, 'value_id')) {
                let p = Boolean(o['value_free']);
            }
        }
        return p;
    }

    mergeUser(user: any): void {
        if(this.isObject(user)) {
            if(this.isSet(user, 'id')) { this.id = user['id']; }
            if(this.isSet(user, 'email')) { this.email = user['email']; }
            if(this.isSet(user, 'name')) { this.full = user['name']; }
        }
    }
}