export interface AccountMaltInterface {
    id: string;
    class: string;
    status: string;
    type: string;
    login: string;
    code: string;
    full: string;
    email: string;
    phone: string;
    zip: string;
    photo: string;
    hash: string;
    password: string;
    crypt: string;
    secret: string;
    lat: number;
    lon: number;
    nonce: number;
    dob: string;
    createdon: string;
    updatedon: string;
    activities: {
        [key: string]: any;
    }[];
    balances: {
        [key: string]: any;
    }[];
    contacts: {
        [key: string]: any;
    }[];
    fields: {
        [key: string]: any;
    }[];
    invitations: {
        [key: string]: any;
    }[];
    issuers: {
        [key: string]: any;
    }[];
    options: {
        [key: string]: any;
    }[];
    perms: {
        [key: string]: any;
    }[];
    rewards: {
        [key: string]: any;
    }[];
    types: {
        [key: string]: any;
    }[];
    values: {
        [key: string]: any;
    }[];
    getAccountActivity(activity_id: string): {
        [key: string]: any;
    };
    getAccountActivityByKey(k: string, v: string): {
        [key: string]: any;
    };
    getAccountBalance(balance_id: string): {
        [key: string]: any;
    };
    getAccountBalanceByKey(k: string, v: string): {
        [key: string]: any;
    };
    getAccountContact(contact_id: string): {
        [key: string]: any;
    };
    getAccountContactByKey(k: string, v: string): {
        [key: string]: any;
    };
    getAccountField(field_id: string): {
        [key: string]: any;
    };
    getAccountFieldByKey(k: string, v: string): {
        [key: string]: any;
    };
    getAccountInvitation(invite_id: string): {
        [key: string]: any;
    };
    getAccountInvitationByKey(k: string, v: string): {
        [key: string]: any;
    };
    getAccountIssuer(issuer_id: string): {
        [key: string]: any;
    };
    getAccountIssuerByKey(k: string, v: string): {
        [key: string]: any;
    };
    getAccountOption(option_id: string): {
        [key: string]: any;
    };
    getAccountOptionByKey(k: string, v: string): {
        [key: string]: any;
    };
    getAccountPerm(perm_id: string): {
        [key: string]: any;
    };
    getAccountPermByKey(k: string, v: string): {
        [key: string]: any;
    };
    getAccountReward(reward_id: string): {
        [key: string]: any;
    };
    getAccountRewardByKey(k: string, v: string): {
        [key: string]: any;
    };
    getAccountType(type_id: string): {
        [key: string]: any;
    };
    getAccountTypeByKey(k: string, v: string): {
        [key: string]: any;
    };
    getAccountValue(value_id: string): {
        [key: string]: any;
    };
    getAccountValueByKey(k: string, v: string): {
        [key: string]: any;
    };
    is2fa(): boolean;
    isPremium(): boolean;
    mergeUser(user: any): void;
}
//# sourceMappingURL=account.d.ts.map