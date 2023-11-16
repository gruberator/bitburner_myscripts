/** @param {NS} ns */
export async function main(ns) {
  let a = [];

  let name = ns.gang.getMemberNames();
  for (let i = 0; i < name.length; ++i) {
    let info = ns.gang.getMemberInformation(name[i]);
    a.push(info);
  }

  a.forEach((e) => {ns.tprint(e.agi)});
  ns.tprint('#### sorted by agi');
  a.sort(function cmp(x, y) {
    if (x.agi < y.agi)
      return 1;
    else if (x.agi == y.agi)
      return 0;
    else
      return -1;
  });
  a.forEach((e) => {ns.tprint(e.agi)});
}