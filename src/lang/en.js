/*
 * **************************************************************************************
 *  Copyright © 2014-2018 Ontology Foundation Ltd.
 *  All rights reserved.
 *
 *  This software is supplied only under the terms of a license agreement,
 *  nondisclosure agreement or other written agreement with Ontology Foundation Ltd.
 *  Use, redistribution or other disclosure of any parts of this
 *  software is prohibited except in accordance with the terms of such written
 *  agreement with Ontology Foundation Ltd. This software is confidential
 *  and proprietary information of Ontology Foundation Ltd.
 *
 * **************************************************************************************
 *
 */

import enmus from "./enums.en";
import errors from "./errors.en";
import * as terms from "./terms.en";

export default {
  enums: enmus,
  errors: errors,
  mainPage: {
    myAssets: "MY ASSETS",
    total: "Total Assets",
  },
  common: {
    ok: "OK",
    cancel: "Cancel",
    confirm: "Confirm",
  },
  navbar: {
    logOut: "Log Out",
    dashboard: "Dashboard",
    github: "Github",
    screenfull: "Screenfull",
    theme: "Theme",
    size: "Global Size",
    help: "Need Help?",
  },
  help: {
    tit: "Help",
    txt:
      "For any support or inquiries, please email us at support@oncustodian.com or give us a call at +65 6909 9350",
  },
  footer: {
    company: "Onchain Custodian Home",
    terms: "Terms and Conditions",
    termsTit: "Terms and Conditions",
    termsTxt: terms.TERMS_TEXT,
    policy: "Privacy Policy",
    policyTit: "Privacy Policy",
    policyTxt: terms.POLICY_TEXT,
    agreement: "User Agreement",
    agreementTit: "User Agreement",
    agreementTxt: terms.AGREEMENT_TEXT,
    copyright: "© 2018 Onchain Custodian Pte.Ltd",
  },
  login: {
    title: "LOG IN",
    title2: "AUTHENTICATE",
    title3: "Reviewing Information",
    logIn: "Log in",
    username: "Username",
    password: "Password",
    contactUsTit: "Contact Us: ",
    contactUsTxt: "+65 6909 9350",
    emailTit: "Email: ",
    emailTxt: "support@oncustodian.com",
    any: "any",
    inputUserName: "Please input the correct account name",
    thirdparty: "Or connect with",
    thirdpartyTips:
      "Can not be simulated on local, so please combine you own business simulation! ! !",
  },
};
