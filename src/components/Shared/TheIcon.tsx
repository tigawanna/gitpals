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
 <div className='   p-[2px] rounded'>
<IconContext.Provider value={{ size,color, className: "mx-[6px]" }}>
 <Icon onClick={()=>iconAction()}/>
</IconContext.Provider>
 </div>
);
}
