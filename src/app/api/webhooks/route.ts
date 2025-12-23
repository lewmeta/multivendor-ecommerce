import { User } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // const evt = await verifyWebhook(req);
    const evt = await verifyWebhook(req, {
      signingSecret: process.env.WEBHOOK_SECRET!,
    });

    // Do something with the payload
    const { id } = evt.data;
    const eventType = evt.type;

    console.log(`Webhook ID: ${id}, Type: ${eventType}`);

    // Handle user created or updated events
    if (eventType === "user.created" || eventType === "user.updated") {
      // evt.data contains the user object (email_addresses, first_name, etc.)
      const data = evt.data;

      // User instance creation logic or update logic here
      const user: Partial<User> = {
        id: data.id,
        name: (data.first_name + " " + (data.last_name ?? "")).trim() || undefined,
        email: data.email_addresses?.[0]?.email_address || "",
        picture: data.has_image ? data.image_url : undefined,
      };
      if (!user) return;

      // Create or update user in your database
      const DBUser = await db.user.upsert({
        where: {
          email: user.email,
        },
        // Update if already exists
        update: user,

        // Create new user if none exists
        create: {
            id: user.id!,
            name: user.name!,
            email: user.email!,
            picture: user.picture!,
            role: user.role || "USER",
        },
      });

      // Get the client instance
      const client = await clerkClient();
      client.users.updateUserMetadata(data.id, {
        privateMetadata: {
            role: DBUser.role || "USER",
        },
      });

    }

    /**
     * Handle user deleted event
     * If a user is deleted from Clerk, we also delete them from our database
     */
    if (eventType === 'user.deleted') {
        const data = evt.data;
        const userId = data.id;
        await db.user.delete({
            where: {
                id: userId,
            }
        });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
