

interface InputProps {
  type: string;
  placeholder: string;
  value?: string;
  // style?: React.CSSProperties;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  className,
  onChange,
}) => {

    // const inputStyle: React.CSSProperties = {
    //     borderRadius: '50px',
    //     padding: '10px',
    //     width: '500px',
    //     height: '50px',
    //     border: 'none',
    //     outline: 'none',
    //     paddingLeft: '30px',
    //     fontSize: '20px',
    // }

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        // style={inputStyle}
        onChange={onChange}
        className={className}
      />
    </div>
  );
};

export default Input;
