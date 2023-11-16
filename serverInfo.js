/** @param {NS} ns */
export async function main(ns) {
  let maxRam = 1048576;
  let money = ns.getServerMoneyAvailable('home');
  let servers = (ns.getPurchasedServers());
  let name = 'my_' + servers.length;
  ns.tprint(`actual owned servers: ${servers.length}`);



  let ownservers = ns.getPurchasedServers();

  let ownram = 0;
  for (let i = 0; i < ownservers.length; i++) {
    let ram = ns.getServerMaxRam(ownservers[i]);
    ownram += ram;
    ns.tprint(`Owning a ${ownservers[i]} server `);
  }

  ns.tprint(`Total max ram : ${ownram} `);

  // just buy best server and make it work
  while (maxRam > 1) {
    let servPrice = ns.getPurchasedServerCost(maxRam);
    ns.tprint(
        `price of server with ${maxRam} GB RAM is ${servPrice / 1000000} M`);
    maxRam /= 2;
  }
  ns.tprint('*** END ***');
}