export default function sketch(s) {
  const SIZE = 500
  const BAR_PER_EDGE = 20
  const CENTER = SIZE / 2
  const MAX_BAR_HEIGHT = 500
  const BAR_WIDTH = 30
  const ANGLE_INCREMENT = 0.1
  const BACKGROUND = 0
  const FRAME_RATE = 30
  const FILL = 255
  const EDGE_WIDTH = BAR_PER_EDGE * BAR_WIDTH
  const GAP = 4
  const OFFSET = 4
  const ROTATION_X = s.PI / 8
  const ROTATION_Y = -s.PI / 4
  const AMBIENT = [50, 100, 200]
  const DISTANCE = 2
  const ORTHO = [-SIZE, SIZE, SIZE, -SIZE, 0, SIZE * 2].map(s => s * DISTANCE)
  const DIRECTIONAL_LIGTH = [255, 255, 255, 0, 0, -1]
  let angle = 0

  const getBarRange = () => [...Array(BAR_PER_EDGE).keys()].map(i => i * BAR_WIDTH)

  const sinAngleBetween = (start, top, offset = 0) => s.map(s.sin(angle + offset), -1, 1, start, top)

  s.setup = () => {
    s.frameRate(FRAME_RATE)
    s.createCanvas(SIZE, SIZE, s.WEBGL)
  }

  s.draw = () => {
    s.background(BACKGROUND)
    s.ortho(...ORTHO)
    s.directionalLight(...DIRECTIONAL_LIGTH)

    s.ambientLight(...AMBIENT)
    s.rotateX(ROTATION_X)
    s.rotateY(ROTATION_Y + angle / 10)

    getBarRange().forEach(z => {
      getBarRange().forEach((x) => {
        s.push()
        let distanceFromCenter = s.dist(x, z, CENTER, CENTER)
        let offset = s.map(distanceFromCenter, 0, EDGE_WIDTH, 0, OFFSET)
        let height = sinAngleBetween(0, MAX_BAR_HEIGHT, offset)
        s.fill(FILL)
        s.translate(x - EDGE_WIDTH / 2, 0, z - EDGE_WIDTH / 2)
        s.box(BAR_WIDTH - GAP, height, BAR_WIDTH - GAP)
        s.pop()
      })
    })
    angle += ANGLE_INCREMENT
  }

  s.mousePressed = () => {
  }
}
