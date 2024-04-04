
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  link: string;
  text: string;
}

const CustomButton = (props: Props) => {
  return (
    <Link to={props.link} className='button_component_container'>
      <button className='button_component'>{props.text}</button>
    </Link>

  )
}

export default CustomButton