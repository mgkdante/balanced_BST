import Tree from "./tree.js"

const longArray = (max = 100) => {
  let array = []
  for (let i = 0; i < 100; i++) {
    array.push(Math.floor(Math.random() * max))
  }
  return array
}

const tree = new Tree(longArray())
tree.prettyPrint()
console.log(tree.isBalanced())
console.log(tree.preOrder())
console.log(tree.postOrder())
console.log(tree.inOrder())
const multipleInsert = (max = 100) => {
  for (let i = 0; i < 100; i++) {
    tree.insert(Math.floor(Math.random() * max))
  }
}
multipleInsert()
tree.prettyPrint()
console.log(tree.isBalanced())
tree.rebalance()
console.log(tree.isBalanced())
console.log(tree.preOrder())
console.log(tree.postOrder())
console.log(tree.inOrder())
tree.prettyPrint()
