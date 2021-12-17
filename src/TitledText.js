import React from 'react';
import PropTypes from 'prop-types';

function TitledText({ title, text, titleLevel, align, className }) {
  const Header = `h${titleLevel}`;
  const padding = 4;
  return (
    <div className={`titled-text ${className !== null ? className : ''}`}>
      <Header
        className={`my-2 my-md-${padding} ${align ? `text-${align}` : ''}`}
        data-testid="titled-text-title"
      >
        {title}
      </Header>
      {text ? (
        <p
          className={`my-2 my-md-${padding} ${align ? `text-${align}` : ''}`}
          data-testid="titled-text-paragraph"
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}

TitledText.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleLevel: PropTypes.number,
  align: PropTypes.string,
  className: PropTypes.string,
};

TitledText.defaultProps = {
  text: null,
  titleLevel: 1,
  align: null,
  className: null,
};

export default TitledText;
