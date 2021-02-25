import type { ServerFunctionContext } from 'nostalgie/functions';

export async function whoami(ctx: ServerFunctionContext) {
  if (!ctx.auth.isAuthenticated) {
    return "I don't know!";
  }

  return `You're: ${ctx.auth.credentials.user.name}`;
}
