interface ColorSwatchProps {
  background: string
  width: number
  height: number
}

const ColorSwatch = ({ background, width, height }: ColorSwatchProps) => {
  return (
    <div
      className='rounded-sm shadow hover:shadow-lg'
      style={{
        background: background === 'default-color' ? '#2464CF' : background,
        width,
        height,
      }}
    ></div>
  )
}

export default ColorSwatch
