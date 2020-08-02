const canvasEl: HTMLCanvasElement = document.querySelector('#cvs')

const resizeCanvas = () => {
  canvasEl.width = window.innerWidth
  canvasEl.height = window.innerHeight
}

resizeCanvas()

const context = canvasEl.getContext('2d')

const originCoordinates = {
  x: canvasEl.width / 2,
  y: canvasEl.height / 2,
}

const axisColor = '#333'

const renderAxis = () => {
  return (xStart: number, yStart: number, x: number, y: number) => {
    context.beginPath() // 开始绘制
    context.moveTo(xStart, yStart) // 起点
    context.lineTo(x, y) // 终点
    context.strokeStyle = axisColor // 指定填充颜色
    context.stroke() // 填充
  }
}

const initialState = {
  distance: 5,
  coefficient: 1,
}

const xScale = {
  width: initialState.distance,
  height: 5,
}

const yScale = {
  height: initialState.distance,
  width: 5,
}

const renderSingleXScale = (x: number) => {
  context.beginPath() // 开始绘制
  context.moveTo(x, originCoordinates.y) // 起点
  context.lineTo(x, originCoordinates.y - xScale.height) // 终点
  context.strokeStyle = axisColor // 指定填充颜色
  context.stroke() // 填充
}

const renderSingleYScale = (y: number) => {
  context.beginPath() // 开始绘制
  context.moveTo(originCoordinates.x, y) // 起点
  context.lineTo(originCoordinates.x + yScale.width, y) // 终点
  context.strokeStyle = axisColor // 指定填充颜色
  context.stroke() // 填充
}

const renderXScale = () => {
  const positiveXScalesNumber = Math.floor(
    (canvasEl.width - originCoordinates.x) / xScale.width
  )
  const positiveXScales = new Array(positiveXScalesNumber).fill(null)
  positiveXScales.forEach((_, index) => {
    if (index !== 0) {
      renderSingleXScale(originCoordinates.x + index * xScale.width) // x轴正数
    }
  })
  const negativeXScalesNumber = Math.floor(originCoordinates.x / xScale.width)
  const negativeXScales = new Array(negativeXScalesNumber).fill(null)
  negativeXScales.forEach((_, index) => {
    if (index !== 0) {
      renderSingleXScale(originCoordinates.x - index * xScale.width)
    }
  })
}

const renderYScale = () => {
  const positiveYScaleNumber = Math.floor(
    (canvasEl.height - originCoordinates.y) / yScale.height
  )
  const positiveYScales = new Array(positiveYScaleNumber).fill(null)
  positiveYScales.forEach((_, index) => {
    if (index !== 0) {
      renderSingleYScale(originCoordinates.y + index * yScale.height)
    }
  })
  const negativeYScaleNumber = Math.floor(originCoordinates.y / yScale.height)
  const negativeYScales = new Array(negativeYScaleNumber).fill(null)
  negativeYScales.forEach((_, index) => {
    if (index !== 0) {
      renderSingleYScale(originCoordinates.y - index * yScale.height)
    }
  })
}

const render = () => {
  // 绘制x轴
  renderAxis()(0, originCoordinates.y, canvasEl.width, originCoordinates.y)
  // 绘制y轴
  renderAxis()(originCoordinates.x, 0, originCoordinates.x, canvasEl.height)
  renderXScale()
  renderYScale()
}

const distance = 30

const drag = {
  isMouseDown: false,
  canMove: false,
  handleMouseDown() {
    canvasEl.addEventListener('mousedown', (e) => {
      drag.isMouseDown = true
      const xDistance = Math.abs(originCoordinates.x - e.clientX)
      const yDistance = Math.abs(originCoordinates.y - e.clientY)

      if (xDistance - distance < 0 || yDistance - distance < 0) {
        drag.canMove = true
      } else {
        drag.canMove = false
      }
    })
  },
  handleMouseMove() {
    canvasEl.addEventListener('mousemove', (e) => {
      if (!drag.isMouseDown) return
      if (!drag.canMove) return

      originCoordinates.x = e.clientX
      originCoordinates.y = e.clientY

      draw.renderShape()
    })
  },
  handleMouseUp() {
    canvasEl.addEventListener('mouseup', (e) => {
      drag.isMouseDown = false
    })
  },
  init() {
    drag.handleMouseDown()
    drag.handleMouseMove()
    drag.handleMouseUp()
  },
}

const zoom = {
  handleMouseWheel() {
    canvasEl.addEventListener('mousewheel', (e: WheelEvent) => {
      console.log(e.deltaY)
      const step = e.deltaY
      initialState.coefficient += step
      if (initialState.coefficient <= 0.5) {
        initialState.coefficient = 0.5
      }
      if (initialState.coefficient >= 20) {
        initialState.coefficient = 20
      }
      console.log(initialState.coefficient)
      xScale.width = initialState.coefficient * initialState.distance
      yScale.height = initialState.coefficient * initialState.distance

      draw.renderShape()
    })
  },
  init() {
    zoom.handleMouseWheel()
  },
}

const coordinateInfo = {
  coordinate: {
    x: 0,
    y: 0,
  },
  handleMouseMove() {
    const pEl = document.querySelector('#coordinate')
    canvasEl.addEventListener('mousemove', (e) => {
      const xCoordinate = (e.clientX - originCoordinates.x) / xScale.width
      const yCoordinate = (originCoordinates.y - e.clientY) / yScale.height
      coordinateInfo.coordinate.x = xCoordinate
      coordinateInfo.coordinate.y = yCoordinate
      pEl.textContent = `x:${xCoordinate},y:${yCoordinate}`
    })
  },
  init() {
    coordinateInfo.handleMouseMove()
  },
}

const draw = {
  isDrawing: false,
  coordinates: [],
  handleButtonClick() {
    const buttonEl = document.querySelector('#draw')

    buttonEl.addEventListener('click', (e) => {
      if (!draw.isDrawing) {
        drag.canMove = false
        draw.isDrawing = true
        buttonEl.textContent = '停止绘制'
        return
      }

      drag.canMove = true
      draw.isDrawing = false
      buttonEl.textContent = '开始绘制'
    })
  },
  drawShape() {
    canvasEl.addEventListener('click', (e) => {
      if (!draw.isDrawing) return
      draw.coordinates.push({
        x: coordinateInfo.coordinate.x,
        y: coordinateInfo.coordinate.y,
        originX: e.clientX,
        originY: e.clientY,
      })
      console.log(draw.coordinates)
      draw.renderShape()
    })
  },
  renderShape() {
    context.clearRect(0, 0, innerWidth, innerHeight)
    render()
    draw.coordinates.forEach((coordinate, index) => {
      if (index === 0) {
        context.moveTo(
          transformXCoordinate(coordinate.x),
          transformYCoordinate(coordinate.y)
        ) // 起点
      }
      context.lineTo(
        transformXCoordinate(coordinate.x),
        transformYCoordinate(coordinate.y)
      ) // 终点
    })
    context.strokeStyle = axisColor // 指定填充颜色
    context.stroke() // 填
  },
  init() {
    draw.handleButtonClick()
    draw.drawShape()
  },
}

const transformXCoordinate = (x: number) =>
  x * initialState.distance * initialState.coefficient + originCoordinates.x
const transformYCoordinate = (y: number) =>
  originCoordinates.y - y * initialState.distance * initialState.coefficient

drag.init()
zoom.init()
coordinateInfo.init()
draw.init()

render()
