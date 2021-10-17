#!/bin/env node

const { buildAomniRoutine } = require('@app/omni/scripts/routines/build-aomni-routine');

const main = async () => {
  //

  await buildAomniRoutine(false);

  //
};

main();
