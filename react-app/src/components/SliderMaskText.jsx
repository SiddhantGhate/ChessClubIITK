import { motion } from 'framer-motion';

const SliderMaskText = ({ text, image, className = "" }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.h2
        className={`font-display leading-[0.9] bg-cover bg-center ${className}`}
        style={image ? {
          backgroundImage: `url(${image})`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        } : {
          color: '#d4af37',
        }}
      >
        {text.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i !== text.split('\n').length - 1 && <br />}
          </span>
        ))}
      </motion.h2>
    </div>
  );
};

export default SliderMaskText;
