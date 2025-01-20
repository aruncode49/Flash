import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createWorkspace = mutation({
  args: {
    messages: v.any(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspace", {
      messages: args.messages,
      userId: args.userId,
    });
    return workspaceId;
  },
});
