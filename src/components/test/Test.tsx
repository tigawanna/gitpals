import React from 'react'

interface TestProps {

}

export const Test: React.FC<TestProps> = ({}) => {
return (
 <div className='text-green-400 dark:text-red-600 text-xl flex-center dark:bg-black w-full h-full '>
HELLO
 </div>
);
}
