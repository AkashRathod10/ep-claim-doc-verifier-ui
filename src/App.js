import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreatorDashboard from "./pages/CreatorDashboard";
import ProcessorDashboard from "./pages/ProcessorDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import ApprovedClaims from "./pages/ApprovedClaims";
import RejectedClaims from "./pages/RejectedClaims";
import Overview from "./pages/Overview";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Login Route */}
          <Route path="/" element={<Login />} />

          {/* Creator Route */}
          <Route
            path="/creator"
            element={
              <ProtectedRoute role="creator">
                <Layout>
                  <CreatorDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Processor Route */}
          <Route
            path="/processor"
            element={
              <ProtectedRoute role="processor">
                <Layout>
                  <ProcessorDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="/approved" element={
            <ProtectedRoute role="processor">
              <Layout>
                <ApprovedClaims />
              </Layout>
            </ProtectedRoute>  
           }
          />
          <Route path="/rejected" element={
            <ProtectedRoute role="processor">
              <Layout>
                <RejectedClaims />
              </Layout>
            </ProtectedRoute>  
           }
          />
          <Route path="/overview" element={
            <ProtectedRoute role="processor">
              <Layout>
                <Overview />
              </Layout>
            </ProtectedRoute>
          }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
