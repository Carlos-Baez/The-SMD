import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BusinessList } from "@/components/business/BusinessList";

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<div>Dashboard Home</div>} />
          <Route path="/businesses" element={<BusinessList />} />
          {/* Add more routes as needed */}
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
