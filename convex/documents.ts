import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    // const userId = identity.subject;
    // const docs = await ctx.db.query("documents").filter(q => q.eq(q.field("userId"), userId)).collect();
    const docs = await ctx.db.query("documents");
    return docs;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocumentId: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;
    const document = await ctx.db.insert("documents", {
      title: args.title,
      userId,
      parentDocumentId: args.parentDocumentId,
      isArchived: false,
      isPublished: false,
    });
    return document;
  },
});
