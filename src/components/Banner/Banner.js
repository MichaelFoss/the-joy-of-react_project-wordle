import React from 'react';

function Banner({
  status,
  buttonText = '',
  onButtonClick = undefined,
  children,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onButtonClick?.();
  };

  return (
    <div className={`${status} banner`}>
      <div>{children}</div>
      {buttonText && (
        <form onSubmit={handleSubmit}>
          <button className="submitButton" type="submit">
            {buttonText}
          </button>
        </form>
      )}
    </div>
  );
}

export default Banner;
