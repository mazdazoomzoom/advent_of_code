#include <fstream>
#include <functional>
#include <iostream>
#include <string>

using namespace std;

int main() {
  ifstream fin;
  fin.open("input.txt");
  if (!fin.is_open()) {
    cout << "Unable to open input.txt" << endl;
    return 1;
  }
}

int part1() { return 0; }

int part2() { return 0; }