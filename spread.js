/** @param {NS} ns */
export async function main(ns) {
  let target = 'n00dles';
  let portsNeededHack = 0;

  if (ns.args.length > 0) portsNeededHack = ns.args[0];
  if (ns.args.length > 1) target = ns.args[1];

  ns.nuke(target);

  var serversSeen = ['home'];
  for (let i = 0; i < serversSeen.length; i++) {
    var thisScan = await ns.scan(serversSeen[i]);
    for (let j = 0; j < thisScan.length; j++) {
      // If this server isn't in serversSeen, add it
      if (serversSeen.indexOf(thisScan[j]) === -1) {
        serversSeen.push(thisScan[j]);
      }
    }
  }

  ns.tprint('*** Servers Found ***');
  for (let i = 0; i < serversSeen.length; i++) {
    ns.tprintf(`${serversSeen[i]}`);
  }
  ns.tprint('*** End of list ***');

  var taken = 0;  // taken servers
  var totalRamOfHackedServers = 0;
  var usedRamOfHackedServers = 0;

  for (let i = 0; i < serversSeen.length; i++) {
    let ser = serversSeen[i];
    let maxRam = ns.getServerMaxRam(ser);
    let serverNumPortsRequired = ns.getServerNumPortsRequired(ser);
    totalRamOfHackedServers += maxRam;

    if (ser == 'home') {
      usedRamOfHackedServers += maxRam;
      continue;
    }

    if (serverNumPortsRequired <= portsNeededHack) {
      usedRamOfHackedServers += maxRam;
      // rooting server depending on a parameter added, if 0 then no
      // ports will be opened, then each incremental will use
      // next port opening program in the order they need hacking level
      if (portsNeededHack >= 1) ns.brutessh(ser);
      if (portsNeededHack >= 2) ns.ftpcrack(ser);
      if (portsNeededHack >= 3) ns.relaysmtp(ser);
      if (portsNeededHack >= 4) ns.httpworm(ser);
      if (portsNeededHack >= 5) ns.sqlinject(ser);
      ns.nuke(ser);

      if (maxRam > 0) {
        await ns.exec('spawn.js', 'home', 1, ser, target);
        taken++;
        await ns.sleep(4);
      } else {
        await ns.sleep(1);
      }
      ns.tprint(`${maxRam} RAM ${serverNumPortsRequired} ports, server: ${
          ser}   taken/all ${taken}/${
          serversSeen.length} all hackable servers RAM: ${
          totalRamOfHackedServers} used ${usedRamOfHackedServers}`);
      // waiting, so actions are not in the same time
    } else {
      ns.tprint(`${maxRam} RAM ${serverNumPortsRequired} ports, server: ${
          ser}   taken/all ${taken}/${
          serversSeen.length} all hackable servers RAM: ${
          totalRamOfHackedServers} used ${usedRamOfHackedServers}`);
      ns.tprint(`skipping server ${ser} as it needs ${
          serverNumPortsRequired}  ports and we can open ${
          portsNeededHack} only`);
    }
  }

  if (portsNeededHack < 5) {
    let servers = ns.getPurchasedServers();
    for (let i = 0; i < servers.length; i++) {
      let ramUsed = ns.getServerMaxRam(servers[i]);
      usedRamOfHackedServers += ramUsed;
      taken += 1;
      ns.tprint(`OWN server: ${servers[i]} ${ramUsed} RAM    
        taken/all ${taken}/${serversSeen.length} all hackable servers RAM: ${
          totalRamOfHackedServers} used ${usedRamOfHackedServers}`);
      await ns.exec('spawn.js', 'home', 1, servers[i], target);
      await ns.sleep(3);
    }
  }
  ns.tprint('waiting for init to complete... Dying');
  await ns.sleep(1000);
  ns.tprint('waiting for init to complete... Fetus');
  await ns.sleep(1000);
  ns.tprint('waiting for init to complete... RULEZ');
  await ns.sleep(1000);
  await ns.exec('hspawn.js', 'home', 1, target);
  ns.tprint('home is also starting up');
}