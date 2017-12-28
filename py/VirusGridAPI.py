class Carrier:
	direction = (0,1) # starts facing up
	position = (0,0)
	infections = 0
	cleans = 0

	allDirections = [(0,1), (1,0), (0,-1), (-1, 0)]
	directionNames = ['up','right','down', 'left']
	def rotR(self):
		current = self.allDirections.index(self.direction)
		right = (current + 1) % len(self.allDirections)
		self.direction = self.allDirections[right]

	def rotL(self):
		current = self.allDirections.index(self.direction)
		left = (current - 1) % len(self.allDirections)
		self.direction = self.allDirections[left]

	def moveForward(self):
		self.position = (self.position[0]+self.direction[0], self.position[1]+self.direction[1])

	def doBurst(self, infectedNodes, debug=False):
		if self.position in infectedNodes:
			self.rotR()
			infectedNodes.remove(self.position)
			self.cleans += 1
			self.moveForward()
			if debug:
				print('clean')
				self.printInfo()
		else:
			self.rotL()
			infectedNodes.add(self.position)
			self.infections += 1
			self.moveForward()
			if debug:
				print('infect')
				self.printInfo()

	def printInfo(self):
		facing = self.directionNames[self.allDirections.index(self.direction)]
		print('Position: ' + str(self.position) + ' Facing: ' + facing)

def initializeInfectedSet(gridString):
	infectedNodes = set()
	rows = gridString.split('\n')
	height = len(rows)
	width = len(rows[0])
	xOffset = (width - 1) // 2
	yOffset = (height - 1) // 2
	for i in range(width):
		for j in range(height):
			if (rows[j][i] == '#'):
				pos = (i-xOffset, (j-yOffset)*-1)
				infectedNodes.add(pos)
	return infectedNodes

def run(initialGridString, bursts, debug=False):
	infectedNodes = initializeInfectedSet(initialGridString)
	carrier = Carrier()
	if debug:
		print(infectedNodes)
		carrier.printInfo()
	for i in range(bursts):
		carrier.doBurst(infectedNodes, debug=debug)
	print(carrier.infections)

if __name__ == '__main__':
	testGrid = '..#\n#..\n...'
	print('Test grid 70 bursts:')
	run(testGrid, 70)
	print('Test grid 10000 bursts:')
	run(testGrid, 10000)
	with open('day22_input.txt') as f:
		realInput = f.read()
	print('Real input 10000 bursts:')
	run(realInput, 10000)


