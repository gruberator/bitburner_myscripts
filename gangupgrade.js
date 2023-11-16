/** @param {NS} ns */
export async function main(ns) {
  let eqnames = ns.gang.getEquipmentNames();

  let onlyAugs = true;
  if (ns.args.length > 0) {
    onlyAugs = false;
  }

  let names = ns.gang.getMemberNames();

  ns.tprint(` buy only augs ${onlyAugs}
  EQ names:  ${eqnames} `);

  for (let x = 0; x < 5; ++x) {
    for (let j = 0; j < names.length; ++j) {
      for (let i = 0; i < eqnames.length; ++i) {
        let eq = eqnames[i];
        let type = ns.gang.getEquipmentType(eqnames[i]);
        let price = ns.gang.getEquipmentCost(eq);
        let money = ns.getServerMoneyAvailable('home');
        // ns.tprint(`${eqnames[i]} type: ${type}`);

        if (money >= price) {
          if (onlyAugs && type == 'Augmentation') {
            ns.gang.purchaseEquipment(names[j], eqnames[i]);
            ns.tprint(`#${i + 1}. ${names[i]} - buying ${eqnames[i]} for ${
                (price / 1000000).toFixed(3)} M`)
          } else if (!onlyAugs) {
            ns.gang.purchaseEquipment(names[j], eqnames[i]);
          }
        }
      }
    }
    ns.tprint('upgrade round finished...');
    await ns.sleep(3500);
  }
}