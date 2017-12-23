import queue

MOD_DIVISOR = 2147483647
A_FACTOR = 16807
B_FACTOR = 48271

def generateNext(prevValue, factor, modDivisor =  MOD_DIVISOR):
	return (prevValue * factor) % modDivisor

def int2bin(val):
	return '{0:0>16b}'.format(val)[-16:]

def judgeMatch(val1, val2):
	bin1 = int2bin(val1)
	bin2 = int2bin(val2)
	return bin1 == bin2

def judgeNMatches(init1, init2, n):
	val1 = init1
	val2 = init2
	count = 0
	for i in range(n):
		val1 = generateNext(val1, A_FACTOR, MOD_DIVISOR)
		val2 = generateNext(val2, B_FACTOR, MOD_DIVISOR)
		if judgeMatch(val1, val2):
			count = count + 1
	return count

def judgeNMatchesPickyGenerators(init1, init2, n):
	val1 = init1
	val2 = init2
	count = 0
	q1 = queue.Queue();
	q2 = queue.Queue();
	i = 0
	while i < n:
		val1 = generateNext(val1, A_FACTOR, MOD_DIVISOR)
		if (val1 % 4) == 0:
			q1.put(val1)
		val2 = generateNext(val2, B_FACTOR, MOD_DIVISOR)
		if (val2 % 8) == 0:
			q2.put(val2)
		if not q1.empty() and not q2.empty():
			i = i+1;
			if judgeMatch(q1.get(), q2.get()):
				count = count + 1
	return count


print('test output is: ' + str(judgeNMatches(65, 8921, 5)))
#print('real output is: ' + str(judgeNMatches(634, 301, 40000000)))

print('test 2 output is: ' + str(judgeNMatchesPickyGenerators(65, 8921, 1056)))
print('real output 2 is: ' + str(judgeNMatchesPickyGenerators(634, 301, 5000000)))
