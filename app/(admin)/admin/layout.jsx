import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import Footer from "@/components/admin/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function AdminLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Sidebar />
      {/* REMOVED "marginLeft: '280px'" from this div's style */}
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <main className="p-4 flex-grow-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
