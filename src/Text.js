import React from 'react';

const Text = (props) => {
  return (
    <div style={{ width: 250 }} dangerouslySetInnerHTML={{ __html: props.text }} />
  );
};

export default Text;