import { FC, useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';

interface ColorPickerProps {
  color: string;
  colorChange: (color: any) => void;
}

const ColorPicker: FC<ColorPickerProps> = ({ color = '', colorChange }) => {
  const [visible, setVisible] = useState(false);
  const [pickerColor, setPickerColor] = useState(color);
  const [boxColor, setBoxColor] = useState(color);

  useEffect(() => {
    setBoxColor(color);
    setPickerColor(color);
  }, [color]);

  const onPickerDropdown = () => {
    setVisible(!visible);
  };

  const onColorChange = (value: any) => {
    const { rgb } = value;
    const rgba = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    setBoxColor(rgba);
    setPickerColor(rgb);
    colorChange(value);
  };

  return (
    <div className='color-picker'>
      <div className='color-picker-dropdown'>
        <div
          className='color'
          style={{ backgroundColor: boxColor ? boxColor : '#ffffff' }}
          onClick={onPickerDropdown}
        />
      </div>
      {visible && (
        <>
          <div className='color-picker-backdrop' onClick={onPickerDropdown} />
          <SketchPicker color={pickerColor} onChange={onColorChange} />
        </>
      )}
    </div>
  );
};

export default ColorPicker;
