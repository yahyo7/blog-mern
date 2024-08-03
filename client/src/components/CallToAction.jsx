import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 justify-center flex flex-col' >
            <h2 className='text-2xl'>Want connect with me for projects like this, contact me through Linkedin</h2>
            <p className='text-gray-500 my-2'> You can also see my other projects in my Github, go to Github and check out what I have build. Don't forget to give a star. </p>

            <Button gradientDuoTone='purpleToPink' className='mt-5'>
                <a href="https://www.linkedin.com/in/yakhyokhon/" target='_blank' rel='noopener noreferrer'>Go to LinkedIn</a>
            </Button>
        </div>

        <div className='p-7 flex-1'>
            <img src='https://cdn.pixabay.com/photo/2018/05/02/12/02/linkedin-3368467_960_720.jpg'/>
        </div>
    </div>
  )
}

export default CallToAction