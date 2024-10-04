import React from 'react';

function Banner({
  status,
  isHiding,
  buttonText = '',
  onButtonClick = undefined,
  children,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onButtonClick?.();
  };

  const classNames = [status, 'banner'];
  if (isHiding) {
    classNames.push('isHiding');
  }

  return (
    <div className={classNames.join(' ')}>
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
