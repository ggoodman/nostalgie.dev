import { useQueryFunction } from 'nostalgie/functions';
import * as React from 'react';
import { whoami } from './serverFunction';

export function UserPanel() {
  const whoamiResult = useQueryFunction(whoami, []);

  return <div>{whoamiResult.isSuccess ? whoamiResult.data : 'Loading...'}</div>;
}
