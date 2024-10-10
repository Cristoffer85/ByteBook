import React from 'react'
import Card from '../Card/Card';

interface Props {}

const CardList : React.FC<Props> = (props: Props) : JSX.Element => {
  return (
  <div>
    <Card companyName='F#' ticker='Develop' price={100}/>
    <Card companyName='Lisp' ticker='Develop1' price={500}/>
    <Card companyName='Fortran' ticker='DevelopUber' price={1000}/>
  </div>
  );
}

export default CardList