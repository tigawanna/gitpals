import React from 'react'
import { IconContext, IconType } from "react-icons";

interface TheIconProps {
  Icon: IconType;
  size: string;
  color: string;
  iconAction?:any
}

export const TheIcon: React.FC<TheIconProps> = ({Icon,size,color,iconAction}) => {

return (
 <div className='  hover:border-purple-800 p-[2px] rounded'>
<IconContext.Provider value={{ size,color, className: "mx-[6px] hover:border hover:border-purple-800" }}>
 <Icon onClick={()=>iconAction()}/>
</IconContext.Provider>
 </div>
);
}
