import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import {
  Login,
  Dashboard,
  Unauthorized,
  ResetPassword,
  ForgotPassword,
  VerificationCode,
} from "./pages";
import { ProtectedRoute, PublicRoute, ToasterComponent } from "./components";
import {
  OnboardingStepper,
  SignUp,
  CreateCompany,
  Invite,
  Confirm,
} from "./pages/onboarding";
import LandingPage from "./pages/landing page/LandingPage";

function App() {
  return (
    <>
      <ToasterComponent />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Onboarding routes [Company Owners - new users] */}
          <Route path="/onboarding/*" element={<OnboardingStepper />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="create-company" element={<CreateCompany />} />
            <Route path="invite" element={<Invite />} />
            <Route path="confirm" element={<Confirm />} />
          </Route>

          {/* Forgot/Reset/Verify */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-code" element={<VerificationCode />} />

          {/* Main app */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
