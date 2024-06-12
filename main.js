import Tree from "./tree.js"

const longArray = [
  38, 15, 27, 94, 7, 53, 89, 2, 68, 34, 72, 14, 56, 3, 81, 42, 10, 76, 23, 60,
  99, 5, 31, 87, 26, 49, 12, 73, 19, 91, 8, 45, 66, 22, 59, 33, 85, 11, 40, 64,
]
const tree = new Tree(longArray)
tree.prettyPrint()
console.log(tree.postOrder())
