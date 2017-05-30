import React from 'react';

const Flag = (props) => {
  let country = props.country.toLowerCase();
  return (
    <img role="presentation" src={require('./svg-flags/'+country+'.svg')} width='50px' height='38px' viewBox='0 0 40 28' version='1.1' xmlns='http://www.w3.org/2000/svg' className={props.className}>
    </img>
  );
};

export default Flag;
