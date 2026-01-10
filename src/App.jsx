import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from './pages/NotFound';
import {
    Login, Dashboard, Unauthorized, ResetPassword, VerifyReset, ForgotPassword, VerificationCode, GoogleCallback
} from "./pages";
import { ProtectedRoute, PublicRoute, ToasterComponent } from "./components";
import { OnboardingStepper, SignUp, CreateCompany, Invite, Confirm } from './pages/onboarding';
import { LandingPage } from "./pages";

function App() {
    return (
        < >
            <ToasterComponent />
            <Router>
                <Routes>

                    <Route path="/" element={<LandingPage />} />

                    <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                    <Route path="/auth/google/callback" element={<GoogleCallback />} />


                    {/* Onboarding routes [Company Owners - new users] */}
                    <Route path="/onboarding/*" element={<PublicRoute><OnboardingStepper /></PublicRoute>}>
                        <Route path="signup" element={<SignUp />} />
                        <Route path="create-company" element={<CreateCompany />} />
                        <Route path="invite" element={<Invite />} />
                        <Route path="confirm" element={<Confirm />} />
                    </Route>

                    {/* Forgot/Reset/Verify */}
                    <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
                    <Route path="/verify-reset" element={<PublicRoute><VerifyReset /></PublicRoute>} />
                    <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
                    <Route path="/verify-code" element={<PublicRoute><VerificationCode /></PublicRoute>} />

                    {/* Main app */}
                    <Route path="/dashboard/*"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } />

                    <Route path="/unauthorized" element={<Unauthorized />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
