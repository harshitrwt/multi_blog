// app/api/test/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { posts } from "@/lib/schema";

export async function POST() {
  const result = await db.insert(posts).values({
    title: "My first blog",
    content: "Post body here",
    slug: "my-first-blog",
    published: true,
  });
  return NextResponse.json(result);
}



//GET
export async function GET() {
  const allPosts = await db.select().from(posts);
  return NextResponse.json(allPosts);
}