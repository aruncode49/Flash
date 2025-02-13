import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    token: v.optional(v.number()),
    activePlan: v.optional(v.string()),
  }),

  workspace: defineTable({
    messages: v.any(),
    fileData: v.optional(v.any()),
    userId: v.id("users"),
  }),
});
