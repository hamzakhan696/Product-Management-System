export const apiRoutes = {
  /** Auth  */
  login: "auth/login",
  logout: "auth/logout",
  /** Dashboard */
  gettotalVacant: "unitstatus/totalVacant",
  gettotalOccupied: "unitstatus/totalOccupied",
  gettotalRenovation: "unitstatus/totalRenovation",
  gettotalRent: "rental/totalrent",
  gettotalOverdue: "rental/totaloverdue",
  gettotalPaid: "rental/totalpaid",
  /**User P-Routes */
  userSignUp: "user/Signup",
  user: "user",
  getuser: `user/`,
  /**Property-Type P-Routes */
  propertytype: "propertytype",
  /*** PROPERTY P-ROUTES */
  property: "property/property/id",
  allproperty: "property/Allproperty",
  addproperty: "property",
  deleteproperty: `property/delete`,
  propertyid: "property/",
  updateproperty: `property/update/`,
  getunitByproperty: `property/units/`,
  /** Units */
  addunit: "unit",
  allunit: "unit/units/name",
  deleteunit: "unit/delete",
  editunitdetail: `unit/update/`,
  getownerByunit: `unit/owner/`,
  getunitByManager: `unit/units/`,
  getManagerByUnitId: `unit/manager/`,
  /** Unit Status */
  allunitstatus: "unitstatus",
  /* vacant **/
  vacantunit: "unit/vacant/statusid",
  /**Occupied */
  occupiedunit: "unit/occupied/statusid",
  /**Renovation */
  renovationunit: "unit/renovate/statusid",
  /** Block */
  block: "block",
  getblock: "block/getblock",
  /**Floor */
  floor: "floor",
  getfloor: "floor/getfloor",
  /**Amenities */
  addAmenities: "amenities",
  getAmenities: "amenities/allunit",
  editAmenities: `amenities/update/`,
  deleteAmenities: "amenities/delete",
  getAmenitiesByID: `amenities/all/`,
  /** Tenants */
  addTenants: "tenant",
  getTenants: "tenant/all",
  deleteTenants: "tenant/delete",
  getunittenantByproperty: "property/property/unitid/ownerid",
  getleasedetailBytenantId: `leasecontract/tenant/`,
  getOccupantsByTenantId: `occupants/`,
  /** Owner */
  addOwner: "owner/add",
  allOwner: "owner",
  /** Manager */
  addManager: "manager",
  allManager: "manager",
  /** Rental */
  addRental: "rental",
  getRentalDetailAndLeaseDetail: "rental/leasecontract",
  getunitByPropertyId: `leasecontract/property/`,
  getownertenantleaseByUnitId: `leasecontract/unit/`,
  /** Visitor */
  addVisitor: "visit",
  /**Maintaince */
  addmaintenaces: "maintenaceservice",
  getmaintenaces: "maintenaceservice",
  // complaint
  addcomplaint: "complaint",
  getcomplaint: "complaint",
  /** Uploading */
  uploadComplaint: "complaint-attachments/create",
};
