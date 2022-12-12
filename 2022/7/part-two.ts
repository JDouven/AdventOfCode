import { Command, Directory, File, readInput, Stack } from './input';

async function main() {
  const input = await readInput();
  const fs = getFileSystem(input);

  const totalDiskSize = 70000000;
  const usedDiskSize = fs.getSize();
  const requiredDiskSize = totalDiskSize - 30000000;

  const flattened = fs.flattenDirectories();
  console.log(flattened.join('\n'));
  const result = flattened
    .map((dir) => dir.getSize())
    .filter((size) => usedDiskSize - size <= requiredDiskSize)
    .sort((a, b) => a - b);
  console.log(result[0]);
}

function getFileSystem(input: string[]): Directory {
  let index: number = 0;
  let stack = new Stack();
  while (index !== -1) {
    const nextCommandIndex: number | undefined = input.findIndex(
      (v, i) => i > index && v[0] === '$'
    );
    const command = parseCommand(
      input.slice(index, nextCommandIndex !== -1 ? nextCommandIndex : undefined)
    );
    if (command.command === 'cd') {
      if (command.dirName === '..') {
        stack.pop();
      } else {
        stack.push(command.dirName);
      }
    } else if (command.command === 'ls') {
      stack.currentDir.children = command.contents;
    }
    index = nextCommandIndex;
  }
  return stack.root;
}

function parseCommand(lines: string[]): Command {
  if (lines[0][0] !== '$') {
    throw Error(`'$' expected at index 0 in string '${lines[0]}'`);
  }
  const words = lines[0].split(' ');
  const command = words[1];
  if (command === 'cd') {
    return {
      command: 'cd',
      dirName: words[2],
    };
  } else if (command === 'ls') {
    return {
      command: 'ls',
      contents: lines.slice(1).map((line) => {
        const words = line.split(' ');
        if (words[0] === 'dir') {
          return new Directory(words[1]);
        } else {
          return new File(words[1], parseInt(words[0]));
        }
      }),
    };
  } else {
    throw Error(`Command '${command}' not recognised`);
  }
}

main();
