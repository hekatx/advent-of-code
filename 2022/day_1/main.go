package main

import (
	"bufio"
	"embed"
	"fmt"
	"sort"
	"strconv"
	"strings"
)

func max(s []int) (r int) {
	for _, e := range s {
		if e > r {
			r = e
		}
	}
	return
}

func max_three(s []int) []int {
	sort.Ints(s)
	return s[len(s)-3:]
}

//go:embed input.txt
var f embed.FS

func main() {
	data, _ := f.ReadFile("input.txt")

	input := string(data)

	scanner := bufio.NewScanner(strings.NewReader(input))

	elves := []int{0}
	index := 0

	for scanner.Scan() {
		if scanner.Text() == "" {
			elves = append(elves, 0)
			index++
			continue
		}

		calories, _ := strconv.Atoi(scanner.Text())

		elves[index] = elves[index] + calories
	}

	m := 0
	for _, el := range max_three(elves) {
		m += el
	}

	fmt.Println(m)
}
