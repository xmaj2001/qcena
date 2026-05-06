"use client";

import { Button, Badge, Avatar, Dropdown, Label } from "@heroui/react";
import { Search, Bell, UserPlus, PanelLeftClose, PanelLeft, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useSidebar } from "../contexts/SidebarContext";

export function TopBar() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { theme, setTheme } = useTheme();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <header className="dashboard-topbar" id="dashboard-topbar">
      <div className="dashboard-topbar__left">
        <Button
          variant="ghost"
          isIconOnly
          size="sm"
          onPress={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
        </Button>
        <h1 className="dashboard-topbar__greeting">{getGreeting()}, Kate</h1>
      </div>

      <div className="dashboard-topbar__right">
        {/* Theme Toggle */}
        <Dropdown>
          <Button
            variant="ghost"
            isIconOnly
            size="sm"
            aria-label="Change theme"
          >
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
          </Button>
          <Dropdown.Popover placement="bottom end">
            <Dropdown.Menu
              selectionMode="single"
              selectedKeys={new Set([theme ?? "dark"])}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0];
                if (selected) setTheme(String(selected));
              }}
            >
              <Dropdown.Item id="dark" textValue="Dark">
                <Label>🌙 Dark</Label>
              </Dropdown.Item>
              <Dropdown.Item id="lime" textValue="Lime">
                <Label>🍀 Lime</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>

        {/* Search */}
        <Button variant="ghost" isIconOnly size="sm" aria-label="Search">
          <Search size={18} />
        </Button>

        {/* Notifications */}
        <Badge.Anchor>
          <Button variant="ghost" isIconOnly size="sm" aria-label="Notifications">
            <Bell size={18} />
          </Button>
          <Badge color="danger" size="sm" />
        </Badge.Anchor>

        {/* Invite Button */}
        <Button variant="primary" size="sm">
          <UserPlus size={16} />
          Invite
        </Button>
      </div>
    </header>
  );
}
