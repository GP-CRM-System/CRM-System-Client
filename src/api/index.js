import * as AuthAPI from "./auth";
import * as CompanyAPI from "./company";
import * as ContactAPI from "./contacts";
import * as DealAPI from "./deals";
import * as OrderAPI from "./orders";
import * as RoleAPI from "./roles";

export const API = {
  Auth: AuthAPI,
  Company: CompanyAPI,
  Contact: ContactAPI,
  Deal: DealAPI,
  Order: OrderAPI,
  Role: RoleAPI,
};
