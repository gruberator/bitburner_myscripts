/** @param {NS} ns */
export async function main(ns) {
  let firstkill = false;
  let upgraded = 0;
  let totalCost = 0;
  let startIndex = 0;

  if (ns.args.length > 0) startIndex = ns.args[0];

  let infiniteupgrade = false;
  if (ns.args.length > 1) infiniteupgrade = true;

  let servers = ns.getPurchasedServers();

  let totalServerRamBeforeUpdate = 0;
  let upgradedRamAmount = 0;
  for (let i = 0; i < servers.length; i++) {
    totalServerRamBeforeUpdate += ns.getServerMaxRam(servers[i]);
  }

  for (let k = 0; k < 5 || infiniteupgrade; k++) {
    let s = ns.getPurchasedServers();

    for (let j = 0 + startIndex; j < s.length + startIndex; j++) {
      let i = j % s.length;

      let ram = ns.getServerMaxRam(s[i]);
      let money = ns.getServerMoneyAvailable('home');
      let mult = 2;
      let workingMult = 0;
      let upgCost = ns.getPurchasedServerUpgradeCost(s[i], ram * mult);

      while (upgCost <= money) {
        workingMult = mult;
        mult *= 2;
        upgCost = ns.getPurchasedServerUpgradeCost(s[i], ram * mult);
        money = ns.getServerMoneyAvailable('home');
      }

      if (workingMult < 2) continue;

      upgCost = ns.getPurchasedServerUpgradeCost(s[i], ram * workingMult);
      let newName = `my_${i + 1}_${ram * workingMult}_GB`;
      if (upgCost <= money) {
        upgradedRamAmount += ram * (workingMult - 1);

        ns.tprint(`Upgrading a ${s[i]} server to: ${newName} `);
        totalCost += upgCost;
        upgraded += 1;
        await ns.upgradePurchasedServer(s[i], ram * workingMult);
        await ns.renamePurchasedServer(s[i], newName);
        if (firstkill) {
          firstkill = false;
          await ns.killall('home', true);
          await ns.sleep(200);
        }
        await ns.sleep(20);
        await ns.exec('spawn.js', 'home', 1, newName, 'n00dles');
        await ns.sleep(1500);
      }
      await ns.sleep(500);
    }
    if (!infiniteupgrade) ns.tprint(`finished update round ${k + 1} / 5`)


      if (k % 5 == 0 && k > 0 & upgraded > 0) {
        upgraded = 0;
        ns.tprint(`increased RAM by ${upgradedRamAmount} GB for ${
            (totalCost / 1000000).toFixed(3)} M  from ${
            totalServerRamBeforeUpdate} GB => ${
            upgradedRamAmount + totalServerRamBeforeUpdate} GB`);
      }
    await ns.sleep(3333);
  }
}