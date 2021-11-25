export const PomoButton = ({ title, activeClass, _callback }) => {
  return (
    <button className={activeClass} onClick={_callback} variant="outlined">
      {title}
    </button>
  );
};
