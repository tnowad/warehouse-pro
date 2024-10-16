import { z } from "zod";
import { userResponseSchema } from "./user-response-schema";
import { tokensResponseSchema } from "./tokens-response-schema";

export const loginResponseSchema = z.object({
  message: z.string(),
  user: z.lazy(() => userResponseSchema),
  tokens: z.lazy(() => tokensResponseSchema),
});
export type LoginResponseSchema = z.infer<typeof loginResponseSchema>;
