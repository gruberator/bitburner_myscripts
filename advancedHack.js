/** @param {NS} ns */
export async function main(ns) {
  var ser = 'n00dles';
  if (ns.args.length > 0) {
    ser = ns.args[0];
  }

  var secParam = 1.5;
  if (ns.args.length > 1) {
    secParam = ns.args[1];
  }

  var mParam = 0.95;
  if (ns.args.length > 2) {
    mParam = ns.args[2];
  }

  var sm = ns.getServerMaxMoney(ser);
  const minSec = ns.getServerMinSecurityLevel(ser);

  var mode = 1;  // to 3

  while (1) {
    var servMoney = ns.getServerMoneyAvailable(ser);
    var sec = ns.getServerSecurityLevel(ser);


    // TODO idea: either break security, or hack hack grow, or combination of
    // those ghh hgh hhg

    if (sec > secParam * minSec) {
      await ns.weaken(ser);
    } else if (servMoney < mParam * sm) {
      await ns.grow(ser);
    } else {
      await ns.hack(ser);
    }
  }
}