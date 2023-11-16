/** @param {NS} ns */
export async function main(ns) {
  let maxRam = 1048576;
  let money = ns.getServerMoneyAvailable('home');
  let s = (ns.getPurchasedServers());
  let name = 'my_' + (s.length + 1);
  let totalServersPossible = ns.getPurchasedServerLimit();

  ns.tprint(`### Already owned servers: ${s.length}`);

  while (s.length < totalServersPossible) {
    s = ns.getPurchasedServers();
    maxRam = 1048576;
    while (maxRam > 1) {
      let servPrice = ns.getPurchasedServerCost(maxRam);
      money = ns.getServerMoneyAvailable('home');
      if (servPrice <= money) {
        name = name + '_' + maxRam + '_GB';
        ns.tprint(`buying a server with ${maxRam} GB RAM named ${name}`);
        ns.purchaseServer(name, maxRam);
        money = ns.getServerMoneyAvailable('home');
        ns.exec('spawn.js', 'home', 1, name, 'n00dles');
        s = (ns.getPurchasedServers());
        name = 'my_' + (s.length + 1);
        break;
      }
      maxRam /= 2;
    }
    await ns.sleep(2666);
  }

  ns.tprint(
      'Can\'t buy more servers - finishing buying & starting INFINITE UPDATE!!!');
  await ns.exec('upgrade.js', 'home', 1, 0, 'infinite');
}