import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Plants from "./pages/Plants";
import PlantDetail from "./pages/PlantDetail";
import { CareList, MethodList, DIYList } from "./pages/Lists";
import { CareDetail, MethodDetail } from "./pages/Articles";
import { Login, Register } from "./pages/AuthPages";
import MyGarden from "./pages/MyGarden";
import Diagnose from "./pages/Diagnose";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-page grow py-8 md:py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/plants/:slug" element={<PlantDetail />} />
        <Route path="/plantcare" element={<CareList />} />
        <Route path="/plantcare/:slug" element={<CareDetail />} />
        <Route path="/methods" element={<MethodList />} />
        <Route path="/methods/:slug" element={<MethodDetail />} />
        <Route path="/diy" element={<DIYList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/my-garden" element={<MyGarden />} />
          <Route path="/diagnose" element={<Diagnose />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
