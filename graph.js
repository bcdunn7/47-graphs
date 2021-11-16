class Node {
	constructor(value, adjacent = new Set()) {
		this.value = value;
		this.adjacent = adjacent;
	}
}

class Graph {
	constructor() {
		this.nodes = new Set();
	}

	// this function accepts a Node instance and adds it to the nodes property on the graph
	addVertex(vertex) {
		this.nodes.add(vertex);
	}

	// this function accepts an array of Node instances and adds them to the nodes property on the graph
	addVertices(vertexArray) {
		for (let vertex of vertexArray) {
			this.addVertex(vertex);
		}
	}

	// this function accepts two vertices and updates their adjacent values to include the other vertex
	addEdge(v1, v2) {
		v1.adjacent.add(v2);
		v2.adjacent.add(v1);
	}

	// this function accepts two vertices and updates their adjacent values to remove the other vertex
	removeEdge(v1, v2) {
		v1.adjacent.delete(v2);
		v2.adjacent.delete(v1);
	}

	// this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
	// returns false. can return undefined by checking if node.adjacent.has(vertext) before deletion
	removeVertex(vertex) {
 		for (let node of vertex.adjacent) {
			node.adjacent.delete(vertex);
		}

		this.nodes.delete(vertex);
	}

	// this function returns an array of Node values using DFS
	depthFirstSearch(vertex, seen = new Set(), values=[]) {
		values.push(vertex.value);
		seen.add(vertex);
		
		vertex.adjacent.forEach(neighbor => {
			if (!seen.has(neighbor)) {
				return this.depthFirstSearch(neighbor, seen, values)				
			}
		})

		return values;
	}

	// this function returns an array of Node values using BFS
	breadthFirstSearch(start, q = [start], seen = new Set([start]), values = []) {
		if (q.length === 0) {
			return values;
		}

		let currVertex = q.shift();
		values.push(currVertex.value);

		currVertex.adjacent.forEach(neighbor => {
			if (!seen.has(neighbor)) {
				q.push(neighbor);
				seen.add(neighbor);
			}
		})

		// could pass in start again, but null makes it clear the start value is only used on the first time this is called
		return this.breadthFirstSearch(null, q, seen, values)
	}
}

module.exports = {Graph, Node}