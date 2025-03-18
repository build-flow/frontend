'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaShieldAlt, FaRobot, FaSync, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SentinelHomepage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-gray-800">
        <h1 className="text-2xl font-bold">BuildFlow</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#features" className="hover:text-gray-400">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-gray-400">How It Works</a></li>
            <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
          </ul>
        </nav>
        <Button className="bg-blue-500 hover:bg-blue-600">Join our waitlist</Button>
      </header>
      
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <motion.h2 className="text-4xl font-bold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Construction Management 
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-6">
        BuildFlow eliminates the chaos of traditional construction management by digitizing workflows, centralizing information, and automating critical processes - saving time, reducing costs, and dramatically improving project outcomes.
        </p>
        <Button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 text-lg">See BuildFlow in Action</Button>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-gray-800">
        <h3 className="text-3xl text-center font-semibold mb-8">Key Features</h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureCard icon={<FaShieldAlt />} title="Project Management" description="View your project timelines." />
          <FeatureCard icon={<FaRobot />} title="Labor Management" description="Create records of labor and automate bulk payments." />
          <FeatureCard icon={<FaSync />} title="Expense Tracking" description="Get detailed reports on expenses spent on materials and labor" />
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-6 text-center">
        <h3 className="text-3xl font-semibold mb-8">How It Works</h3>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          <StepCard step="1" title="Create an Account" description="Create an account for you construction firm." />
          <StepCard step="2" title="Create a project" description="Create a project and further divide it into units." />
          <StepCard step="3" title="Manage your Project" description="Track, deadlines, materials and labor costs." />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-center">
        <h3 className="text-3xl font-semibold mb-4">Streamline your construction management today.</h3>
        <Button className="bg-gray-900 hover:bg-gray-800 px-6 py-3 text-lg">Get a Free Demo</Button>
      </section>
      
      {/* Footer */}
      <footer id="contact" className="py-8 bg-gray-800 text-center">
        <p className="text-gray-400">&copy; 2025 BuildFlow. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="p-6 text-center bg-gray-700">
      <CardContent>
        <div className="text-4xl text-blue-400 mb-4">{icon}</div>
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p className="text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
}

function StepCard({ step, title, description }) {
  return (
    <Card className="p-6 text-center bg-gray-700">
      <CardContent>
        <div className="text-5xl font-bold text-blue-400 mb-2">{step}</div>
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p className="text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
}

