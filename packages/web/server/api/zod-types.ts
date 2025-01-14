import { z } from "zod";

/** Include this in your function's input, and return the correct `nextCursor` value
 *  to automatically get pagination support for your query function.
 *
 *  See: https://trpc.io/docs/client/react/useInfiniteQuery
 */
export const InfiniteQuerySchema = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
});
