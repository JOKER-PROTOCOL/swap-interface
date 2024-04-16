import SidebarMenuList from './SidebarMenuList'
import SocialMedia from './SocialMedia'
import { Logo } from 'components/Logo'

const Sidebar = () => {
  return (
    <div
      className='flex-none flex-column h-full'
      style={{
        width: '232px',
      }}
    >
      <Logo className='justify-center mt-6' />
      <div className='mt-3 py-8 px-4'>
        <SidebarMenuList />
      </div>
      <SocialMedia />
    </div>
  )
}

export default Sidebar
