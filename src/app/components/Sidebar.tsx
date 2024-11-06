import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Upload, Sliders, Compass, ChevronRight, ChevronLeft } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('sidebarExpanded');
    if (savedState !== null) {
      setIsExpanded(JSON.parse(savedState));
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    localStorage.setItem('sidebarExpanded', JSON.stringify(newState));
  };

  const NavItem = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => (
    <Link href={href} passHref legacyBehavior>
      <Button
        variant="ghost"
        className={`w-full justify-start text-sm py-4 ${isExpanded ? 'px-4' : 'px-2'}`}
        asChild
      >
        <a>
          <Icon className={`h-5 w-5 ${isExpanded ? 'mr-3' : 'mx-auto'}`} />
          {isExpanded && label}
        </a>
      </Button>
    </Link>
  );

  return (
    <aside className={`${isExpanded ? 'w-48' : 'w-16'} border-r h-screen flex flex-col transition-all duration-300 ease-in-out`}>
      <div className="p-4 items-center"> 
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {isExpanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>
      <nav className="mt-8 space-y-2 px-2">
        <NavItem href="/" icon={Home} label="Dashboard" />
        <NavItem href="/my-blog" icon={BookOpen} label="My Blogs" />
        <NavItem href="/resources" icon={Upload} label="Resources" />
        <NavItem href="/preferences" icon={Sliders} label="Preferences" />
        <NavItem href="/explore" icon={Compass} label="Explore" />
      </nav>
    </aside>
  );
};

export default Sidebar;
