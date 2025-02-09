import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const languages = [
  {
    lang: "C++",
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!" << endl;
    return 0;
}`,
  },
  {
    lang: "Java",
    defaultCode: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}`,
  },
  {
    lang: "Python",
    defaultCode: `print("Hello World!")`,
  },
  
  {
    lang: "C",
    defaultCode: `#include <stdio.h>

int main() {
    printf("Hello World!\\n");
    return 0;
}`,
  },
   
  {
    lang: "JavaScript",
    defaultCode: `console.log("Hello World!");`,
  },
 
  
]
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const map = new Map();
map.set('Java','java')
map.set('C++','cpp17')
map.set('JavaScript','nodejs')
map.set('Python','python3')
map.set('C','c')

const langVersion = new Map();
langVersion.set('Java','3')
langVersion.set('C++','0')
langVersion.set('JavaScript','4')
langVersion.set('Python','3')
langVersion.set('C','0')
