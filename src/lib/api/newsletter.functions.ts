import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email().max(255),
  source: z.string().max(100).optional(),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert({ email: data.email.toLowerCase(), source: data.source ?? null });

    if (error) {
      // Unique violation = already subscribed, treat as success
      if ((error as { code?: string }).code === "23505") {
        return { ok: true, alreadySubscribed: true };
      }
      console.error("[newsletter] insert failed", error);
      throw new Error("Kon je niet inschrijven. Probeer het later opnieuw.");
    }
    return { ok: true, alreadySubscribed: false };
  });
