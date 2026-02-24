import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    monthlyBudget: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  services: defineTable({
    userId: v.id("users"),
    name: v.string(),
    category: v.string(),
    provider: v.string(),
    pricingType: v.string(),
    monthlyPrice: v.optional(v.number()),
    icon: v.optional(v.string()),
    isActive: v.boolean(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  expenses: defineTable({
    userId: v.id("users"),
    serviceId: v.id("services"),
    amount: v.number(),
    date: v.string(),
    month: v.string(),
    note: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_month", ["userId", "month"])
    .index("by_service", ["serviceId"]),

  budgets: defineTable({
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
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_month", ["userId", "month"]),
});
