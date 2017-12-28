import numpy as np
from matplotlib import pyplot

def pattern2Array(pattern):
	rows = pattern.strip().split('/')
	arr = np.zeros([len(rows),len(rows)])
	for i in range(len(rows)):
		for j in range(len(rows[i])):
			if rows[i][j] == '#':
				arr[i,j] = 1
			# arr already initialized as zeros, so don't need to set zeros	
			# elif rows[i][j] == '.'
			#	 arr[i,j] = 0
	return arr

def addPatternTransformRule(transformationString, rulesMap):
	inPattern, outPattern = transformationString.split('=>')
	inArr = pattern2Array(inPattern)
	outArr = pattern2Array(outPattern)

	#all flips and rotations of inArr map to outArr
	for i in range(4):
		inArr = np.rot90(inArr, k=1)
		rulesMap[inArr.tobytes()] = outArr
	inArr = np.fliplr(inArr)
	for i in range(4):
		inArr = np.rot90(inArr, k=1)
		rulesMap[inArr.tobytes()] = outArr

def printGrid(grid):
	s = []
	for i in range(len(grid)):
		row = ''
		for j in range(len(grid[i])):
			if grid[i][j] == 1:
				row += '#'
			else:
				row += '.'
		print(row)
		s.append(row)
	pyplot.imshow(grid)
	pyplot.show()
	#return s

def enhanceGrid(grid, rulesMap):

	#if divisble by 2, split into 2x2 squares for processing
	if (len(grid) % 2 == 0):
		inBlock = 2
		outBlock = 3
	else :
		inBlock = 3
		outBlock = 4
	outSize = len(grid) * outBlock // inBlock
	enhanced = np.zeros([outSize, outSize])
	for i in range (len(grid)//inBlock):
		for j in range(len(grid)//inBlock):
			i_in = i*inBlock
			j_in = j*inBlock
			i_out = i*outBlock
			j_out = j*outBlock
			inSection = grid[i_in:i_in+inBlock, j_in:j_in+inBlock]
			enhanced[i_out:i_out+outBlock, j_out:j_out+outBlock] = rulesMap[inSection.tobytes()] 
	return enhanced

START_PATTERN = '.#./..#/###'

def run(input, iterations):
	rulesMap = {}
	for rule in input.split('\n'):
		addPatternTransformRule(rule, rulesMap)
	grid = pattern2Array(START_PATTERN)
	for i in range(iterations):
		grid = enhanceGrid(grid, rulesMap)
	printGrid(grid)
	print(np.sum(grid))
	return grid


if __name__ == '__main__':
	testInput = '../.# => ##./#../...\n.#./..#/### => #..#/..../..../#..#'
	testOutput = run(testInput, 2)

	with open('day21_input.txt') as f:
		realInput = f.read()
	output = run(realInput, 5)
	output = run(realInput, 18)