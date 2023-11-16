/** @param {NS} ns */
export async function main(ns) {
  let ascendThreshold = 1.4;
  if (ns.args.length > 0) {
    if (typeof ns.args[0] === 'number' && ns.args[0].toFixed(2) > 1.01) {
      ns.tprint(`arg[0] is numeric ${ns.args[0].toFixed(2)}`);
      ascendThreshold = ns.args[0].toFixed(2);
    } else {
      ns.tprint('not numeric ending!');
      return;
    }
  }

  ns.exec('ganghire.js', 'home');

  let train = true;
  // assuming combat gang
  let ascended = 0;

  let names = ns.gang.getMemberNames();

  while (train) {
    ascended = 0;
    for (let i = 0; i < names.length; ++i) {
      // let inf = ns.gang.getMemberInformation(names[i]);
      let ascres = ns.gang.getAscensionResult(names[i]);
      // ns.tprint(`asc res ${ascres.agi}`);
      if (ascres != null && ascres.str > 1.3) {
        ns.gang.ascendMember(names[i]);
        ns.tprint(`ascend ${names[i]}`);
        ascended++;
      }

      ns.gang.setMemberTask(names[i], 'Train Combat');
    }
    if (ascended > 0)
      ns.tprint(`ascended ${ascended} dudes, infinite train & upg`);

    await ns.sleep(5000);
    ns.tprint('.');
  }
}