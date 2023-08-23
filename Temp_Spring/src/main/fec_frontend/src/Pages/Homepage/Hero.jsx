// 3D
import Spline from '@splinetool/react-spline';

const Hero = () => {
    return (
            <div class="bg-white dark:bg-gray-900 p-20">
                <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div class="mr-auto place-self-center lg:col-span-7">
                        <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Welcome to FEC homepage</h1>
                        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Hi there! I'm Conni, your friendly 3D companion.
                            <br />I'm here to help you dive into the exciting world of FEC
                            and show you how it can revolutionize your farming experience.</p>
                    </div>
                    <div class="hidden lg:mt-2 lg:col-span-5 lg:flex">
                        <Spline scene="https://prod.spline.design/5KvZ8ro8pFmRy9TU/scene.splinecode" />
                    </div>
                </div>
            </div>
    );
};

export default Hero;
