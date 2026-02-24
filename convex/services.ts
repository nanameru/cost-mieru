import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("services")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const create = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    category: v.string(),
    provider: v.string(),
    pricingType: v.string(),
    monthlyPrice: v.optional(v.number()),
    icon: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("services", {
      ...args,
      isActive: true,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("services"),
    name: v.optional(v.string()),
    category: v.optional(v.string()),
    provider: v.optional(v.string()),
    pricingType: v.optional(v.string()),
    monthlyPrice: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const updateFields: Record<string, string | number | boolean | undefined> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        updateFields[key] = value;
      }
    }
    await ctx.db.patch(id, updateFields);
  },
});

export const remove = mutation({
  args: { id: v.id("services") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
