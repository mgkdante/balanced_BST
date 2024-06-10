import Node from "./node.js"

class Tree {
  constructor(array) {
    this.root = this.buildTree(this.removeDuplicates(array))
  }

  removeDuplicates = (array) => {
    const set = new Set(array)
    let newArray = Array.from(set).sort(function (a, b) {
      return a - b
    })
    return newArray
  }

  buildTree = (array, start = 0, end = array.length - 1) => {
    if (start > end) {
      return null
    }
    const mid = Math.floor((end + start) / 2)
    const node = new Node(array[mid])
    node.left = this.buildTree(array, start, mid - 1)
    node.right = this.buildTree(array, mid + 1, end)
    return node
  }

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      )
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
    }
  }
}
export default Tree
