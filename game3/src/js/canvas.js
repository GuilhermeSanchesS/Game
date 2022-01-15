
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
const gravity = 1.5

/*const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}*/
class Player {
  constructor(){
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 1
    }
    this.width = 30
    this.height = 30
  }

  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    if(this.position.y + this.height + this.velocity.y <= canvas.height){
      this.velocity.y += gravity
    }
    else {
      this.velocity.y = 0
    }
  }  
}

class Platform {
  constructor({x, y}){
    this.position = {
      x,
      y
    }
    this.velocity = {
      x: 0,
      y: 1
    }
    this.width = 200
    this.height = 20
  }
  draw() {
    c.fillStyle = 'blue'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

const player = new Player()

const platforms = [new Platform({
  x: 200,
  y: 100
}), new Platform({x: 500, y: 200})]

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

let scrollOffset = 0

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  player.update()
  platforms.forEach((platform) => {
    platform.draw()
  })

  if(keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5
  }
  else if(keys.left.pressed && player.position.x > 100 ) {
    player.velocity.x = -5
  }
  else {
    player.velocity.x = 0
    if(keys.right.pressed) {
      scrollOffset += 5
      platforms.forEach((platform) => {
        platform.position.x -= 5
      })
    
    } else if(keys.left.pressed) {
      scrollOffset -= 5
      platforms.forEach((platform) => {
        platform.position.x += 5
      })
    }
  }

  
  //Plataform collision detection
  platforms.forEach((platform) => {
    if(player.position.y + player.height <= 
      platform.position.y && player.position.y + 
      player.height + player.velocity.y >= 
      platform.position.y && player.position.x + 
      player.width >= platform.position.x && 
      player.position.x <= platform.position.x + 
      platform.width) {
      player.velocity.y = 0
    }
  })
  if(scrollOffset > 2000) {
    console.log(scrollOffset)
  }
  //c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update()
  // })
}

// Event Listeners
//addEventListener('keydown', ({keyCode}) => { console.log(keyCode)})
addEventListener('keydown', ({ keyCode}) => {
  switch (keyCode) {
    case 37:
      console.log('left')
      keys.left.pressed = true
      break;
    case 40:
      console.log('down')
      break;
    case 39:
      console.log('right')
      keys.right.pressed = true
      break;
    case 38:
      console.log('up')
      player.velocity.y -= 10
      break;
  }
  console.log(keys.right.pressed)
})

addEventListener('keyup', ({ keyCode}) => {
  switch (keyCode) {
    case 37:
      console.log('left')
      keys.left.pressed = false
      break;
    case 40:
      console.log('down')
      break;
    case 39:
      console.log('right')
      keys.right.pressed = false
      break;
    case 38:
      console.log('up')
      player.velocity.y -= 10
      break;
  }
})

animate() 
/*canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Object {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }
}

// Implementation
let objects
function init() {
  objects = []

  for (let i = 0; i < 400; i++) {
    // objects.push()
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update()
  // })
}

init()
animate() */