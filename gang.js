/** @param {NS} ns */
export async function main(ns) {
  // Simple script that takes orders !!!
  // if no order, then train fuckers
  let taskNames = ns.gang.getTaskNames();
  let work = 8;
  let job = 'Human Trafficking';
  if (ns.args.length > 0) {
    work = ns.args[0];
    ns.tprint(`second arg ${work.valueOf()}`);
    if (work.valueOf() >= 0 && work.valueOf() < taskNames.length) {
      job = taskNames[work];
      ns.tprint(`Picked job: ${job}`);
    } else {
      ns.tprint(`second param is not an index to actual task ${work}`);
    }
  }
  ns.tprint('## task names wit id to use:');
  let id = 0;
  taskNames.forEach((g) => ns.tprint(`${id++} - ${g}`));

  ns.exec('ganghire.js', 'home');

  // hire as much meat as possible
  let recruits = 0;
  let names = ns.gang.getMemberNames();
  while (ns.gang.canRecruitMember()) {
    let newMemberName = `dude_${names.length + 1}`;
    ns.gang.recruitMember(newMemberName);
    ns.tprint(`new gangus is born ${newMemberName}`);
    names = ns.gang.getMemberNames();
    recruits++;
  }
  ns.tprint(`recruted ${recruits}`);

  ns.tprint(`Will set dudes to do ${job}`);
  for (let i = 0; i < names.length; ++i) {
    ns.gang.setMemberTask(names[i], job);
  }
  ns.gang.setMemberTask(
      names[0], 'Vigilante Justice');  // someone has to do it... first will be
                                       // the best, so superhero
}