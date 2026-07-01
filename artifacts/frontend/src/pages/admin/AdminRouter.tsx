import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { adminApi } from "../../lib/adminApi";
import AdminLogin from "./AdminLogin";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import AdminContent from "./AdminContent";
import AdminCollections from "./AdminCollections";

export default function AdminRouter() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    adminApi.session().then(s => setAuthenticated(s.authenticated)).catch(() => setAuthenticated(false));
  }, []);

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <AdminLayout onLogout={() => setAuthenticated(false)}>
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/content" component={AdminContent} />
        <Route path="/admin/collections" component={AdminCollections} />
      </Switch>
    </AdminLayout>
  );
}
