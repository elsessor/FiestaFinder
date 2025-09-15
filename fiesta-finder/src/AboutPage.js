import React from 'react';
import { Heart, Users, Target, Award, Mail, Linkedin, Twitter } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Dwine Matthew P. Despi',
    role: 'CBO/CEO & Product Owner',
    description: 'Visionary leader passionate about preserving Filipino culture through technology.',
    avatar: '👨‍💼',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 2,
    name: 'Matthew Leon S. Despuig',
    role: 'CTO/CLO & Business Analyst',
    description: 'Tech innovator bridging tradition and modern solutions for cultural preservation.',
    avatar: '👨‍💻',
    color: 'from-green-500 to-blue-500'
  },
  {
    id: 3,
    name: 'Larry II A. Agad',
    role: 'CTO/COO & Project Manager',
    description: 'Strategic project leader ensuring seamless festival discovery experiences.',
    avatar: '👨‍🚀',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 4,
    name: 'Mick Daniel Q. Morales',
    role: 'CXO/CBO & UI/UX Designer',
    description: 'Creative designer crafting beautiful and intuitive user experiences.',
    avatar: '👨‍🎨',
    color: 'from-pink-500 to-orange-500'
  },
  {
    id: 5,
    name: 'Bon Roan R. Hernandez',
    role: 'COO/CXO & Quality Assurance Tester',
    description: 'Quality champion ensuring every user enjoys a flawless festival discovery journey.',
    avatar: '👨‍🔬',
    color: 'from-orange-500 to-red-500'
  }
];

const values = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Cultural Preservation',
    description: 'We believe in preserving and promoting the rich cultural heritage of Camarines Sur for future generations.'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Community Connection',
    description: 'Bringing people together through shared celebrations and cultural experiences that strengthen community bonds.'
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Innovation with Purpose',
    description: 'Using modern technology to bridge the gap between tradition and accessibility for everyone.'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Excellence in Experience',
    description: 'Committed to delivering exceptional user experiences that make festival discovery effortless and enjoyable.'
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Fiesta Finder</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            We're more than just a team; we're a group of friends passionate about 
            celebrating the vibrant culture of our home, Camarines Sur.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Our app was born from a simple, shared experience: the joy of discovering a local fiesta. 
                  The vibrant colors, the delicious food, and the sense of community you find at these 
                  celebrations are what make our province truly special.
                </p>
                <p>
                  But we also know how easy it is to miss out on these moments. The best fiestas are often 
                  the ones you hear about through word of mouth, known only to locals in a specific area. 
                  We wanted to change that.
                </p>
                <p>
                  Our mission is to bridge the gap between tradition and technology, creating a platform 
                  where the rich, unwritten calendar of Camarines Sur's fiestas can be shared and 
                  discovered by everyone.
                </p>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <div className="bg-gradient-to-br from-purple-200 via-blue-200 to-green-200 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl animate-bounce-gentle">🎭</span>
                  <p className="text-gray-700 mt-4 font-medium">Celebrating Culture Through Technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 animate-fade-in">Our Mission</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 leading-relaxed animate-slide-up">
              We believe that by connecting people to these celebrations, we're not only helping them find 
              free food and fun, but also preserving and promoting our unique culture for future generations.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 animate-fade-in">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm hover-lift hover-glow text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-pink-500 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Team Behind the Celebration</h2>
            <p className="text-xl text-gray-600">The passionate individuals from Agad Co. making festival discovery possible</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id} 
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover-lift hover-glow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-32 bg-gradient-to-r ${member.color} flex items-center justify-center`}>
                  <span className="text-6xl animate-bounce-gentle">{member.avatar}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-pink-600 font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.description}</p>
                  
                  <div className="flex space-x-3">
                    <button className="p-2 bg-gray-100 rounded-lg hover:bg-pink-100 transition-colors hover-scale">
                      <Mail className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-lg hover:bg-pink-100 transition-colors hover-scale">
                      <Linkedin className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-lg hover:bg-pink-100 transition-colors hover-scale">
                      <Twitter className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="py-20 bg-gradient-to-r from-pink-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
              <span className="text-white text-2xl">🏛️</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Agad Co.</h2>
          </div>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            We are Agad Co., and we are proud to bring you Fiesta Finder. Let's celebrate together!
          </p>
          <div className="flex items-center justify-center text-white">
            <Heart className="w-6 h-6 mr-2 animate-pulse-slow" />
            <span className="text-lg">Made with love in Camarines Sur, Philippines</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;