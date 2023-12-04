interface ColorSwatchProps {
  background: string
  width: number
  height: number
}

const ColorSwatch = ({ background, width, height }: ColorSwatchProps) => {
  const newColor =
    background === 'default-color' ? 'var(--default-color)' : background
  return (
    <div
      className="rounded-lg shadow hover:shadow-lg"
      style={{
        background: newColor,
        width,
        height
      }}
    ></div>
  )
}

export default ColorSwatch
