"use client";

import { Avatar, Tooltip, Separator } from "@heroui/react";
import {
  LayoutDashboard,
  ShoppingCart,
  Target,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSidebar } from "../contexts/SidebarContext";
import "../styles/dashboard.css";
const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  LayoutDashboard,
  ShoppingCart,
  Target,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { id: "orders", label: "Orders", icon: "ShoppingCart" },
  { id: "tracker", label: "Tracker", icon: "Target", badge: "New" },
  { id: "analytics", label: "Analytics", icon: "BarChart3" },
  { id: "settings", label: "Settings", icon: "Settings" },
];

const footerItems = [
  { id: "help", label: "Help & Information", icon: "HelpCircle" },
  { id: "logout", label: "Log out", icon: "LogOut" },
];

interface NavItemProps {
  id: string;
  label: string;
  iconName: string;
  badge?: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}

function NavItem({
  id,
  label,
  iconName,
  badge,
  isActive,
  isCollapsed,
  onClick,
}: NavItemProps) {
  const Icon = iconMap[iconName];

  const content = (
    <button
      type="button"
      id={`sidebar-nav-${id}`}
      className={`sidebar-nav-item ${isActive ? "sidebar-nav-item--active" : ""}`}
      onClick={onClick}
    >
      <span className="sidebar-nav-item__icon">
        {Icon && <Icon size={20} />}
      </span>
      <span className="sidebar-nav-item__label">{label}</span>
      {badge && <span className="sidebar-badge-new">{badge}</span>}
    </button>
  );

  if (isCollapsed) {
    return (
      <Tooltip delay={0}>
        <Tooltip.Trigger>{content}</Tooltip.Trigger>
        <Tooltip.Content placement="right">{label}</Tooltip.Content>
      </Tooltip>
    );
  }

  return content;
}

export function Sidebar() {
  const { isCollapsed, toggleSidebar, activeItem, setActiveItem } =
    useSidebar();

  return (
    <aside
      className={`dashboard-sidebar ${isCollapsed ? "dashboard-sidebar--collapsed" : "dashboard-sidebar--expanded"}`}
    >
      {/* Collapse Toggle */}
      <div style={{ position: "relative" }}>
        <button
          type="button"
          className="sidebar-collapse-btn"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Profile */}
      <div className="sidebar-profile">
        <Avatar size="md">
          <Avatar.Image
            src="https://i.pravatar.cc/150?u=kate"
            alt="Kate Moore"
          />
          <Avatar.Fallback>KM</Avatar.Fallback>
        </Avatar>
        <div className="sidebar-profile__info">
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--foreground)" }}
          >
            Kate Moore
          </p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Admin
          </p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-0.5 px-3 mt-2 flex-1">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            id={item.id}
            label={item.label}
            iconName={item.icon}
            badge={item.badge}
            isActive={activeItem === item.id}
            isCollapsed={isCollapsed}
            onClick={() => setActiveItem(item.id)}
          />
        ))}
      </nav>

      {/* Footer Items */}
      <div className="px-3 pb-4">
        <Separator className="my-2" />
        <div className="flex flex-col gap-0.5">
          {footerItems.map((item) => (
            <NavItem
              key={item.id}
              id={item.id}
              label={item.label}
              iconName={item.icon}
              isActive={activeItem === item.id}
              isCollapsed={isCollapsed}
              onClick={() => setActiveItem(item.id)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
