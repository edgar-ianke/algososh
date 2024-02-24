export async function delay(delay: number) {
  await new Promise((resolve) => setTimeout(resolve, delay));
}
