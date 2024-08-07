import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto p-3 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mb-8">
          About Seven's Blog
        </h1>
        <div className="text-lg text-gray-700 dark:text-gray-300 space-y-6">
          <p>
            Welcome to Seven's Blog! At Seven's Blog, we’re passionate about
            exploring and sharing the vast world of technology. Our blog is
            dedicated to providing insightful, practical, and engaging content
            across a range of topics including frontend development, backend
            development, DevOps, cloud computing, and more.
          </p>

          <p>
            <strong>DevOps:</strong> Understand the principles and practices
            that streamline development and operations. Our content covers
            continuous integration and delivery, infrastructure automation, and
            the tools that bridge the gap between development and deployment.
          </p>
          <p>
            <strong>Cloud Computing:</strong> Discover the transformative power
            of cloud technology. We provide insights on cloud platforms,
            services, and strategies to help you leverage cloud resources for
            scalability, performance, and cost efficiency.
          </p>
          <p>
            <strong>And More:</strong> Our blog also delves into emerging
            technologies, industry trends, and practical tips to keep you at the
            forefront of the tech world.
          </p>
          <p>
            Whether you’re a seasoned professional or just starting out, Seven's
            Blog aims to be your go-to resource for learning, inspiration, and
            growth in the tech industry. 
          </p>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Thank you for visiting Seven's Blog!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
