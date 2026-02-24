import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByUserMonth = query({
  args: { userId: v.id("users"), month: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("budgets")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", args.userId).eq("month", args.month)
      )
      .first();
  },
});

export const set = mutation({
  args: {
    userId: v.id("users"),
    month: v.string(),
    totalBudget: v.number(),
    categoryBudgets: v.optional(
      v.array(
        v.object({
          category: v.string(),
          amount: v.number(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("budgets")
      .withIndex("by_user_month", (q) =>
        q.eq("userId", args.userId).eq("month", args.month)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        totalBudget: args.totalBudget,
        categoryBudgets: args.categoryBudgets,
      });
      return existing._id;
    }

    return await ctx.db.insert("budgets", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
