/**
 * Purpose: Handles beta signup form submission to Supabase
 * Used in: BetaSection component
 * Dependencies: supabase client
 */

import { supabase } from "./supabase";

export interface BetaSignupPayload {
  name: string;
  email: string;
  occupation: string;
  useCase: string;
}

/**
 * Inserts a beta signup record into the open_narrator_beta_use table.
 * Throws an error if the insert fails (e.g. duplicate email, network issue).
 */
export async function submitBetaSignup(payload: BetaSignupPayload): Promise<void> {
  const { error } = await supabase.from("open_narrator_beta_use").insert([
    {
      name: payload.name,
      email: payload.email,
      occupation: payload.occupation,
      usecase: payload.useCase,
    },
  ]);

  if (error) {
    // Surface duplicate email as a friendly message
    if (error.code === "23505") {
      throw new Error("This email is already on the list.");
    }
    throw new Error(error.message);
  }
}
