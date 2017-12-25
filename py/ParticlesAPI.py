import numpy as np
import re

particlePattern = re.compile('''p=<([-0-9]+),([-0-9]+),([-0-9]+)>, v=<([-0-9]+),([-0-9]+),([-0-9]+)>, a=<([-0-9]+),([-0-9]+),([-0-9]+)>''')
def parseParticleLine(line):
	m = particlePattern.match(line)
	return [m[1],m[2],m[3]], [m[4],m[5],m[6]], [m[7],m[8],m[9]]


def createParticleArrays(particleLines):
	lines = particleLines.split('\n')
	n = len(lines)
	p,v,a = np.zeros((n,3)), np.zeros((n,3)), np.zeros((n,3))
	for i in range(len(lines)):
		p[i],v[i],a[i] = parseParticleLine(lines[i])
	return p,v,a

def calculatePositionsAtTime(p,v,a,t):
	return 0.5*a*t**2 + (v + a)*t + p

def particleTimeStep(p,v,a):
	v = v+a
	p = p+v
	return p,v,a

def findParticleClosestToOrigin(x):
	return abs(x).sum(axis=1).argmin()

def removeCollisions(p,v,a):
	seen = {}
	collisions = set()
	for i in range(len(p)):
		#check if p[i] is already in seen
		#use a tuple of p[i] to make it hashable
		t = tuple(p[i])
		if t in seen:
			collisions.add(i)
			collisions.add(seen[t])
		else:
			seen[t] = i
	collisions = list(collisions)
	p = np.delete(p,collisions,0)
	v = np.delete(v,collisions,0)
	a = np.delete(a,collisions,0)
	return p,v,a


def findParticleClosesToOriginLongTerm(particleLines, minRun=100, print_position=False):
	p,v,a = createParticleArrays(particleLines)
	closestLast = -2
	closestNow = -1
	t = 1
	while (closestNow != closestLast) or t < minRun: 
		closestLast = closestNow
		p,v,a = particleTimeStep(p,v,a)
		closestNow = findParticleClosestToOrigin(p)
		#print('closest at time t=' + str(t) + ' : ' + str(closestNow))
		t += 1
		if (print_position):
			print(p)
	return closestNow

def findNumberOfParticlesAfterCollisions(particleLines, minStability=1000):
	p,v,a = createParticleArrays(particleLines)
	p,v,a = removeCollisions(p,v,a)
	#stability will count how many time steps since a collision
	stability = 0;
	t = 0;
	while stability < minStability:
		oldCount = len(p)
		p,v,a = particleTimeStep(p,v,a)
		p,v,a = removeCollisions(p,v,a)
		if oldCount != len(p):
			stability = 0;
		else:
			stability += 1;
		t += 1;
	print('{0} particles left after {1} time steps'.format(len(p), t))
	return p,v,a

testInput = 'p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>\np=<4,0,0>, v=<0,0,0>, a=<-2,0,0>'
testInput2 = 'p=<-6,0,0>, v=<3,0,0>, a=<0,0,0>\np=<-4,0,0>, v=<2,0,0>, a=<0,0,0>\np=<-2,0,0>, v=<1,0,0>, a=<0,0,0>\np=<3,0,0>, v=<-1,0,0>, a=<0,0,0>'
print(findParticleClosesToOriginLongTerm(testInput, minRun = 4, print_position = True))

with open('day20_input.txt') as f:
	realInput = f.read()
#print(findParticleClosesToOriginLongTerm(realInput, minRun = 1000))

#print(findNumberOfParticlesAfterCollisions(testInput2))
print(findNumberOfParticlesAfterCollisions(realInput))