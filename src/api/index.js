import * as AuthAPI from "./auth";
import * as CompanyAPI from "./company";
import * as ContactAPI from "./contacts";
import * as DealAPI from "./deals";
import * as OrderAPI from "./orders";
import * as RoleAPI from "./roles";
import * as TicketAPI from "./tickets";
import * as ProfileAPI from "./profile";
import * as AnalyticsAPI from "./analytics";
import * as MiscAPI from "./misc";

export const API = {
  Auth: AuthAPI,
  Company: CompanyAPI,
  Contact: ContactAPI,
  Deal: DealAPI,
  Order: OrderAPI,
  Role: RoleAPI,
  Ticket: TicketAPI,
  Profile: ProfileAPI,
  Analytics: AnalyticsAPI,
  Misc: MiscAPI,
};
