// const canvasEl: HTMLCanvasElement = document.querySelector('#cvs')

// const resizeCanvas = () => {
//   canvasEl.width = window.innerWidth
//   canvasEl.height = window.innerHeight
// }

// resizeCanvas()

// const context = canvasEl.getContext('2d')

// // // Rect
// // context.fillStyle = 'blue' // 填充颜色
// // context.fillRect(100, 100, 100, 100)
// // context.fillStyle = 'red' // 填充颜色
// // context.fillRect(200, 200, 100, 100)

// // // Line
// // context.beginPath() // 开始绘制
// // context.moveTo(50, 300) // 起点
// // context.lineTo(300, 50) // 终点
// // context.lineTo(300, 100) // 终点
// // context.strokeStyle = 'red' // 指定填充颜色
// // context.stroke() // 填充

// // // Arc / Circle
// // const drawCircle = ({ x = 0, y = 0, radius = 0, style = 'red' }) => {
// //   context.beginPath() // 开始绘制，需要在每个图形绘制前调用，否则会链接在一起
// //   context.arc(x, y, radius, 0, Math.PI * 2, false)
// //   context.strokeStyle = style
// //   context.stroke()
// // }

// // for (let index = 0; index < 1000; index++) {
// //   drawCircle({
// //     x: Math.random() * window.innerWidth,
// //     y: Math.random() * window.innerHeight,
// //     radius: Math.random() * 100,
// //   })
// // }

// // drawCircle({ x: 300, y: 300, radius: 30, style: 'pink' })

// const maxRadius = 40
// const minRadius = 2

// const colors = ['#272F32', '#9DBDC6', '#FF3D2E', '#DAEAEF']

// class Circle {
//   x: number
//   y: number
//   radius: number
//   xSpeed: number
//   ySpeed: number
//   color: string
//   minRadius: number
//   originalRadius: number

//   constructor(
//     x: number,
//     y: number,
//     radius: number,
//     xSpeed: number,
//     ySpeed: number
//   ) {
//     this.x = x
//     this.y = y
//     this.radius = radius
//     this.xSpeed = xSpeed
//     this.ySpeed = ySpeed
//     this.color = colors[Math.floor(Math.random() * colors.length)]
//     this.originalRadius = radius
//   }

//   get isCloseToMouse() {
//     return (
//       mouse.x - this.x < 50 &&
//       mouse.x - this.x > -50 &&
//       mouse.y - this.y < 50 &&
//       mouse.y - this.y > -50
//     )
//   }

//   get isFarawayToMouse() {
//     return (
//       (mouse.x - this.x >= 50 && this.originalRadius < this.radius) ||
//       (mouse.x - this.x <= -50 && this.originalRadius < this.radius) ||
//       (mouse.y - this.y >= 50 && this.originalRadius < this.radius) ||
//       (mouse.y - this.y <= -50 && this.originalRadius < this.radius)
//     )
//   }

//   move() {
//     if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
//       this.xSpeed = -this.xSpeed
//     }
//     if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
//       this.ySpeed = -this.ySpeed
//     }
//     this.x += this.xSpeed
//     this.y += this.ySpeed

//     // interactivity
//     if (this.isCloseToMouse && this.radius < maxRadius) {
//       this.radius += 1
//     } else if (this.isFarawayToMouse && this.radius > minRadius) {
//       this.radius -= 1
//     }
//   }

//   draw() {
//     context.beginPath()
//     context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
//     context.fillStyle = this.color
//     context.fill()
//     this.move()
//   }
// }

// const mouse = {
//   x: NaN,
//   y: NaN,
// }

// window.addEventListener('mousemove', (e) => {
//   mouse.x = e.x
//   mouse.y = e.y
// })

// window.addEventListener('resize', (e) => {
//   resizeCanvas()
//   generateCircles()
// })

// const speed = 2

// let circles: Circle[] = []

// const generateCircles = () => {
//   circles = new Array(1000).fill(null).map((item) => {
//     const radius = Math.random() * 5
//     return new Circle(
//       Math.random() * (innerWidth - 2 * radius) + radius,
//       Math.random() * (innerHeight - 2 * radius) + radius,
//       radius,
//       (Math.random() - 0.5) * speed,
//       (Math.random() - 0.5) * speed
//     )
//   })
// }

// generateCircles()

// function animate() {
//   requestAnimationFrame(animate)
//   context.clearRect(0, 0, innerWidth, innerHeight)
//   circles.forEach((circle) => {
//     circle.draw()
//   })
// }

// animate()
