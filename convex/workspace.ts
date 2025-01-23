import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

export const getWorkspace = query({
  args: {
    workspaceId: v.id("workspace"),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.workspaceId);
    return workspace;
  },
});

export const updateWorkspace = mutation({
  args: {
    workspaceId: v.id("workspace"),
    messages: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.workspaceId, {
      messages: args.messages,
    });
  },
});

export const updateWorkspaceCode = mutation({
  args: {
    workspaceId: v.id("workspace"),
    files: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.workspaceId, {
      fileData: args.files,
    });
  },
});

export const getAllWorkspaces = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaces = await ctx.db
      .query("workspace")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    return workspaces || [];
  },
});

export const deleteWorkspaceChat = mutation({
  args: {
    id: v.id("workspace"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
