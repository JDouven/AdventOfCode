import { readFile } from 'node:fs/promises';

export async function readInput() {
  return (await readFile('input.txt', 'utf-8'))
    .toString()
    .trim()
    .split('\n')
    .map((line) => line.trim());
}

export abstract class FsItem {
  abstract getSize(): number;
}

function isFile(fsItem: FsItem): fsItem is File {
  return fsItem instanceof File;
}

function isDirectory(fsItem: FsItem): fsItem is Directory {
  return fsItem instanceof Directory;
}

export class Directory extends FsItem {
  public children: FsItem[];
  constructor(public name: string) {
    super();
    this.children = [];
  }

  getSize(): number {
    return this.children.reduce((a, v) => {
      return a + v.getSize();
    }, 0);
  }

  getChildDir(name: string): Directory {
    const result = this.children
      .filter(isDirectory)
      .find((child) => child.name === name);
    if (!result) {
      console.log(this.printAll());

      throw new Error(`No result found with name: ${name}`);
    }
    return result;
  }

  flattenDirectories(): Directory[] {
    return [
      this,
      ...this.children
        .filter(isDirectory)
        .flatMap((child) => [...child.flattenDirectories()]),
    ];
  }

  toStringLines(): string[] {
    return [
      `- ${this.name} (dir)`,
      ...this.children
        .map((child) => {
          if (isDirectory(child)) {
            return child.toStringLines().map((line) => `  ${line}`);
          } else if (isFile(child)) {
            return `  ${child.toString()}`;
          } else {
            return '';
          }
        })
        .flat(),
    ];
  }

  printAll() {
    return this.toStringLines().join('\n');
  }

  toString() {
    return `- ${this.name} (dir, size=${this.getSize()})`;
  }
}

export class File extends FsItem {
  constructor(public name: string, public size: number) {
    super();
  }

  getSize(): number {
    return this.size;
  }

  toString(): string {
    return `- ${this.name} (file, size=${this.size})`;
  }
}

export class Stack {
  private stack: Directory[] = [];

  get currentDir() {
    return this.stack[this.stack.length - 1];
  }

  get root() {
    return this.stack[0];
  }

  pop() {
    this.stack.pop();
  }

  push(dirName: string) {
    if (this.stack.length === 0) {
      this.stack.push(new Directory(dirName));
    } else {
      this.stack.push(this.stack[this.stack.length - 1].getChildDir(dirName));
    }
  }

  printCurrentDir() {
    console.log(this.stack.map((dir) => dir.name).join('/'));
  }
}

export interface CdCommand {
  command: 'cd';
  dirName: string;
}

export interface LsCommand {
  command: 'ls';
  contents: FsItem[];
}

export type Command = CdCommand | LsCommand;
