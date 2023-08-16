
//import for team source
import seungheon from '../../HomepageAssets/seungheon.png';
import ceceg from '../../HomepageAssets/ceceg.png';
import jisoo from '../../HomepageAssets/jisoo.png';

const AboutUs = () => {
    const teamMembers = [
        {
            name: 'Tsend Ayush Uugantsetseg',
            role: 'Front-end developer',
            imageSrc: ceceg,
            socialLinks: {
                email: 'ts.tsetseg@gmail.com',
                github: 'https://github.com/kanamonra',
            }
        },
        {
            name: 'Han Seung Heon',
            role: 'Team Leader, Back-end developer, Hardware',
            imageSrc: seungheon,
            socialLinks: {
                email: '#',
                github: '#',
            }
        },
        {
            name: 'Lim Jisoo',
            role: 'Computer vision, AI',
            imageSrc: jisoo,
            socialLinks: {
                email: 'imearth0913@gmail.com',
                github: 'https://github.com/jisoo123456',
            }
        },

    ];
    return (

        <div id="team" className="section relative pt-20 pb-8 md:pt-16 bg-black dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <header className="text-center mx-auto mb-12">
                    <h2 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-100">
                        <span className="font-light">Our</span> Team
                    </h2>
                </header>

                <div className="flex flex-wrap justify-center ">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="flex-shrink px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:px-6 mb-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-green-500/10 "
                        >
                            <div className="relative overflow-hidden bg-black dark:bg-gray-900 mb-12 hover-grayscale-0 wow fadeInUp">
                                <div className="relative overflow-hidden px-6">
                                    <img
                                        src={member.imageSrc}
                                        className="max-w-full h-auto mx-auto rounded-full bg-gray-50"
                                        alt={`${member.name} Avatar`}
                                    />
                                </div>
                                <div className="pt-6 text-center text-white">
                                    <p className="text-white-lg leading-normal font-bold mb-1">{member.name}</p>
                                    <p className="text-white-500 leading-relaxed font-light">{member.role}</p>
                                    <div className="mt-2 mb-5 space-x-2">
                                        {/* social links */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}
export default AboutUs