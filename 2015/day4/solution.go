package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	input, err := os.ReadFile("../input.txt")
	if err != nil {
		panic(err)
	}
	lines := strings.Split(string(input), "\n")

	part1Solution := part1(lines)
	fmt.Println("Solution 1:", part1Solution)

	part2Solution := part2(lines)
	fmt.Println("Solution 2:", part2Solution)
}

func part1(lines []string) int {
	return 0
}

func part2(lines []string) int {
	return 0
}
