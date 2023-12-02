package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
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
	regexString := regexp.MustCompile("[0-9]")
	total := 0

	for _, line := range lines {
		numbers := regexString.FindAllString(line, -1)

		firstNumber := string(numbers[0])
		lastNumber := string(numbers[len(numbers)-1])

		val, err := strconv.Atoi(firstNumber + lastNumber)
		if err != nil {
			panic(err)
		}

		total += val
	}

	return total
}

func part2(lines []string) int {
	numbersTextArray := [9]string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine"}
	regexString := regexp.MustCompile(strings.Join(numbersTextArray[:], "|") + "|[1-9]")
	total := 0

	for _, line := range lines {
		if line == "ddgjgcrssevensix37twooneightgt" {
			fmt.Println("ddgjgcrssevensix37twooneightgt")
		}

		numbers := regexString.FindAllString(line, -1)

		for i, number := range numbers {
			index := indexOf(numbersTextArray[:], number)
			if index != -1 {
				numbers[i] = strconv.Itoa(index + 1)
			}
		}

		firstNumber := string(numbers[0])
		lastNumber := string(numbers[len(numbers)-1])

		val, err := strconv.Atoi(firstNumber + lastNumber)
		if err != nil {
			panic(err)
		}

		total += val
	}

	return total
}

func indexOf(numbersTextArray []string, number string) int {
	for i, v := range numbersTextArray {
		if v == number {
			return i
		}
	}
	return -1
}
