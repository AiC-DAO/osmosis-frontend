/** Uses numerical cursor-based pagination that is compatible with and similar to offest pagination.
 *  This means if you have a cursor of 50 and a limit of 20, you will get items 50-69.
 *  Also, you should rerequest all data if it changes, as the cursor is not a pointer to a page, but to an item index.
 *  useInfiniteQuery from trpc if applicable. Otherwise the given array is returned.
 *  Default cursor is 0 and default limit is 50.
 *  The cursor doesn't point to the page, but to the item index of the last element of the requested page.
 *  The limit is the number of items per page.
 *
 *  See: https://trpc.io/docs/client/react/useInfiniteQuery
 *  Guide: https://tanstack.com/query/v4/docs/react/guides/infinite-queries
 */
export function maybeCursorPaginatedItems<TItem>(
  items: TItem[],
  cursor: number | null | undefined,
  limit: number | null | undefined
): {
  items: TItem[];
  nextCursor: number;
} {
  if (!cursor && !limit) return { items, nextCursor: items.length - 1 };

  cursor = cursor || 0;
  limit = limit || 50;
  const startIndex = cursor;

  if (startIndex >= items.length - 1) return { items: [], nextCursor: cursor };

  const paginatedItems = items.slice(startIndex, startIndex + limit);

  return {
    items: paginatedItems,
    nextCursor: Math.min(cursor + limit, items.length - 1),
  };
}
