/** @param {NS} ns */
export async function main(ns) {
  if (ns.args.length == 0) {
    ns.tprint('Type what server you serach for... ');
  }
  var target = ns.args[0];
  var searched = [];
  var path = [];
  searched.push('none');
  var found = await bfs(ns, 'home', target, searched, path);
  if (found == true) {
    ns.tprint('Server was found');

    let aliasDef = 'alias gc=\'';
    for (let i = path.length - 1; i >= 0; i--) {
      aliasDef += `${path[i]}`;
    }
    aliasDef += `connect ${target}\'`;

    ns.tprint(`${aliasDef}`)

  } else {
    ns.tprint('Not found');
  }
}

export async function bfs(ns, node, target, searched, path) {
  if (node == target) {
    ns.tprint(`${node} -> `);
    return true;
  }

  if (searched.includes(node)) {
    return false;
  } else {
    searched.push(node);
  }

  var outcome = false;
  var thisScan = ns.scan(node);
  for (let j = 0; j < thisScan.length; j++) {
    outcome = await bfs(ns, thisScan[j], target, searched, path);
    if (outcome == true) {
      path.push(`connect ${node};`);
      ns.tprint(`${node} -> `);
      return true;
    }
  }
  return outcome;
}