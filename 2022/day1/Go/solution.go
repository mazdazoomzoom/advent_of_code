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

	// Split input into lines
	lines := strings.Split(string(input), "\n")
	solution1 := part1(lines)
	solution2 := part2(lines)

	fmt.Println("Solution 1:", solution1)
	fmt.Println("Solution 2:", solution2)
}

func part1(lines []string) int {
	return 0
}

func part2(lines []string) int {
	return 0
}
