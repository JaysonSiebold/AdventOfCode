import { readFile } from 'node:fs/promises';

class Body {
  constructor(name) {
    this.name = name;
    this.parent = null;
    this.children = [];
    this.depth = 0;
  }
  
  addChild(child) {
    child.parent = this;
    this.children.push(child);
  }

  toString() {
    return this.name;
  }
}

const fileData = await readFile("input.txt", "utf8");
const data = fileData.trim().split('\n');

async function part1Solution() {
  const bodies = {};

  for (const line of data) {
    const [parentName, childName] = line.split(')');
    if (!bodies[parentName]) {
      bodies[parentName] = new Body(parentName);
    }
    if (!bodies[childName]) {
      bodies[childName] = new Body(childName);
    }
    bodies[parentName].addChild(bodies[childName]);
  }

  let root = null;

  for (const body in bodies) {
    if (bodies[body].parent === null) {
      root = bodies[body];
      break;
    }
  }

  const queue = [root];
  let depth = 0;
  while (queue.length > 0) {
    const current = queue.shift();
    for (const child of current.children) {
      child.depth = current.depth + 1;
      queue.push(child);
    }
    depth += current.depth
  }
  console.log("Part 1 solution: ", depth);
}

part1Solution();

function part2Solution() {
  const bodies = {};

  for (const line of data) {
    const [parentName, childName] = line.split(')');
    if (!bodies[parentName]) {
      bodies[parentName] = new Body(parentName);
    }
    if (!bodies[childName]) {
      bodies[childName] = new Body(childName);
    }
    bodies[parentName].addChild(bodies[childName]);
  }

  let root = null;
  let you = null;
  let san = null;

  for (const body in bodies) {
    if (bodies[body].parent === null) {
      root = bodies[body];
    }
    if (bodies[body].name === "YOU") {
      you = bodies[body];
    }
    if (bodies[body].name === "SAN") {
      san = bodies[body];
    }
  }

  const queue = [root];

  while (queue.length > 0) {
    const current = queue.shift();
    for (const child of current.children) {
      child.depth = current.depth + 1;
      queue.push(child);
    }
  }

  let traveling = true;
  let youDistanceTraveled = 0;
  let sanDistanceTraveled = 0;

  while (traveling) {
    if (you.parent === san.parent) {
      traveling = false;
    } else {
      if (you.parent.depth > san.parent.depth) {
        youDistanceTraveled++;
        you = you.parent;
      } else {
        sanDistanceTraveled++;
        san = san.parent;
      }
    }
  }
  console.log("Part 2 solution: ", youDistanceTraveled + sanDistanceTraveled);
}

part2Solution();