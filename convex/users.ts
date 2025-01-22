import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user?.length === 0) {
      // create a new user
      const userId = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        picture: args.picture,
        token: 50000,
        activePlan: "Free",
      });

      return userId;
    } else {
      return user[0]._id;
    }
  },
});

export const getUser = query({
  args: {
    id: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    if (args.id) {
      const user = await ctx.db.get(args.id);
      return user;
    } else {
      return null;
    }
  },
});

export const updateUserToken = mutation({
  args: {
    userId: v.id("users"),
    token: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      token: args.token,
    });
  },
});

export const updateUserPlan = mutation({
  args: {
    userId: v.id("users"),
    activePlan: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      activePlan: args.activePlan,
    });
  },
});
