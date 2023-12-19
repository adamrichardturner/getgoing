type ColorPickerProps = {
  selectedColor: string
  handleColorSelect: (newColor: string) => void
}

const ColorPicker = ({
  selectedColor,
  handleColorSelect,
}: ColorPickerProps) => {
  const solids = [
    '#FFC102', // Adam Yellow
    '#FF6F61', // Soft Coral Red
    '#FFDAB9', // Light Apricot Orange
    '#98FB98', // Pale Mint Green
    '#A0522D', // Dusty Rose Red
    'var(--default-color)', // Light Periwinkle Blue
  ]

  return (
    <div className='flex flex-nowrap gap-1 overflow-none'>
      {solids.map((color) => {
        return (
          <div
            key={color}
            className='h-8 w-8 cursor-pointer rounded-md active:scale-105 shadow hover:shadow-lg hover:border-primary'
            onClick={() => handleColorSelect(color)}
            style={{
              backgroundColor:
                color !== 'default-color' ? color : 'var(--default-color)',
              border:
                selectedColor === color
                  ? '2px solid var(--high-contrast)'
                  : '0px',
            }}
          ></div>
        )
      })}
    </div>
  )
}

export default ColorPicker
