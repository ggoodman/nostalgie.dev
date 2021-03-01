import { useQueryFunction } from 'nostalgie/functions';
import * as React from 'react';
import { getResourceUsage } from '../../../functions';

export function ResourceUsage() {
  // The `usage` object is an object that will update over time as the lifecycle
  // of the query progresses.
  const usage = useQueryFunction(getResourceUsage, [], {
    refetchInterval: 10000, // Every ten seconds
  });

  // In the real world, we might want to handle different states differently
  if (!usage.isSuccess) {
    return <pre>Loading...</pre>;
  }

  // Show our resource usage as formatted JSON
  return <pre>{JSON.stringify(usage.data, null, 2)}</pre>;
}
