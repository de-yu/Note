
interface Point {
  x: number
  y: number
}

function distance(p1: Point, p2: Point) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}

console.log(distance({ x: 0, y: 0 }, { x: 3, y: 4 }))