import {
  BarChart3,
  Building2,
  Calendar,
  Home,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react';

export const NAVIGATION_ITEMS = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Businesses', href: '/businesses', icon: Building2 },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];