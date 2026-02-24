import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listByUserMonth = query({
  args: { userId: v.id("users"), month: v.string() },
  handler: async (ctx, args) => {
    const expenses = await ctx.db
      .query("expenses")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", args.userId).eq("month", args.month)
      )
      .collect();

    const expensesWithService = await Promise.all(
      expenses.map(async (expense) => {
        const service = await ctx.db.get(expense.serviceId);
        return {
          ...expense,
          serviceName: service?.name ?? "不明",
          serviceCategory: service?.category ?? "other",
        };
      })
    );

    return expensesWithService;
  },
});

export const getMonthlyTotals = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const allExpenses = await ctx.db
      .query("expenses")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const monthlyMap = new Map<string, number>();
    for (const expense of allExpenses) {
      const current = monthlyMap.get(expense.month) ?? 0;
      monthlyMap.set(expense.month, current + expense.amount);
    }

    const result = Array.from(monthlyMap.entries())
      .map(([month, total]) => ({ month, total }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-12);

    return result;
  },
});

export const getServiceDistribution = query({
  args: { userId: v.id("users"), month: v.string() },
  handler: async (ctx, args) => {
    const expenses = await ctx.db
      .query("expenses")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", args.userId).eq("month", args.month)
      )
      .collect();

    const serviceMap = new Map<
      string,
      { serviceName: string; total: number; category: string }
    >();

    for (const expense of expenses) {
      const service = await ctx.db.get(expense.serviceId);
      const key = expense.serviceId;
      const existing = serviceMap.get(key);
      if (existing) {
        existing.total += expense.amount;
      } else {
        serviceMap.set(key, {
          serviceName: service?.name ?? "不明",
          total: expense.amount,
          category: service?.category ?? "other",
        });
      }
    }

    return Array.from(serviceMap.values());
  },
});

export const getDashboardStats = query({
  args: { userId: v.id("users"), month: v.string() },
  handler: async (ctx, args) => {
    const thisMonthExpenses = await ctx.db
      .query("expenses")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", args.userId).eq("month", args.month)
      )
      .collect();

    const thisMonthTotal = thisMonthExpenses.reduce(
      (sum, e) => sum + e.amount,
      0
    );

    // 前月
    const [year, monthNum] = args.month.split("-").map(Number);
    const prevDate = new Date(year, monthNum - 2, 1);
    const prevMonth = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, "0")}`;

    const prevMonthExpenses = await ctx.db
      .query("expenses")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", args.userId).eq("month", prevMonth)
      )
      .collect();

    const prevMonthTotal = prevMonthExpenses.reduce(
      (sum, e) => sum + e.amount,
      0
    );

    const changePercent =
      prevMonthTotal > 0
        ? Math.round(((thisMonthTotal - prevMonthTotal) / prevMonthTotal) * 100)
        : 0;

    const services = await ctx.db
      .query("services")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const activeServices = services.filter((s) => s.isActive).length;

    const budget = await ctx.db
      .query("budgets")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", args.userId).eq("month", args.month)
      )
      .first();

    const budgetRemaining = budget
      ? budget.totalBudget - thisMonthTotal
      : null;

    return {
      thisMonthTotal,
      prevMonthTotal,
      changePercent,
      activeServices,
      budgetRemaining,
      expenseCount: thisMonthExpenses.length,
    };
  },
});

export const create = mutation({
  args: {
    userId: v.id("users"),
    serviceId: v.id("services"),
    amount: v.number(),
    date: v.string(),
    note: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const month = args.date.substring(0, 7);
    return await ctx.db.insert("expenses", {
      ...args,
      month,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("expenses"),
    amount: v.optional(v.number()),
    date: v.optional(v.string()),
    note: v.optional(v.string()),
    serviceId: v.optional(v.id("services")),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const updateFields: Record<string, string | number | undefined> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        updateFields[key] = value as string | number;
      }
    }
    if (fields.date) {
      updateFields.month = fields.date.substring(0, 7);
    }
    await ctx.db.patch(id, updateFields);
  },
});

export const remove = mutation({
  args: { id: v.id("expenses") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
