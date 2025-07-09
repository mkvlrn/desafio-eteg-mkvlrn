/** biome-ignore-all lint/suspicious/noConsole: needed, yo */

import { divide } from "#/math/advanced-math.ts";
import { add } from "#/math/basic-math.ts";

function main() {
  const sum = add(1, 2);
  console.log(`1 + 2 = ${sum}`);

  const by = 0;
  const div = divide(4, by);
  if (div.error) {
    throw div.error;
  }

  console.log(`4 / ${by} = ${div.value}`);
}

main();
