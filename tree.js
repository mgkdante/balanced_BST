import Node from "./node.js"

class Tree {
  constructor(array) {
    this.root = this.buildTree(this.#removeDuplicates(array))
  }

  #removeDuplicates = (array) => {
    return Array.from(new Set(array)).sort((a, b) => a - b)
  }

  buildTree = (array, start = 0, end = array.length - 1) => {
    if (start > end) return null
    const mid = Math.floor((end + start) / 2)
    const node = new Node(array[mid])
    node.left = this.buildTree(array, start, mid - 1)
    node.right = this.buildTree(array, mid + 1, end)
    return node
  }

  insert = (val) => {
    const newNode = new Node(val)
    let current = this.root
    while (current) {
      if (val < current.data) {
        if (!current.left) {
          current.left = newNode
          return
        }
        current = current.left
      } else if (val > current.data) {
        if (!current.right) {
          current.right = newNode
          return
        }
        current = current.right
      } else {
        return
      }
    }
  }

  delete = (val) => {
    const findMin = (node) => {
      while (node.left) node = node.left
      return node
    }

    const deleteRecursively = (root, val) => {
      if (!root) return root
      if (val < root.data) {
        root.left = deleteRecursively(root.left, val)
      } else if (val > root.data) {
        root.right = deleteRecursively(root.right, val)
      } else {
        if (!root.left) return root.right
        if (!root.right) return root.left
        root.data = findMin(root.right).data
        root.right = deleteRecursively(root.right, root.data)
      }
      return root
    }

    this.root = deleteRecursively(this.root, val)
  }

  find = (val) => {
    let current = this.root
    while (current) {
      if (val < current.data) {
        current = current.left
      } else if (val > current.data) {
        current = current.right
      } else {
        return current
      }
    }
    return null
  }

  levelOrder = (callbackFn) => {
    const queue = [this.root]
    const result = []
    while (queue.length) {
      const node = queue.shift()
      if (node) {
        if (callbackFn) {
          callbackFn(node)
        } else {
          result.push(node.data)
        }
        if (node.left) queue.push(node.left)
        if (node.right) queue.push(node.right)
      }
    }
    return callbackFn ? undefined : result
  }

  levelOrderRec = (
    node = this.root,
    queue = [this.root],
    solution = [],
    callbackFn = null
  ) => {
    if (!node || queue.length === 0) return solution

    let current = queue.shift()
    if (callbackFn) {
      callbackFn(current)
    } else {
      solution.push(current.data)
    }

    if (current.left) queue.push(current.left)
    if (current.right) queue.push(current.right)

    return this.levelOrderRec(node, queue, solution, callbackFn)
  }

  isBalanced = (root = this.root) => {
    const checkBalance = (node) => {
      if (!node) return [true, 0]
      const [leftBalanced, leftHeight] = checkBalance(node.left)
      const [rightBalanced, rightHeight] = checkBalance(node.right)
      const balanced =
        leftBalanced && rightBalanced && Math.abs(leftHeight - rightHeight) <= 1
      return [balanced, 1 + Math.max(leftHeight, rightHeight)]
    }
    return checkBalance(root)[0]
  }

  height = (node) => {
    if (!node) return -1
    return 1 + Math.max(this.height(node.left), this.height(node.right))
  }

  depth = (node) => {
    let current = this.root
    let count = 0
    while (current) {
      if (node.data < current.data) {
        current = current.left
      } else if (node.data > current.data) {
        current = current.right
      } else {
        return count
      }
      count++
    }
    return count
  }

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) return
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
