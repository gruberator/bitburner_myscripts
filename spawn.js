/** @param {NS} ns */
export async function main(ns) {
  // # # # PARAMS
  var ser = 'n00dles';
  if (ns.args.length > 0) ser = ns.args[0];

  var target = 'n00dles';
  if (ns.args.length > 1) target = ns.args[1];
  // # # # PARAMS

  ns.killall(ser);
  ns.scp('advancedHack.js', ser);

  var maxRam = ns.getServerMaxRam(ser);
  var ramneed = ns.getScriptRam('advancedHack.js');

  var cnt = (maxRam / ramneed).toFixed(0);
  if (cnt * ramneed > maxRam) {
    cnt -= 1;
  }


  // dont spawn many many processes, instead allocate processes with threads > 0
  let threads = 1;
  let divider = 1000;  // if cnt > 1000  threads count = 10, each power of 10
                       // should multiply thread count by 10
  let div = (cnt / divider).toFixed(0);

  while (div > 0) {
    threads *= 10;

    // ns.tprint(`div: ${div} cnt: ${cnt} threads: ${threads}`);

    divider *= 10;
    div = (cnt / divider).toFixed(0);
  }
  if (threads > 1) {
    cnt = (cnt / threads).toFixed(0);
    // ns.tprint(`Limiting CNT with divider ${threads} will produce ${cnt}
    // instances on ${ser}`);
  }

  let secu = 4.0;
  let mone = 0.80;

  let sleepTime = 2;


  let totalInitTime = 666;
  sleepTime = totalInitTime / cnt;
  // ns.tprint(`spawn advHack on machine ${ser} times ${cnt} = (${maxRam} GB -
  // ${ramneed} GB ) / ${ramneed} GB   sleepTime ${sleepTime}`);

  for (let i = 0; i < cnt; i++) {
    await ns.exec('advancedHack.js', ser, threads, target, secu, mone);
    await ns.sleep(sleepTime);

    secu -= 0.05;
    if (secu < 1) {
      secu = 8;
    }
    mone -= 0.05;
    if (mone < 0.1) {
      mone = 0.8;
    }
  }

  var usedRam = ns.getServerUsedRam(ser);
  var free = maxRam - usedRam;
  cnt = (free / ramneed).toFixed(0);
  if (cnt * ramneed > free) cnt -= 1;
  if (cnt > 0) {
    // ns.tprint(`there is some more ram left on a server ${maxRam - usedRam},
    // will spawn a single process with ${cnt} threads`);
    await ns.exec('advancedHack.js', ser, cnt, target, secu, mone);
  }
}