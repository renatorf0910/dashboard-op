import React from 'react'

function HomePage() {
    return (
        <section className='space-y-6'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm'>
                    <h3 className='font-semivold mb-4'>Testing</h3>
                    <div className='h-48 flex items-center justify-center text-gray-400'>
                        Testing
                    </div>
                </div>
                <div className='bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm'>
                    <h3 className='font-semivold mb-4'>Testing list</h3>
                    <div className='h-48 flex items-center justify-center text-gray-400'>
                        <li>Meta </li>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePage;