import { Routes, Route, Outlet, Link } from "react-router-dom";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import Dashboard from "./pages/dashboard/dashboard";
import { NotFound } from "./NotFound/Notfound";
import { Layout } from "./components/Layout/Layout";
import AddProperty from "./pages/property/property";
import PropertyDetail from "./pages/property/propertydetail";
import Addunit from "./pages/unit/unit";
import UnitDetail from "./pages/unit/unitdetail";
import AddOwner from "./pages/owner/owner";
import BlockDetail from "./pages/block/block";
import FloorDetail from "./pages/floor/floor";
import OwnerDetail from "./pages/owner/ownerdetail";
import VacantDetail from "./pages/unit/vacant unit/vacant";
import OccupiedDetail from "./pages/unit/occupied unit/occupied";
import RenovationDetail from "./pages/unit/renovation unit/renovation";
// import ProtectedRoute from "./utils/ProtectedRoute";
import AmenitiesDetail from "./pages/amenities/amenities";
import AddTenant from "./pages/tenant/tenant";
import TenantDetail from "./pages/tenant/tenantdetail";
import AddRental from "./pages/rental/rental";
import RentalDetail from "./pages/rental/rentaldetail";
import RaiseComplaint from "./pages/complaint/raisecomplaint";
import RaiseComplaintDetail from "./pages/complaint/raisecomplaintdetail";
import Visitor from "./pages/visitors/visitor";
import VisitorDetail from "./pages/visitors/visitordetail";
import Policy from "./pages/policy/policy";
import { UnderDevelopment } from "./underdevelopment/underdevelopment";

const AppRoutes = () => {
  return (
    <Routes>
      {/*Public Routes - Auth */}
      <Route path="/" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />

      <Route
        element={
          // <ProtectedRoute>
          <Layout />
          // </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="property" element={<AddProperty />} />
        <Route path="property-details" element={<PropertyDetail />} />
        <Route path="unit" element={<Addunit />} />
        <Route path="unit-detail" element={<UnitDetail />} />
        <Route path="owner" element={<AddOwner />} />
        <Route path="block-detail" element={<BlockDetail />} />
        <Route path="floor-detail" element={<FloorDetail />} />
        <Route path="owner-detail" element={<OwnerDetail />} />
        <Route path="vacant-detail" element={<VacantDetail />} />
        <Route path="occupied-detail" element={<OccupiedDetail />} />
        <Route path="renovation-detail" element={<RenovationDetail />} />
        <Route path="amenities-detail" element={<AmenitiesDetail />} />
        <Route path="tenant" element={<AddTenant />} />
        <Route path="tenant-detail" element={<TenantDetail />} />
        <Route path="rental" element={<AddRental />} />
        <Route path="rental-detail" element={<RentalDetail />} />
        <Route path="raised-complaint" element={<RaiseComplaint />} />
        <Route path="all-complaintdetail" element={<RaiseComplaintDetail />} />
        <Route path="add-visitor" element={<Visitor />} />
        <Route path="visitor-detail" element={<VisitorDetail />} />
        <Route path="add-policy" element={<Policy />} />
        <Route path="under-development" element={<UnderDevelopment />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
