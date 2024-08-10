const Navbar = () => {
  return (
    <nav className='py-2 flex justify-between bg-blue-500 text-white'>
    <div className="logo">
      <span className='font-bold text-xl mx-8'>ToDos</span>
    </div>
    <ul className='flex gap-8 mx-8'>
    <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
    <li className='cursor-pointer hover:font-bold transition-all'>Tasks</li>
    </ul>
    </nav>
  )
}

export default Navbar;