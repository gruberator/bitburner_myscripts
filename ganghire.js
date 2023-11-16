/** @param {NS} ns */
export async function main(ns) {
  let names = ns.gang.getMemberNames();

  while (ns.gang.canRecruitMember()) {
    let newMemberName = `dude_${names.length + 1}`;
    ns.gang.recruitMember(newMemberName);
    ns.tprint(`new gangus is born ${newMemberName}`);
    names = ns.gang.getMemberNames();
    recruits++;
  }
}