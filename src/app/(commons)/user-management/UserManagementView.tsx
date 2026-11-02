"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Shield,
  Clock,
  UserX,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Mail,
  User,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  HelpCircle,
  X,
  CheckCircle2,
  Trash2,
} from "lucide-react";

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  roleType: "admin" | "finance" | "operations" | "standard";
  address?: string;
  passwordHint?: string;
  status: "Active" | "Pending" | "Suspended";
  lastActive: string;
  avatarInitials: string;
}

export const AVAILABLE_ROLES = [
  "System Administrator",
  "Financial Controller",
  "Supply Chain Manager",
  "Inventory Supervisor",
  "Human Resources Lead",
  "General ERP Staff",
] as const;

interface UserManagementViewProps {
  initialUsers: ManagedUser[];
}

export default function UserManagementView({
  initialUsers,
}: UserManagementViewProps) {
  const [users, setUsers] = useState<ManagedUser[]>(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "System Administrator",
    address: "",
    password: "",
    passwordHint: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  // Role Type Helper
  const getRoleType = (role: string): ManagedUser["roleType"] => {
    const r = role.toLowerCase();
    if (r.includes("admin")) return "admin";
    if (r.includes("finance") || r.includes("controller") || r.includes("account"))
      return "finance";
    if (r.includes("supply") || r.includes("warehouse") || r.includes("operations"))
      return "operations";
    return "standard";
  };

  // Avatar Initials Helper
  const getInitials = (fullName: string): string => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (parts[0]?.slice(0, 2) || "U").toUpperCase();
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "User email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newUser: ManagedUser = {
      id: `usr-${String(users.length + 1).padStart(2, "0")}`,
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim() || undefined,
      role: formData.role,
      roleType: getRoleType(formData.role),
      address: formData.address.trim() || undefined,
      passwordHint: formData.passwordHint.trim() || undefined,
      status: "Active",
      lastActive: "Just now",
      avatarInitials: getInitials(formData.name),
    };

    setUsers((prev) => [newUser, ...prev]);
    setIsModalOpen(false);

    // Reset Form
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "System Administrator",
      address: "",
      password: "",
      passwordHint: "",
    });
    setFormErrors({});

    // Success Notification
    setSuccessMessage(`User "${newUser.name}" has been created successfully!`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4500);
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name}?`)) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setSuccessMessage(`User "${name}" has been removed.`);
      setTimeout(() => setSuccessMessage(null), 3500);
    }
  };

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole =
      roleFilter === "all" ||
      u.role.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      {/* Toast Notification */}
      {successMessage && (
        <div className="mx-6 sm:mx-8 mt-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-medium">{successMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-600 hover:text-emerald-900 cursor-pointer p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Header Area */}
      <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#93032E] tracking-tight">
              User Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {users.length} Total Users
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage enterprise identity, role assignments, security permissions, and workspace access.
          </p>
        </div>

        {/* Functional + Add New User Button */}
        <div>
          <button
            type="button"
            onClick={() => {
              setFormErrors({});
              setIsModalOpen(true);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#93032E] hover:bg-[#a80e3b] active:bg-[#780225] text-white text-sm font-semibold shadow-sm hover:shadow transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#93032E]/40"
          >
            <Plus className="w-4 h-4" />
            <span>Add New User</span>
          </button>
        </div>
      </div>

      {/* Search, Filter, and Controls Bar */}
      <div className="p-4 sm:px-8 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or role..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#93032E]/30 focus:border-[#93032E]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent text-slate-700 font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Roles</option>
              {AVAILABLE_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span>Active List</span>
          </div>
        </div>
      </div>

      {/* Table Structure */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
              <th scope="col" className="px-6 py-3.5">
                Name
              </th>
              <th scope="col" className="px-6 py-3.5">
                Email
              </th>
              <th scope="col" className="px-6 py-3.5">
                Role
              </th>
              <th scope="col" className="px-6 py-3.5">
                Status
              </th>
              <th scope="col" className="px-6 py-3.5 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 bg-white text-sm">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  <div className="max-w-xs mx-auto flex flex-col items-center">
                    <UserX className="w-10 h-10 text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-800">No users found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      No matching records for &quot;{searchQuery}&quot;. Try adjusting your filter or click &quot;+ Add New User&quot;.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* Name Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#93032E]/10 text-[#93032E] font-bold text-xs flex items-center justify-center shrink-0 border border-[#93032E]/20">
                        {user.avatarInitials}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-[#93032E] transition-colors">
                          {user.name}
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          ID: {user.id}
                          {user.phone ? ` • ${user.phone}` : ""}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Email Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-slate-600 font-mono text-xs">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{user.email}</span>
                    </div>
                  </td>

                  {/* Role Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
                        user.roleType === "admin"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : user.roleType === "finance"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : user.roleType === "operations"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      <Shield className="w-3 h-3" />
                      {user.role}
                    </span>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.status === "Active" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                      </span>
                    ) : user.status === "Pending" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-500" />
                        Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-300">
                        <UserX className="w-3 h-3 text-slate-400" />
                        Suspended
                      </span>
                    )}
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(user.id, user.name)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete user"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination & Summary Footer */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-800">1</span> to{" "}
          <span className="font-semibold text-slate-800">{filteredUsers.length}</span> of{" "}
          <span className="font-semibold text-slate-800">{users.length}</span> entries
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-slate-200 bg-white text-slate-400 cursor-not-allowed text-xs font-medium"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Previous
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded bg-[#93032E] text-white text-xs font-semibold shadow-xs"
          >
            1
          </button>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-slate-200 bg-white text-slate-400 cursor-not-allowed text-xs font-medium"
          >
            Next
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ADD NEW USER MODAL FORM                                   */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-0 duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#93032E]/10 border border-[#93032E]/20 text-[#93032E] flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Add New User
                  </h2>
                  <p className="text-xs text-slate-500">
                    Enter enterprise credentials and assign role permissions.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: The Add User Form */}
            <form onSubmit={handleAddUserSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name <span className="text-[#93032E]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-9 pr-3.5 py-2 text-sm bg-white border rounded-lg text-slate-900 focus:outline-none focus:ring-2 ${
                        formErrors.name
                          ? "border-red-400 focus:ring-red-200"
                          : "border-slate-300 focus:ring-[#93032E]/30 focus:border-[#93032E]"
                      }`}
                    />
                  </div>
                  {formErrors.name && (
                    <p className="text-[11px] text-red-600 mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* 2. User Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    User Email <span className="text-[#93032E]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-9 pr-3.5 py-2 text-sm bg-white border rounded-lg text-slate-900 focus:outline-none focus:ring-2 ${
                        formErrors.email
                          ? "border-red-400 focus:ring-red-200"
                          : "border-slate-300 focus:ring-[#93032E]/30 focus:border-[#93032E]"
                      }`}
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-[11px] text-red-600 mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 3. Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#93032E]/30 focus:border-[#93032E]"
                    />
                  </div>
                </div>

                {/* 4. Role */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Assigned Role <span className="text-[#93032E]">*</span>
                  </label>
                  <div className="relative">
                    <Shield className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#93032E]/30 focus:border-[#93032E] cursor-pointer"
                    >
                      {AVAILABLE_ROLES.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 5. Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Physical / Office Address
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <textarea
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#93032E]/30 focus:border-[#93032E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 6. Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Account Password <span className="text-[#93032E]">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-9 pr-10 py-2 text-sm bg-white border rounded-lg text-slate-900 focus:outline-none focus:ring-2 ${
                        formErrors.password
                          ? "border-red-400 focus:ring-red-200"
                          : "border-slate-300 focus:ring-[#93032E]/30 focus:border-[#93032E]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {formErrors.password && (
                    <p className="text-[11px] text-red-600 mt-1">
                      {formErrors.password}
                    </p>
                  )}
                </div>

                {/* 7. Password Hint */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Password Hint
                  </label>
                  <div className="relative">
                    <HelpCircle className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      name="passwordHint"
                      value={formData.passwordHint}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#93032E]/30 focus:border-[#93032E]"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#93032E] hover:bg-[#a80e3b] active:bg-[#780225] rounded-lg shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create User</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

