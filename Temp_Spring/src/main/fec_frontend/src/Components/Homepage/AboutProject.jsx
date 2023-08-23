
import greenhouse from '../../Assets/greenhouse.png';
const AboutProject = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl font-Gruppo">
                        NEWBIES
                    </h2>

                    <p className="mt-4 text-gray-500 dark:text-gray-400 sm:text-lg">
                        The Newbies team embodies an inseparable fusion of specialized expertise,
                        forward-thinking creativity, and unflinching resolve. The journey through the
                        intersection of agriculture and technology is characterized by a commitment to
                        changing established paradigms and revolutionary aim.
                    </p>
                </div>

                <div className="mt-8 sm:mt-12 ">
                    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div
                            className="flex flex-col rounded-lg px-4 py-8 text-center dark:border-gray-800 shadow-xl transition hover:border-pink-500/10 hover:shadow-green-500/10"
                        >
                            <dt
                                className="order-last text-lg font-medium text-gray-500 dark:text-gray-400"
                            >
                                Real-Time Sensor Data <br></br> Temperature, Humidity, CO2
                            </dt>

                            <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                                3
                            </dd>
                        </div>

                        <div
                            className="flex flex-col rounded-lg px-4 py-8 text-center dark:border-gray-800 shadow-xl transition hover:border-pink-500/10 hover:shadow-green-500/10"
                        >
                            <dt
                                className="order-last text-lg font-medium text-gray-500 dark:text-gray-400"
                            >
                                Main feature <br></br> Dashboard, Overview, Plant Status,<br /> Performance, Plant Status Report
                            </dt>

                            <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">5</dd>
                        </div>
                        
                        <div
                            className="flex flex-col rounded-lg px-4 py-8 text-center dark:border-gray-800 shadow-xl transition hover:border-pink-500/10 hover:shadow-green-500/10"
                        >
                            <dt
                                className="order-last text-lg font-medium text-gray-500 dark:text-gray-400"
                            >

                                In simple Words <br></br>Easy, Friendly, Convenient
                            </dt>

                            <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">3</dd>
                        </div>

                    </dl>
                </div>
            </div>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-12 lg:px-8">
                    <div className="max-w-5xl">
                        <h2 className="text-5xl font-bold text-white sm:text-4xl">
                            What is FEC?
                        </h2>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                        <div className=" flex relative h-64 overflow-hidden sm:h-400 lg:h-full rounded-3xl ">
                            <img src={greenhouse} className=" absolute inset-0 h-full w-full object-cover "></img>
                        </div>

                        <div className="xl:py-12">
                            <article className="space-y-2 text-white">
                                <p className='text-5xl py-2 '>
                                    FEC which stands for Friendly, Easy, and Convenient</p>

                                <p className='text-xl'>is a cutting-edge web program for real-time data monitoring
                                    that gives you newfound insights into your farm. You can get vital information about your farm from any device thanks
                                    to our adaptable design. <br />Let's examine the benefits that FEC offers to your farming endeavors.
                                </p>

                            </article>
                        </div>
                    </div>
                </div>
            </section>

        </section>

    )
}

export default AboutProject;