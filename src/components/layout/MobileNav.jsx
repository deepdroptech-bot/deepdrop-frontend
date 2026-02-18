import { NavLink } from "react-router-dom";
import { navItems } from "../../config/navigation";

export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 
    bg-white border-t border-blue-100 shadow-2xl 
    flex justify-around py-2 z-50">

      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center text-xs
            ${isActive ? "text-blue-700" : "text-gray-500"}`
          }
        >
          <item.icon size={20} />
          <span className="text-[10px]">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
}
