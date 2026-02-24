import type { Id } from "../convex/_generated/dataModel";

export interface User {
  _id: Id<"users">;
  clerkId: string;
  name: string;
  email: string;
  monthlyBudget?: number;
  createdAt: number;
}

export interface Service {
  _id: Id<"services">;
  userId: Id<"users">;
  name: string;
  category: string;
  provider: string;
  pricingType: string;
  monthlyPrice?: number;
  icon?: string;
  isActive: boolean;
  createdAt: number;
}

export interface Expense {
  _id: Id<"expenses">;
  userId: Id<"users">;
  serviceId: Id<"services">;
  amount: number;
  date: string;
  month: string;
  note?: string;
  createdAt: number;
  serviceName?: string;
  serviceCategory?: string;
}

export interface Budget {
  _id: Id<"budgets">;
  userId: Id<"users">;
  month: string;
  totalBudget: number;
  categoryBudgets?: { category: string; amount: number }[];
  createdAt: number;
}

export interface MonthlyTotal {
  month: string;
  total: number;
}

export interface ServiceDistribution {
  serviceName: string;
  total: number;
  category: string;
}

export interface DashboardStats {
  thisMonthTotal: number;
  prevMonthTotal: number;
  changePercent: number;
  activeServices: number;
  budgetRemaining: number | null;
  expenseCount: number;
}
