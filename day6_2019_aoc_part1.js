import { readFile } from 'node:fs/promises';

class Link {
  constructor(name) {
    this.name = name;
    this.head = null;
    this.tails = [];
    this.count = 0;
  }
  
  addTail(tail) {
    tail.head = this;
    this.tails.push(tail);
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
    const [base, orbit] = line.split(')');
    if (!bodies[base]) {
      bodies[base] = new Link(base);
    }
    if (!bodies[orbit]) {
      bodies[orbit] = new Link(orbit);
    }
    bodies[base].addTail(bodies[orbit]);
  }

  let head = null;

  for (const body in bodies) {
    if (bodies[body].head === null) {
      head = bodies[body];
      break;
    }
  }

  const queue = [head];
  let count = 0;
  while (queue.length > 0) {
    const current = queue.shift();
    for (const tail of current.tails) {
      tail.count = current.count + 1;
      queue.push(tail);
    }
    count += current.count
  }
  console.log("Part 1 solution: ", count);
}

part1Solution();

function part2Solution() {
  const bodies = {};

  for (const line of data) {
    const [base, orbit] = line.split(')');
    if (!bodies[base]) {
      bodies[base] = new Link(base);
    }
    if (!bodies[orbit]) {
      bodies[orbit] = new Link(orbit);
    }
    bodies[base].addTail(bodies[orbit]);
  }

  let head = null;
  let you = null;
  let san = null;

  for (const body in bodies) {
    if (bodies[body].head === null) {
      head = bodies[body];
    }
    if (bodies[body].name === "YOU") {
      you = bodies[body];
    }
    if (bodies[body].name === "SAN") {
      san = bodies[body];
    }
  }

  const queue = [head];

  while (queue.length > 0) {
    const current = queue.shift();
    for (const tail of current.tails) {
      tail.count = current.count + 1;
      queue.push(tail);
    }
  }

  // console.log(you.head.count - san.head.count);
  // console.log(head, you, san);

  let traveling = true;
  let youDistanceTraveled = 0;
  let sanDistanceTraveled = 0;

  while (traveling) {
    if (you.head === san.head) {
      traveling = false;
    } else {
      if (you.head.count > san.head.count) {
        youDistanceTraveled++;
        you = you.head;
      } else {
        sanDistanceTraveled++;
        san = san.head;
      }
    }
  }
  console.log("Part 2 solution: ", youDistanceTraveled + sanDistanceTraveled);
}

part2Solution();