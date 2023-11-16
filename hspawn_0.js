/** @param {NS} ns */
export async function main(ns) {
  var ser = 'home';

  var target = 'n00dles';
  if (ns.args.length > 0) target = ns.args[0];

  // just simple version, for n00dles will be just fine
  ns.nuke(target);

  var servMoney = ns.getServerMoneyAvailable(target);
  var sm = ns.getServerMaxMoney(target);
  const minSec = ns.getServerMinSecurityLevel(target);
  var sec = ns.getServerSecurityLevel(target);

  var maxRam = ns.getServerMaxRam(ser);
  var ramneed = ns.getScriptRam('advancedHack.js');
  var thisram = ns.getScriptRam(ns.getScriptName());
  var cnt = ((maxRam) / ramneed).toFixed(0);
  if (cnt * ramneed > maxRam) {
    cnt -= 1;
  }

  ns.tprint(`ram instances: ${cnt} = (${maxRam} - ${thisram}) / ${ramneed}`);
  await ns.exec(
      'advancedHack.js', ser, (cnt / 3).toFixed(0), target, 42.0, 0.95);
  await ns.exec('advancedHack.js', ser, (cnt / 3).toFixed(0), target, 1.0, 0.1);
  await ns.exec(
      'advancedHack.js', ser, (cnt / 3).toFixed(0), target, 124.0, 0.02);
}