import React from 'react'
import { SiGithub } from 'react-icons/si';
import { TheIcon } from '../Shared/TheIcon';


interface TestProps {

}

export const Test: React.FC<TestProps> = ({}) => {
return (
  <div className="w-full h-full flex-center border border-white">
    <TheIcon Icon={SiGithub} size={"70"} color={"green"} />
  </div>
);
}
